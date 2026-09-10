import type { DocumentActionComponent } from "sanity";
import { useClient, useDocumentOperation } from "sanity";

type CertificateDraft = {
  certificateNumber?: string;
  issueDate?: string;
  programCode?: string;
};

const apiVersion = "2026-09-03";

function datePart(issueDate: string) {
  const value = issueDate.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.replaceAll("-", "") : null;
}

export const generateCertificateNumberAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion, perspective: "previewDrafts" });
  const { patch } = useDocumentOperation(props.id, props.type);
  const document = (props.draft ?? props.published ?? {}) as CertificateDraft;
  const date = document.issueDate ? datePart(document.issueDate) : null;
  const canGenerate = !document.certificateNumber && Boolean(date && document.programCode);

  return {
    label: "Generate certificate number",
    title: canGenerate ? "Generate a unique certificate number" : "Enter program code and issue date first",
    disabled: !canGenerate,
    onHandle: async () => {
      if (!canGenerate || !date || !document.programCode) return;
      const prefix = `MLVA-${document.programCode}-${date}-`;
      const existing = await client.fetch<string[]>(`*[_type == "certificate" && defined(certificateNumber)].certificateNumber`, {}, { perspective: "previewDrafts" });
      const used = new Set(existing);
      let sequence = 1;
      let candidate = `${prefix}${String(sequence).padStart(3, "0")}`;
      while (used.has(candidate)) {
        sequence += 1;
        candidate = `${prefix}${String(sequence).padStart(3, "0")}`;
      }
      if (used.has(candidate)) throw new Error("Certificate number already exists. Refresh and try again.");
      patch.execute([{ set: { certificateNumber: candidate } }]);
      props.onComplete();
    },
  };
};
