import { useClient } from "sanity";
import type { DocumentActionComponent } from "sanity";
import {
  certificatePdfFilename,
  createCertificatePdf,
  type CertificatePdfRecord,
  type CertificatePdfSignatory,
} from "../lib/certificatePdf";

type CertificateActionRecord = CertificatePdfRecord & {
  signatories?: Array<{ _ref?: string }>;
};

type Signatory = CertificatePdfSignatory & { _id?: string };

function requiredFields(record: CertificateActionRecord) {
  return ["certificateNumber", "recipientName", "trainingTitle", "issueDate", "verificationToken", "status"]
    .filter((field) => !record[field as keyof CertificateActionRecord]);
}

export const generateCertificatePdfAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-09-03" });
  const record = (props.draft ?? props.published ?? {}) as CertificateActionRecord;
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

        const pdf = await createCertificatePdf(record, signatories);
        pdf.save(certificatePdfFilename(record.certificateNumber!));
        window.alert("Certificate PDF generated successfully.");
        props.onComplete();
      } catch (error) {
        console.error("Certificate PDF generation failed", error);
        window.alert("Certificate PDF could not be generated. Please check the certificate data and try again.");
      }
    },
  };
};
