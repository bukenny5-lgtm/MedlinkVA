import { useClient } from "sanity";
import { useMemo, useState } from "react";
import { allocateCertificateNumbers } from "../lib/certificateNumber";

const apiVersion = "2026-09-03";
const rawPerspective = { perspective: "raw" as const };
type Certificate = { _id: string; recipientName?: string; certificateNumber?: string; trainingTitle?: string; cohort?: string; issueDate?: string; status?: string };
type Cohort = { _id: string; title?: string; trainingTitle?: string; issueDate?: string; status?: string; recipientCount?: number; certificates?: { _ref: string }[] };
type Preview = { certificates: Certificate[]; cohorts: Cohort[]; signatoryCount: number; blockingReferences: { _id: string; _type: string }[]; proposedNumber: string };

const testMarker = /(^|\b)(test|historical test|batch test|test recipient|migration test|certificate batch test|phase 9c|phase 9d test)(\b|$)/i;
const clearlyTest = (value?: string) => Boolean(value && testMarker.test(value));
const certificateIsTest = (record: Certificate) => [record.recipientName, record.trainingTitle, record.cohort].some(clearlyTest);
const cohortIsTest = (record: Cohort) => clearlyTest(record.title) || clearlyTest(record.trainingTitle);
const baseDocumentId = (id: string) => id.replace(/^drafts\./, "");

