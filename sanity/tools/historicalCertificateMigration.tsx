import { useClient } from "sanity";
import { useRouter } from "sanity/router";
import { useEffect, useMemo, useState } from "react";
import { allocateCertificateNumbers } from "../lib/certificateNumber";
import { parseSpreadsheetRows } from "../lib/recipientImport";
import { extractPdfRecipients, type PdfRecipientExtraction } from "../lib/pdfRecipientExtraction";

const apiVersion = "2026-09-03";
const maxRecords = 100;
const codes = ["RCM", "VMA", "MBC", "OTHER"];

type Signatory = { _id: string; name: string; role: string };
type Existing = { certificateNumber?: string; legacyCertificateNumber?: string; recipientName?: string; trainingTitle?: string; issueDate?: string };
type ImportedRow = { recipientName?: string; programCode?: string; trainingTitle?: string; trainingDuration?: string; issueDate?: string; legacyCertificateNumber?: string; cohort?: string; status?: string };
type MigrationRow = { recipientName: string; programCode: string; trainingTitle: string; trainingDuration: string; issueDate: string; legacyCertificateNumber?: string; cohort?: string; status: "valid" | "revoked"; certificateNumber: string; issue: string };
type PdfNameRow = { fileName: string; pageNumber: number; name: string; confidence: string };

const clean = (value: unknown) => String(value ?? "").trim().replace(/\s+/g, " ");
const headerKey = (value: unknown) => clean(value).toLowerCase();
const namesFromText = (value: string) => value.split(/\r?\n/).map(clean).filter(Boolean);
const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
const parseDate = (value: string) => {
  const text = clean(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const serial = Number(text);
  if (Number.isFinite(serial) && serial > 1) return new Date(Date.UTC(1899, 11, 30) + serial * 86400000).toISOString().slice(0, 10);
  return text;
};
const duplicateKeys = (values: string[]) => {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = clean(value).toLowerCase();
    if (seen.has(key)) return true;
    seen.add(key);
    return false;
  });
};

