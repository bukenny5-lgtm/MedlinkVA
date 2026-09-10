import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useClient } from "sanity";
import type { DocumentActionComponent } from "sanity";
import logoUrl from "../assets/medlink-va-logo.png";

type CertificateRecord = {
  certificateNumber?: string;
  legacyCertificateNumber?: string;
  recipientName?: string;
  trainingTitle?: string;
  trainingDuration?: string;
  issueDate?: string;
  trainerNames?: string[];
  cohort?: string;
  status?: "valid" | "revoked";
  verificationToken?: string;
  originallyIssuedBeforeVerificationSystem?: boolean;
  signatories?: Array<{ _ref?: string }>;
};

type Signatory = {
  name: string;
  role: string;
  signatureImage?: { asset?: { url?: string; mimeType?: string } };
};

type PdfImage = { dataUrl: string; format: "PNG" | "JPEG"; width: number; height: number };

const verificationBaseUrl = "https://medlinkva.com/verify/";

function formatIssueDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function safeFilename(value: string) {
  return value.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "certificate";
}

function requiredFields(record: CertificateRecord) {
  return ["certificateNumber", "recipientName", "trainingTitle", "issueDate", "verificationToken", "status"]
    .filter((field) => !record[field as keyof CertificateRecord]);
}

function withoutAutoFormat(url: string) {
  const parsed = new URL(url, window.location.origin);
  parsed.searchParams.delete("auto");
  return parsed.toString();
}

function readBlob(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("The certificate image could not be read."));
    reader.readAsDataURL(blob);
  });
}

async function imageForPdf(url: string, label: string): Promise<PdfImage> {
  let response: Response;
  try {
    response = await fetch(withoutAutoFormat(url), { headers: { Accept: "image/png,image/jpeg" } });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "network request failed";
    throw new Error(`Failed to load ${label}: ${detail}`);
  }
  if (!response.ok) {
    throw new Error(`Failed to load ${label}: HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}`);
  }
  let blob: Blob;
  try {
    blob = await response.blob();
  } catch (error) {
    const detail = error instanceof Error ? error.message : "response could not be read";
    throw new Error(`Failed to read ${label}: ${detail}`);
  }
  const mimeType = blob.type.toLowerCase();
  if (mimeType === "image/png" || mimeType === "image/jpeg") {
    const dataUrl = await readBlob(blob);
    const dimensions = await imageDimensions(dataUrl, label);
    return { dataUrl, format: mimeType === "image/png" ? "PNG" : "JPEG", ...dimensions };
  }

  const objectUrl = URL.createObjectURL(blob);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error(`Failed to decode ${label}`));
      element.src = objectUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error(`Failed to decode ${label}: canvas is unavailable`);
    context.drawImage(image, 0, 0);
    return { dataUrl: canvas.toDataURL("image/png"), format: "PNG", width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function imageDimensions(dataUrl: string, label: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error(`Failed to decode ${label}`));
    image.src = dataUrl;
  });
}