export function CertificateTestDataCleanupTool() {
  const client = useClient({ apiVersion });
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const scanSelective = async () => {
    setBusy(true); setError(""); setMessage(""); setPreview(null);
    try {
      const [certificates, cohorts] = await Promise.all([
        client.fetch<Certificate[]>(`*[_type == "certificate"]{_id, recipientName, certificateNumber, trainingTitle, cohort, issueDate, status}`, {}, rawPerspective),
        client.fetch<Cohort[]>(`*[_type == "certificateCohort"]{_id, title, trainingTitle, issueDate, status, certificates[]{_ref}}`, {}, rawPerspective),
      ]);
      const matchedCertificates = certificates.filter(certificateIsTest);
      const matchedIds = new Set(matchedCertificates.map((item) => item._id));
      const matchedCohorts = cohorts.filter((cohort) => {
        const references = cohort.certificates ?? [];
        return cohortIsTest(cohort) || Boolean(references.length) && references.every((reference) => matchedIds.has(reference._ref));
      });
      const orphanedReferences = cohorts.filter((cohort) => cohort.certificates?.some((reference) => matchedIds.has(reference._ref)) && !matchedCohorts.some((item) => item._id === cohort._id)).map((cohort) => ({ _id: cohort._id, _type: "certificateCohort" }));
      setPreview({ certificates: matchedCertificates, cohorts: matchedCohorts, signatoryCount: 0, blockingReferences: orphanedReferences, proposedNumber: "" });
      setMessage(`Selective dry run complete. Found ${matchedCertificates.length} test certificates and ${matchedCohorts.length} test cohorts.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The selective cleanup scan could not be completed.");
    } finally { setBusy(false); }
  };

  const scanFullReset = async () => {
    setBusy(true); setError(""); setMessage(""); setPreview(null); setConfirmation("");
    try {
      const [certificates, cohorts, signatories] = await Promise.all([
        client.fetch<Certificate[]>(`*[_type == "certificate"]{_id, recipientName, certificateNumber, trainingTitle, cohort, issueDate, status}`, {}, rawPerspective),
        client.fetch<Cohort[]>(`*[_type == "certificateCohort"]{_id, title, trainingTitle, issueDate, status, recipientCount, certificates[]{_ref}}`, {}, rawPerspective),
        client.fetch<{ _id: string }[]>(`*[_type == "certificateSignatory"]{_id}`, {}, rawPerspective),
      ]);
      const targetIds = [...certificates.map((item) => item._id), ...cohorts.map((item) => item._id)];
      const referenceIds = [...new Set(targetIds.flatMap((id) => [id, baseDocumentId(id)]))];
      const references = (await Promise.all(referenceIds.map((id) => client.fetch<{ _id: string; _type: string }[]>(`*[references($id)]{_id, _type}`, { id }, rawPerspective)))).flat();
      const blockingReferences = [...new Map(references.filter((item) => item._type !== "certificate" && item._type !== "certificateCohort").map((item) => [item._id, item])).values()];
      const proposedNumber = allocateCertificateNumbers(certificates.map((item) => item.certificateNumber ?? ""), "RCM", "2026-09-08", 1)[0] ?? "Unavailable";
      setPreview({ certificates, cohorts, signatoryCount: signatories.length, blockingReferences, proposedNumber });
      setMessage(`Full reset dry run complete. Found ${certificates.length} certificate records and ${cohorts.length} certificate cohort records.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The full reset dry run could not be completed.");
    } finally { setBusy(false); }
  };

  const deleteAllCertificateData = async () => {
    if (!preview || confirmation !== "DELETE ALL CERTIFICATES") return;
    if (preview.blockingReferences.length) {
      setError("Deletion is blocked because unexpected non-certificate documents reference certificate data.");
      return;
    }
    if (!window.confirm("This permanently deletes every certificate and certificate cohort currently stored in Sanity. Certificate signatories and all non-certificate content are preserved.")) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const transaction = client.transaction();
      preview.cohorts.forEach((cohort) => transaction.delete(cohort._id));
      preview.certificates.forEach((certificate) => transaction.delete(certificate._id));
      await transaction.commit();
      const [remainingCertificates, remainingCohorts, signatories] = await Promise.all([
        client.fetch<{ _id: string }[]>(`*[_type == "certificate"]{_id}`, {}, rawPerspective),
        client.fetch<{ _id: string }[]>(`*[_type == "certificateCohort"]{_id}`, {}, rawPerspective),
        client.fetch<{ _id: string }[]>(`*[_type == "certificateSignatory"]{_id}`, {}, rawPerspective),
      ]);
      const proposedNumber = allocateCertificateNumbers([], "RCM", "2026-09-08", 1)[0] ?? "Unavailable";
      setPreview({ certificates: remainingCertificates, cohorts: remainingCohorts, signatoryCount: signatories.length, blockingReferences: [], proposedNumber });
      setConfirmation("");
      if (remainingCertificates.length || remainingCohorts.length) setError(`Reset verification failed. Certificates remaining: ${remainingCertificates.length}. Certificate cohorts remaining: ${remainingCohorts.length}.`);
      else setMessage(`Certificate reset completed successfully. Certificates remaining: 0. Certificate cohorts remaining: 0. Certificate signatories preserved: ${signatories.length}. Proposed next RCM number for 2026-09-08: ${proposedNumber}.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Certificate reset failed. No successful result was confirmed.");
    } finally { setBusy(false); }
  };

  const matchedNumbers = useMemo(() => preview?.certificates.map((item) => item.certificateNumber).filter(Boolean).join(", ") ?? "", [preview]);

  return <main className="cleanup-page"><style>{`.cleanup-page{padding:32px;max-width:1120px;margin:0 auto;font-family:system-ui,sans-serif;color:#172b4d}.cleanup-page h1{margin:0 0 10px}.cleanup-page h2{font-size:20px;margin:0 0 12px}.cleanup-page h3{margin:24px 0 10px;font-size:16px}.cleanup-helper{color:#5b6570;line-height:1.5}.cleanup-card{margin-top:24px;border:1px solid #b9e4f7;border-radius:6px;padding:20px}.cleanup-danger{border-color:#d14343;background:#fffafa}.cleanup-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.cleanup-button{padding:10px 16px;border-radius:5px;border:1px solid #0a3b78;background:#fff;color:#0a3b78;font:inherit;cursor:pointer}.cleanup-button.primary{background:#0b65b1;color:#fff}.cleanup-button.danger{background:#b3261e;border-color:#b3261e;color:#fff}.cleanup-button:disabled{opacity:.65;cursor:not-allowed}.cleanup-banner{padding:12px 14px;margin-top:18px;border-radius:5px}.cleanup-error{background:#fff1f0;border:1px solid #d14343}.cleanup-success{background:#eef9f1;border:1px solid #4c9a62}.cleanup-table{width:100%;border-collapse:collapse;font-size:13px}.cleanup-table th,.cleanup-table td{text-align:left;padding:9px 10px;border-bottom:1px solid #e2e7eb;vertical-align:top}.cleanup-table th{background:#f2f6fa}.cleanup-table-wrap{overflow-x:auto}.cleanup-confirm{display:flex;flex-direction:column;gap:8px;max-width:420px;margin-top:20px;font-weight:600}.cleanup-input{width:100%;padding:11px 12px;border:1px solid #b8c2cc;border-radius:5px;font:inherit}.cleanup-warning{padding:14px;background:#fff4e5;border:1px solid #e09b32;border-radius:5px;line-height:1.5}@media(max-width:760px){.cleanup-page{padding:20px}}`}</style>
    <h1>Certificate Test Data Cleanup</h1>
    <p className="cleanup-helper">Use Selective Test Cleanup for conservative marker-based development data. Use the separate danger zone only after confirming that every certificate and certificate cohort is test data.</p>
    {error ? <div className="cleanup-banner cleanup-error" role="alert">{error}</div> : null}
    {message ? <div className="cleanup-banner cleanup-success" role="status">{message}</div> : null}

    <section className="cleanup-card"><h2>Selective Test Cleanup</h2><p className="cleanup-helper">Finds only clearly marked test records by recipient, training title, cohort, or test-only cohort references. This existing workflow does not select realistic-looking records automatically.</p><button className="cleanup-button primary" type="button" disabled={busy} onClick={() => void scanSelective()}>{busy ? "Scanning…" : "Run selective dry run"}</button>{preview && !preview.proposedNumber ? <CleanupPreview preview={preview} matchedNumbers={matchedNumbers} /> : null}</section>

    <section className="cleanup-card cleanup-danger"><h2>Danger Zone</h2><h3>Reset Certificate Test Environment</h3><p className="cleanup-warning">This permanently deletes every <strong>certificate</strong> and <strong>certificateCohort</strong> currently stored in Sanity. Certificate signatories and all non-certificate content are preserved.</p><button className="cleanup-button" type="button" disabled={busy} onClick={() => void scanFullReset()}>{busy ? "Scanning…" : "Run Full Reset Dry Run"}</button>{preview?.proposedNumber ? <><CleanupPreview preview={preview} matchedNumbers={matchedNumbers} /><p className="cleanup-helper">The full reset includes published and draft records returned by the raw Sanity perspective. No deletion has occurred during this dry run.</p>{preview.blockingReferences.length ? <p className="cleanup-error" role="alert">Deletion blocked by: {preview.blockingReferences.map((item) => `${item._type} (${item._id})`).join(", ")}</p> : <label className="cleanup-confirm">Type DELETE ALL CERTIFICATES to enable deletion<input className="cleanup-input" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="DELETE ALL CERTIFICATES" /></label>}<div className="cleanup-actions"><button className="cleanup-button danger" type="button" disabled={busy || confirmation !== "DELETE ALL CERTIFICATES" || Boolean(preview.blockingReferences.length)} onClick={() => void deleteAllCertificateData()}>Delete All Certificate Data</button></div></> : null}</section>
  </main>;
}

function CleanupPreview({ preview, matchedNumbers }: { preview: Preview; matchedNumbers: string }) {
  return <div className="cleanup-card"><h2>Dry-run preview</h2><p className="cleanup-helper">Certificate records: {preview.certificates.length} · Certificate cohorts: {preview.cohorts.length}{preview.signatoryCount ? ` · Certificate signatories preserved: ${preview.signatoryCount}` : ""}</p><h3>Certificates</h3><div className="cleanup-table-wrap"><table className="cleanup-table"><thead><tr><th>Recipient</th><th>Certificate number</th><th>Training</th><th>Cohort</th><th>Issue date</th><th>Status</th></tr></thead><tbody>{preview.certificates.map((item) => <tr key={item._id}><td>{item.recipientName || "—"}</td><td>{item.certificateNumber || "—"}</td><td>{item.trainingTitle || "—"}</td><td>{item.cohort || "—"}</td><td>{item.issueDate || "—"}</td><td>{item.status || "—"}</td></tr>)}</tbody></table></div><h3>Certificate cohorts</h3><div className="cleanup-table-wrap"><table className="cleanup-table"><thead><tr><th>Title</th><th>Training</th><th>Issue date</th><th>Recipient count</th><th>Reference count</th><th>Status</th></tr></thead><tbody>{preview.cohorts.map((item) => <tr key={item._id}><td>{item.title || "—"}</td><td>{item.trainingTitle || "—"}</td><td>{item.issueDate || "—"}</td><td>{item.recipientCount ?? "—"}</td><td>{item.certificates?.length ?? 0}</td><td>{item.status || "—"}</td></tr>)}</tbody></table></div>{matchedNumbers ? <p className="cleanup-helper">Numbers in scope: {matchedNumbers}</p> : null}<p className="cleanup-helper">Proposed next RCM number for 2026-09-08: <strong>{preview.proposedNumber}</strong></p></div>;
}

export const certificateTestDataCleanupTool = { name: "certificate-test-data-cleanup", title: "Certificate Test Data Cleanup", component: CertificateTestDataCleanupTool };