export function HistoricalCertificateMigrationTool() {
  const client = useClient({ apiVersion });
  const router = useRouter();
  const [mode, setMode] = useState<"manual" | "upload" | "pdf">("manual");
  const [programCode, setProgramCode] = useState("RCM");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [cohort, setCohort] = useState("");
  const [status, setStatus] = useState<"valid" | "revoked">("valid");
  const [recipients, setRecipients] = useState("");
  const [legacyNumbers, setLegacyNumbers] = useState("");
  const [signatories, setSignatories] = useState<Signatory[]>([]);
  const [selectedSignatories, setSelectedSignatories] = useState<string[]>([]);
  const [importedRows, setImportedRows] = useState<ImportedRow[] | null>(null);
  const [importedFile, setImportedFile] = useState("");
  const [worksheet, setWorksheet] = useState("");
  const [pdfExtractions, setPdfExtractions] = useState<PdfRecipientExtraction[]>([]);
  const [pdfNames, setPdfNames] = useState<PdfNameRow[]>([]);
  const [preview, setPreview] = useState<MigrationRow[] | null>(null);
  const [created, setCreated] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const recipientList = useMemo(() => namesFromText(recipients), [recipients]);
  const signatoryRefs = useMemo(() => selectedSignatories.map((_ref) => ({ _type: "reference", _ref })), [selectedSignatories]);

  useEffect(() => {
    void client.fetch<Signatory[]>(`*[_type == "certificateSignatory" && active == true] | order(displayOrder asc, name asc){_id, name, role}`).then(setSignatories).catch(() => setError("Signatories could not be loaded."));
  }, [client]);

  const importFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const parsed = await parseSpreadsheetRows(file);
      const headers = parsed.rows[0].map(headerKey);
      const get = (row: string[], aliases: string[]) => {
        const index = aliases.map(headerKey).map((alias) => headers.indexOf(alias)).find((value) => value >= 0);
        return index === undefined ? "" : clean(row[index]);
      };
      const rows = parsed.rows.slice(1).filter((row) => row.some((cell) => clean(cell))).map((row) => ({
        recipientName: get(row, ["recipient name", "recipient", "name"]),
        programCode: get(row, ["program code", "programme", "program"]).toUpperCase(),
        trainingTitle: get(row, ["training title", "training"]),
        trainingDuration: get(row, ["training duration", "duration"]),
        issueDate: parseDate(get(row, ["original issue date", "issue date"])),
        legacyCertificateNumber: get(row, ["legacy certificate number", "legacy number"]),
        cohort: get(row, ["cohort", "training batch"]),
        status: get(row, ["status"]).toLowerCase(),
      }));
      if (!rows.length) throw new Error("The spreadsheet contains no data rows.");
      if (rows.length > maxRecords) throw new Error(`This file contains ${rows.length} rows. The maximum migration size is ${maxRecords}.`);
      setImportedRows(rows);
      setImportedFile(parsed.fileName);
      setWorksheet(parsed.worksheet ?? "");
      setMode("upload");
      setPreview(null);
      setMessage(`${rows.length} rows read from ${parsed.fileName}. Review the merged preview before migration.`);
    } catch (reason) {
      setImportedRows(null);
      setError(reason instanceof Error ? reason.message : "The historical spreadsheet could not be read.");
    } finally {
      setBusy(false);
    }
  };

  const downloadTemplate = () => {
    const csv = "Recipient Name,Program Code,Training Title,Training Duration,Original Issue Date,Legacy Certificate Number,Cohort,Status\nHistorical Test One,RCM,Historical Migration Test,1 hour,2026-08-01,OLD-TEST-001,Phase 9D Test,valid\n";
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "MedLink-VA-Historical-Certificate-Migration-Template.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const extractPdfFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const extracted = await extractPdfRecipients([...files]);
      const names = extracted.flatMap((file) => file.pages.map((page) => ({ fileName: file.fileName, pageNumber: page.pageNumber, name: page.detectedName, confidence: page.confidence })));
      setPdfExtractions(extracted);
      setPdfNames(names);
      setMode("pdf");
      setMessage(`${extracted.length} PDF file${extracted.length === 1 ? "" : "s"} parsed locally. Review every extracted name before using it.`);
    } catch (reason) {
      setPdfExtractions([]);
      setPdfNames([]);
      setError(reason instanceof Error ? reason.message : "The PDF files could not be read.");
    } finally {
      setBusy(false);
    }
  };

  const updatePdfName = (index: number, name: string) => setPdfNames((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name, confidence: name.trim() ? "Edited" : "Removed" } : item));
  const useExtractedNames = () => {
    const names = pdfNames.map((item) => item.name.trim()).filter(Boolean);
    if (!names.length) return setError("Add or restore at least one extracted recipient name before continuing.");
    if (new Set(names.map((name) => name.toLowerCase())).size !== names.length && !window.confirm("Duplicate extracted names are present. Keep them for review?")) return;
    setRecipients(names.join("\n"));
    setMode("manual");
    setPreview(null);
    setMessage(`${names.length} extracted recipient names added to Historical Recipients. Review and edit them before migration.`);
  };

  const resolvedInputs = () => importedRows?.length
    ? importedRows.map((row) => ({ recipientName: clean(row.recipientName), programCode: row.programCode || programCode, trainingTitle: row.trainingTitle || trainingTitle, trainingDuration: row.trainingDuration || duration, issueDate: row.issueDate || issueDate, legacyCertificateNumber: row.legacyCertificateNumber || undefined, cohort: row.cohort || cohort, status: (row.status || status).toLowerCase() as string }))
    : recipientList.map((recipientName, index) => ({ recipientName, programCode, trainingTitle, trainingDuration: duration, issueDate, legacyCertificateNumber: clean(legacyNumbers.split(/\r?\n/)[index]) || undefined, cohort, status }));

  const prepare = async () => {
    setError("");
    setMessage("");
    setPreview(null);
    const inputs = resolvedInputs();
    if (!inputs.length) return setError("Enter at least one historical recipient or upload a spreadsheet.");
    if (inputs.length > maxRecords) return setError(`A migration is limited to ${maxRecords} records.`);
    const rows: MigrationRow[] = inputs.map((input) => {
      let issue = "Valid";
      if (!input.recipientName) issue = "Missing recipient name";
      else if (!codes.includes(input.programCode.toUpperCase())) issue = "Invalid program code";
      else if (!input.trainingTitle.trim()) issue = "Missing training title";
      else if (!input.trainingDuration.trim()) issue = "Missing training duration";
      else if (!validDate(input.issueDate)) issue = "Invalid original issue date; use YYYY-MM-DD";
      else if (!["valid", "revoked"].includes(input.status)) issue = "Invalid status";
      return { ...input, recipientName: input.recipientName, programCode: input.programCode.toUpperCase(), trainingTitle: input.trainingTitle.trim(), trainingDuration: input.trainingDuration.trim(), issueDate: input.issueDate, status: input.status === "revoked" ? "revoked" : "valid", certificateNumber: "", issue };
    });
    const duplicateRows = new Set(duplicateKeys(rows.filter((row) => row.recipientName).map((row) => `${row.recipientName.toLowerCase()}|${row.trainingTitle.toLowerCase()}|${row.issueDate}`)));
    rows.forEach((row) => {
      const key = `${row.recipientName.toLowerCase()}|${row.trainingTitle.toLowerCase()}|${row.issueDate}`;
      if (row.issue === "Valid" && duplicateRows.has(key)) row.issue = "Duplicate row in import";
    });
    if (rows.some((row) => row.issue !== "Valid")) {
      setPreview(rows);
      return;
    }
    setBusy(true);
    try {
      const existing = await client.fetch<Existing[]>(`*[_type == "certificate"]{certificateNumber, legacyCertificateNumber, recipientName, trainingTitle, issueDate}`, {}, { perspective: "previewDrafts" });
      const legacyValues = rows.map((row) => row.legacyCertificateNumber).filter(Boolean) as string[];
      const legacyDuplicates = new Set(duplicateKeys(legacyValues));
      const collision = rows.find((row) => existing.some((item) => item.recipientName?.trim().toLowerCase() === row.recipientName.toLowerCase() && item.trainingTitle === row.trainingTitle && item.issueDate === row.issueDate) || (row.legacyCertificateNumber && existing.some((item) => item.certificateNumber === row.legacyCertificateNumber || item.legacyCertificateNumber === row.legacyCertificateNumber)) || legacyDuplicates.has(row.legacyCertificateNumber ?? ""));
      if (collision) rows.find((row) => row === collision)!.issue = "Duplicate or certificate-number collision";
      const used = existing.map((item) => item.certificateNumber ?? "");
      const groups = new Map<string, MigrationRow[]>();
      rows.forEach((row) => {
        const key = `${row.programCode}|${row.issueDate}`;
        groups.set(key, [...(groups.get(key) ?? []), row]);
      });
      for (const group of groups.values()) {
        const numbers = allocateCertificateNumbers(used.concat(rows.map((row) => row.certificateNumber)), group[0].programCode, group[0].issueDate, group.length);
        group.forEach((row, index) => {
          row.certificateNumber = numbers[index];
          used.push(numbers[index]);
        });
      }
      setPreview(rows);
    } catch {
      setError("Historical migration preflight could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  const migrate = async () => {
    if (!preview || preview.some((row) => row.issue !== "Valid") || !window.confirm(`Create ${preview.length} historical certificate records?\n\nThe original issue dates and proposed numbers will be preserved.`)) return;
    setBusy(true);
    setError("");
    const timestamp = new Date().toISOString();
    try {
      const documents = preview.map((row) => ({ _id: globalThis.crypto.randomUUID(), _type: "certificate", certificateNumber: row.certificateNumber, programCode: row.programCode, legacyCertificateNumber: row.legacyCertificateNumber, recipientName: row.recipientName, trainingTitle: row.trainingTitle, trainingDuration: row.trainingDuration, issueDate: row.issueDate, cohort: row.cohort || undefined, status: row.status, signatories: signatoryRefs, verificationToken: globalThis.crypto.randomUUID(), verificationRecordCreatedAt: timestamp, originallyIssuedBeforeVerificationSystem: true, internalNotes: `Historical migration batch created ${timestamp}.` }));
      const cohortDocument = { _id: globalThis.crypto.randomUUID(), _type: "certificateCohort", title: `Historical Migration — ${cohort || trainingTitle} — ${issueDate || "multiple dates"}`, programCode, trainingTitle: trainingTitle || "Historical migration", trainingDuration: duration || "Historical", issueDate: issueDate || documents[0].issueDate, status: "issued", signatories: signatoryRefs, certificates: documents.map(({ _id }) => ({ _type: "reference", _ref: _id })), recipientCount: documents.length, createdAt: timestamp, historical: true, notes: "Created by Historical Certificate Migration. Original issue dates are preserved." };
      const transaction = documents.reduce((current, document) => current.create(document), client.transaction());
      await transaction.create(cohortDocument).commit();
      setCreated(documents.map(({ _id }) => _id));
      setPreview(null);
      setMessage(`${documents.length} historical certificates migrated successfully. Verification timestamp: ${timestamp}.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Historical migration failed. No successful result was confirmed.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setImportedRows(null);
    setImportedFile("");
    setWorksheet("");
    setRecipients("");
    setLegacyNumbers("");
    setPreview(null);
    setCreated([]);
    setMessage("");
    setError("");
    setMode("manual");
    setPdfExtractions([]);
    setPdfNames([]);
  };

  const issueCount = preview?.filter((row) => row.issue !== "Valid").length ?? 0;

  return (
    <main className="historical-page">
      <style>{`
        .historical-page{box-sizing:border-box;padding:32px;max-width:1120px;margin:0 auto;font-family:system-ui,sans-serif;color:#172b4d}
        .historical-page *{box-sizing:border-box}
        .historical-page h1{margin:0;font-size:32px;line-height:1.2;color:#172b4d}
        .historical-page h2{margin:0 0 10px;font-size:20px;line-height:1.3;color:#172b4d}
        .historical-intro{max-width:760px;margin:12px 0 0;color:#5b6570;line-height:1.55}
        .historical-fields{display:grid;gap:24px}
        .historical-row-three{grid-template-columns:repeat(3,minmax(0,1fr))}
        .historical-row-two{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:24px}
        .historical-label{display:flex;flex-direction:column;gap:9px;font-weight:600;font-size:14px;min-width:0}
        .historical-input{width:100%;padding:11px 12px;border:1px solid #b8c2cc;border-radius:5px;background:#fff;color:#172b4d;font:inherit;font-weight:400;line-height:1.4}
        .historical-input:focus{outline:2px solid #78c9eb;outline-offset:1px;border-color:#0b65b1}
        .historical-textarea{min-height:180px;resize:vertical}
        .historical-helper{color:#5b6570;font-size:13px;line-height:1.45}
        .historical-card{margin-top:28px;border:1px solid #b9e4f7;border-radius:6px;padding:20px;background:#fff}
        .historical-mode{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0 28px}
        .historical-upload{border:1px solid #d5dbe0;border-radius:6px;padding:18px;background:#fbfdff}
        .historical-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
        .historical-button{padding:10px 16px;border-radius:5px;border:1px solid #0a3b78;background:#fff;color:#0a3b78;font:inherit;cursor:pointer}
        .historical-button.primary{background:#0b65b1;color:#fff;border-color:#0b65b1}
        .historical-button:disabled{cursor:wait;opacity:.65}
        .historical-banner{padding:12px 14px;border-radius:5px;margin-top:18px;line-height:1.45}
        .historical-error{background:#fff1f0;border:1px solid #d14343;color:#7d1b1b}
        .historical-success{background:#eef9f1;border:1px solid #4c9a62;color:#1f5f2d}
        .historical-signatories{margin:28px 0 0;border:1px solid #d5dbe0;border-radius:6px;padding:16px 18px}
        .historical-signatories legend{padding:0 6px;font-weight:700;color:#172b4d}
        .historical-signatory{display:flex;gap:9px;align-items:flex-start;margin-top:12px;font-size:14px;line-height:1.4}
        .historical-signatory:first-of-type{margin-top:4px}
        .historical-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
        .historical-stat{padding:12px 14px;background:#f7fafc;border:1px solid #e2e7eb;border-radius:5px}
        .historical-stat strong{display:block;font-size:20px;color:#0a3b78}
        .historical-stat span{display:block;margin-top:3px;color:#5b6570;font-size:13px}
        .historical-table-wrap{overflow-x:auto;margin-top:16px;border:1px solid #e2e7eb;border-radius:5px}
        .historical-table{width:100%;border-collapse:collapse;min-width:980px;font-size:13px}
        .historical-table th{background:#f2f6fa;color:#172b4d;text-align:left;font-weight:700;padding:10px 12px;border-bottom:2px solid #d5dbe0;white-space:nowrap}
        .historical-table td{padding:10px 12px;border-bottom:1px solid #e2e7eb;vertical-align:top;max-width:220px;overflow-wrap:anywhere}
        .historical-table tbody tr:last-child td{border-bottom:0}
        .historical-valid{color:#2e7d32;font-weight:600}
        .historical-invalid{color:#b3261e;font-weight:600}
        .historical-pdf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 16px;max-height:360px;overflow:auto;margin-top:16px}
        .historical-pdf-row{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center;padding:10px;background:#f7fafc;border:1px solid #e2e7eb;border-radius:5px}
        .historical-pdf-meta{color:#5b6570;font-size:12px}
        @media(max-width:760px){.historical-page{padding:20px}.historical-row-three,.historical-row-two{grid-template-columns:1fr}.historical-summary{grid-template-columns:1fr}.historical-mode{margin-bottom:20px}.historical-card{padding:16px}}
        @media(max-width:760px){.historical-pdf-grid{grid-template-columns:1fr}}
      `}</style>

      <h1>Historical Certificate Migration</h1>
      <p className="historical-intro">Register certificates issued before the online verification system. Original issue dates are preserved; verification timestamps are recorded separately.</p>
      {error ? <div className="historical-banner historical-error" role="alert">{error}</div> : null}
      {message ? <div className="historical-banner historical-success" role="status">{message}</div> : null}

      <div className="historical-mode">
        <button className="historical-button" type="button" onClick={() => setMode("manual")} disabled={mode === "manual"}>Manual Entry</button>
        <button className="historical-button" type="button" onClick={() => setMode("upload")} disabled={mode === "upload"}>Upload Excel / CSV</button>
        <button className="historical-button" type="button" onClick={() => setMode("pdf")} disabled={mode === "pdf"}>Extract from PDF</button>
      </div>

      {mode === "upload" ? <section className="historical-card historical-upload">
        <h2>Historical Certificate Spreadsheet</h2>
        <p className="historical-helper">Accepted: .xlsx and .csv. Maximum 5 MB. Files are parsed locally and are not uploaded.</p>
        <div className="historical-actions">
          <label className="historical-label">Choose file<input className="historical-input" type="file" accept=".xlsx,.csv" onChange={(event) => { void importFile(event.target.files?.[0]); event.currentTarget.value = ""; }} /></label>
          <button className="historical-button" type="button" onClick={downloadTemplate}>Download Migration Template</button>
        </div>
        {importedFile ? <p className="historical-helper">File: {importedFile}{worksheet ? ` · Worksheet: ${worksheet}` : ""}</p> : null}
      </section> : null}

      {mode === "pdf" ? <section className="historical-card historical-upload">
        <h2>PDF recipient extraction</h2>
        <p className="historical-helper">Select up to 10 PDFs, each up to 10 MB. Files are parsed locally in this browser, are not uploaded to Sanity, and never create certificates automatically.</p>
        <label className="historical-label">Choose PDF files<input className="historical-input" type="file" accept=".pdf,application/pdf" multiple onChange={(event) => { void extractPdfFiles(event.target.files); event.currentTarget.value = ""; }} /></label>
        {pdfExtractions.length ? <>
          <div className="historical-summary">
            <div className="historical-stat"><strong>{pdfExtractions.length}</strong><span>PDF files</span></div>
            <div className="historical-stat"><strong>{pdfNames.length}</strong><span>Pages processed</span></div>
            <div className="historical-stat"><strong>{pdfNames.filter((item) => item.name.trim()).length}</strong><span>Names detected</span></div>
            <div className="historical-stat"><strong>{pdfNames.filter((item) => !item.name.trim() || item.confidence !== "High").length}</strong><span>Needs review</span></div>
            <div className="historical-stat"><strong>{duplicateKeys(pdfNames.map((item) => item.name).filter(Boolean)).length}</strong><span>Duplicates</span></div>
          </div>
          <div className="historical-pdf-grid">{pdfNames.map((item, index) => <label className="historical-pdf-row" key={`${item.fileName}-${item.pageNumber}-${index}`}><span className="historical-pdf-meta">{item.fileName}<br />Page {item.pageNumber}<br />{item.confidence}</span><input className="historical-input" value={item.name} onChange={(event) => updatePdfName(index, event.target.value)} aria-label={`Recipient name from ${item.fileName}, page ${item.pageNumber}`} placeholder="Editable recipient name" /></label>)}</div>
          <div className="historical-actions"><button className="historical-button primary" type="button" onClick={useExtractedNames}>Use Extracted Names</button></div>
          {pdfNames.some((item) => item.confidence === "Scanned or no selectable text") ? <p className="historical-helper">No selectable text was found on one or more pages. Those PDFs may be scanned; OCR is not enabled in this phase.</p> : null}
        </> : null}
      </section> : null}

      <section className="historical-card">
        <h2>Shared certificate details</h2>
        <p className="historical-helper">These values apply to every manual record and provide fallbacks for blank spreadsheet cells.</p>
        <div className="historical-fields historical-row-three">
          <label className="historical-label">Program code<select className="historical-input" value={programCode} onChange={(event) => setProgramCode(event.target.value)}>{codes.map((code) => <option key={code}>{code}</option>)}</select></label>
          <label className="historical-label">Original issue date<input className="historical-input" type="date" value={issueDate} onChange={(event) => setIssueDate(event.target.value)} /></label>
          <label className="historical-label">Status<select className="historical-input" value={status} onChange={(event) => setStatus(event.target.value as "valid" | "revoked")}><option value="valid">valid</option><option value="revoked">revoked</option></select></label>
        </div>
        <div className="historical-fields historical-row-three">
          <label className="historical-label">Training title<input className="historical-input" value={trainingTitle} onChange={(event) => setTrainingTitle(event.target.value)} /></label>
          <label className="historical-label">Training duration<input className="historical-input" value={duration} onChange={(event) => setDuration(event.target.value)} /></label>
          <label className="historical-label">Cohort<input className="historical-input" value={cohort} onChange={(event) => setCohort(event.target.value)} /></label>
        </div>
      </section>

      {mode === "manual" || !importedRows ? <section className="historical-fields historical-row-two">
        <label className="historical-label historical-card">Historical recipients<textarea className="historical-input historical-textarea" value={recipients} onChange={(event) => setRecipients(event.target.value)} placeholder="One recipient per line" /><small className="historical-helper">Maximum {maxRecords}; names remain editable.</small></label>
        <label className="historical-label historical-card">Legacy certificate numbers (optional)<textarea className="historical-input historical-textarea" value={legacyNumbers} onChange={(event) => setLegacyNumbers(event.target.value)} placeholder="One number per line" /><small className="historical-helper">Leave blank if no genuine legacy number existed.</small></label>
      </section> : <p className="historical-helper historical-card">{importedRows.length} imported rows will use the shared defaults where row values are blank.</p>}

      <fieldset className="historical-signatories">
        <legend>Signatories</legend>
        {signatories.map((item) => <label className="historical-signatory" key={item._id}><input type="checkbox" checked={selectedSignatories.includes(item._id)} onChange={(event) => setSelectedSignatories((current) => event.target.checked ? [...current, item._id] : current.filter((id) => id !== item._id))} /> <span>{item.name} — {item.role}</span></label>)}
      </fieldset>

      <div className="historical-actions">
        <button className="historical-button primary" type="button" disabled={busy} onClick={() => void prepare()}>{busy ? "Checking…" : "Review Migration"}</button>
        <button className="historical-button" type="button" onClick={reset}>Reset</button>
      </div>

      {preview ? <section className="historical-card">
        <h2>Migration preview</h2>
        <p className="historical-helper">Original issue dates and program groups are allocated independently. Proposed range is shown per row.</p>
        <div className="historical-summary">
          <div className="historical-stat"><strong>{importedRows?.length ?? recipientList.length}</strong><span>Rows read</span></div>
          <div className="historical-stat"><strong>{preview.length - issueCount}</strong><span>Valid records</span></div>
          <div className="historical-stat"><strong>{issueCount}</strong><span>Invalid records</span></div>
        </div>
        <div className="historical-table-wrap">
          <table className="historical-table"><thead><tr><th>Recipient</th><th>Program</th><th>Training</th><th>Duration</th><th>Original date</th><th>Legacy number</th><th>Cohort</th><th>Status</th><th>Proposed number</th><th>Validation</th></tr></thead><tbody>{preview.map((row, index) => <tr key={`${row.recipientName}-${index}`}><td>{row.recipientName}</td><td>{row.programCode}</td><td>{row.trainingTitle}</td><td>{row.trainingDuration}</td><td>{row.issueDate}</td><td>{row.legacyCertificateNumber || "—"}</td><td>{row.cohort || "—"}</td><td>{row.status}</td><td>{row.certificateNumber || "—"}</td><td className={row.issue === "Valid" ? "historical-valid" : "historical-invalid"}>{row.issue}</td></tr>)}</tbody></table>
        </div>
        <div className="historical-actions"><button className="historical-button primary" type="button" disabled={busy || issueCount > 0} onClick={() => void migrate()}>{busy ? "Migrating…" : "Confirm Migration"}</button></div>
      </section> : null}

      {created.length ? <section className="historical-card">
        <h2>Historical certificates migrated successfully</h2>
        <p>Records created: {created.length}. Reopen Issued Cohorts to generate PDFs or a ZIP using the existing workflows.</p>
        <div className="historical-actions"><button className="historical-button primary" type="button" onClick={() => router.navigate({ state: null })}>Open Studio</button></div>
      </section> : null}
    </main>
  );
}

export const historicalCertificateMigrationTool = { name: "historical-certificate-migration", title: "Historical Certificate Migration", component: HistoricalCertificateMigrationTool };