function addContainedImage(pdf: jsPDF, image: PdfImage, x: number, y: number, boxWidth: number, boxHeight: number) {
  const scale = Math.min(boxWidth / image.width, boxHeight / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  pdf.addImage(image.dataUrl, image.format, x + (boxWidth - width) / 2, y + (boxHeight - height) / 2, width, height, undefined, "FAST");
}

function centeredText(pdf: jsPDF, text: string, y: number, size: number, color: [number, number, number]) {
  pdf.setFontSize(size);
  pdf.setTextColor(...color);
  pdf.text(text, 148.5, y, { align: "center" });
}

export const generateCertificatePdfAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-09-03" });
  const record = (props.draft ?? props.published ?? {}) as CertificateRecord;
  const missing = requiredFields(record);
  const disabled = missing.length > 0 || record.status === "revoked";

  return {
    label: "Generate PDF Certificate",
    title: record.status === "revoked" ? "Revoked certificates cannot be generated" : disabled ? `Missing: ${missing.join(", ")}` : "Download a certificate PDF from this record",
    disabled,
    onHandle: async () => {
      if (record.status === "revoked") {
        window.alert("This certificate is revoked. A normal active-looking certificate cannot be generated.");
        return;
      }
      if (missing.length) {
        window.alert(`Complete the required certificate fields first: ${missing.join(", ")}.`);
        return;
      }

      try {
        const signatoryIds = (record.signatories ?? []).map((signatory) => signatory._ref).filter(Boolean) as string[];
        const signatories = signatoryIds.length
          ? await client.fetch<Signatory[]>(`*[_type == "certificateSignatory" && _id in $ids] | order(displayOrder asc, name asc){name, role, signatureImage{asset->{url, mimeType}}}`, { ids: signatoryIds })
          : [];
        const missingSignatures = signatories.filter((signatory) => !signatory.signatureImage?.asset?.url);
        if (missingSignatures.length && !window.confirm(`${missingSignatures.map((signatory) => signatory.name).join(", ")} ${missingSignatures.length === 1 ? "has" : "have"} no signature image. Continue with name and role only?`)) return;

        const verificationUrl = `${verificationBaseUrl}${encodeURIComponent(record.verificationToken!)}`;
        const qrDataUrl = await QRCode.toDataURL(verificationUrl, { errorCorrectionLevel: "M", margin: 4, width: 420 });
        const logo = await imageForPdf(logoUrl, "MedLink VA logo");
        const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        const navy: [number, number, number] = [10, 59, 120];
        const accent: [number, number, number] = [11, 101, 177];
        const sky: [number, number, number] = [41, 169, 232];
        const gold: [number, number, number] = [213, 166, 41];
        const darkText: [number, number, number] = [36, 54, 75];
        const muted: [number, number, number] = [102, 120, 138];
        const headerText: [number, number, number] = [207, 239, 255];

        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, 297, 210, "F");
        pdf.setDrawColor(...navy);
        pdf.setLineWidth(1.2);
        pdf.rect(4, 4, 289, 202);
        pdf.setDrawColor(...sky);
        pdf.setLineWidth(0.35);
        pdf.rect(7, 7, 283, 196);
        pdf.setFillColor(...navy);
        pdf.rect(8, 8, 281, 26, "F");
        pdf.setFillColor(...sky);
        pdf.rect(8, 34, 3, 162, "F");
        pdf.rect(286, 34, 3, 162, "F");
        pdf.setFillColor(...navy);
        pdf.rect(8, 196, 281, 8, "F");
        addContainedImage(pdf, logo, 16, 11, 18, 20);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(255, 255, 255);
        pdf.text("MEDLINK VA", 39, 24);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(...headerText);
        pdf.text("Virtual Assistance • Healthcare Training", 279, 24, { align: "right" });

        pdf.setFont("times", "bold");
        pdf.setFontSize(25);
        pdf.setTextColor(...navy);
        pdf.text("CERTIFICATE OF PARTICIPATION", 148.5, 52, { align: "center" });
        pdf.setDrawColor(...gold);
        pdf.setLineWidth(1.1);
        pdf.line(96, 59, 201, 59);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(...muted);
        pdf.text("PROUDLY PRESENTED TO", 148.5, 67, { align: "center" });
        const recipientSize = Math.min(22, Math.max(14, 310 / record.recipientName!.length));
        pdf.setFont("times", "bold");
        pdf.setFontSize(recipientSize);
        pdf.setTextColor(...accent);
        pdf.text(record.recipientName!, 148.5, 81, { align: "center", maxWidth: 190 });
        pdf.setDrawColor(...sky);
        pdf.setLineWidth(0.55);
        pdf.line(82, 87, 215, 87);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.setTextColor(...darkText);
        const durationText = record.trainingDuration ? `for completing ${record.trainingDuration} of practical training in` : "for completing practical training in";
        pdf.text(durationText, 148.5, 96, { align: "center" });
        const titleSize = record.trainingTitle!.length > 62 ? 12 : 15;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(titleSize);
        pdf.setTextColor(...navy);
        const titleLines = pdf.splitTextToSize(record.trainingTitle!, 210) as string[];
        pdf.text(titleLines, 148.5, 108, { align: "center", maxWidth: 210, lineHeightFactor: 1.15 });
        const recognitionY = 118 + Math.max(0, titleLines.length - 1) * 5;
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(9);
        pdf.setTextColor(...muted);
        pdf.text("Awarded in recognition of active participation and commitment to professional development.", 148.5, recognitionY, { align: "center", maxWidth: 220 });

        const panelY = 145;
        const fixedPanels = [
          { x: 30, width: 82, signatory: signatories[0] },
          { x: 185, width: 82, signatory: signatories[1] },
        ];
        const drawSignatoryPanel = async (panel: { x: number; width: number; signatory?: Signatory }, compact = false) => {
          if (!panel.signatory) return;
          const centerX = panel.x + panel.width / 2;
          const imageUrl = panel.signatory.signatureImage?.asset?.url;
          if (imageUrl) addContainedImage(pdf, await imageForPdf(imageUrl, `signature image for ${panel.signatory.name}`), panel.x + 18, panelY + 2, 46, 10);
          pdf.setDrawColor(...navy);
          pdf.setLineWidth(0.4);
          pdf.line(centerX - 24, panelY + 17, centerX + 24, panelY + 17);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(compact ? 7 : 8.5);
          pdf.setTextColor(...navy);
          pdf.text(panel.signatory.name, centerX, panelY + 24, { align: "center", maxWidth: panel.width - 8 });
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.setTextColor(...muted);
          pdf.text(panel.signatory.role, centerX, panelY + 28, { align: "center", maxWidth: panel.width - 8 });
        };

        if (signatories.length <= 2) {
          await drawSignatoryPanel(fixedPanels[0]);
          await drawSignatoryPanel(fixedPanels[1]);
        } else {
          for (const [index, signatory] of signatories.entries()) {
            await drawSignatoryPanel({ x: 24 + index * 72, width: 67, signatory }, true);
          }
        }

        const trainers = record.trainerNames?.filter(Boolean).join("  •  ");
        if (!signatories.length && trainers) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.setTextColor(...muted);
          pdf.text(`Trainer${record.trainerNames!.length === 1 ? "" : "s"}: ${trainers}`, 148.5, 180, { align: "center", maxWidth: 105 });
        }

        const metaX = 136.5;
        const metadataTop = 126;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7);
        pdf.setTextColor(...muted);
        pdf.text("DATE OF ISSUE", metaX, metadataTop, { align: "center" });
        pdf.setFontSize(9);
        pdf.setTextColor(...navy);
        pdf.text(formatIssueDate(record.issueDate!), metaX, metadataTop + 7, { align: "center" });
        pdf.setFontSize(7);
        pdf.setTextColor(...muted);
        pdf.text("CERTIFICATE NUMBER", metaX, metadataTop + 14, { align: "center" });
        pdf.setFontSize(8);
        pdf.setTextColor(...navy);
        pdf.text(record.certificateNumber!, metaX, metadataTop + 21, { align: "center", maxWidth: 45 });
        const qrX = 159;
        const qrY = 145;
        const qrCenterX = qrX + 9;
        pdf.addImage(qrDataUrl, "PNG", qrX, qrY, 18, 18, undefined, "FAST");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(5.5);
        pdf.setTextColor(...muted);
        pdf.text("Scan to verify", qrCenterX, qrY + 21, { align: "center" });
        pdf.setFontSize(8);
        pdf.setTextColor(...muted);
        pdf.text("Issued by Medlink VA", 15, 186);
        if (record.cohort) pdf.text(`Cohort: ${record.cohort}`, 18, 191, { maxWidth: 92 });
        if (record.legacyCertificateNumber) pdf.text(`Legacy Certificate No: ${record.legacyCertificateNumber}`, 205, 191, { align: "center", maxWidth: 78 });
        if (record.originallyIssuedBeforeVerificationSystem) {
          pdf.setFontSize(5.5);
          pdf.text("Digitally reissued under the MedLink VA certificate verification system.", 148.5, 194, { align: "center" });
        }

        pdf.save(`MedLink-VA-Certificate-${safeFilename(record.certificateNumber!)}.pdf`);
        window.alert("Certificate PDF generated successfully.");
        props.onComplete();
      } catch (error) {
        console.error("Certificate PDF generation failed", error);
        window.alert("Certificate PDF could not be generated. Please check the certificate data and try again.");
      }
    },
  };
};
