import type { DocumentActionComponent } from "sanity";
import { useClient, useDocumentOperation } from "sanity";
import { allocateCertificateNumbers, issueDatePart } from "../lib/certificateNumber";

type CertificateDraft = {
  certificateNumber?: string;
  issueDate?: string;
  programCode?: string;
};

const apiVersion = "2026-09-03";

export const generateCertificateNumberAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion });
  const { patch } = useDocumentOperation(props.id, props.type);
  const document = (props.draft ?? props.published ?? {}) as CertificateDraft;
  const date = document.issueDate ? issueDatePart(document.issueDate) : null;
  const canGenerate = !document.certificateNumber && Boolean(date && document.programCode);

  return {
    label: "Generate certificate number",
    title: canGenerate ? "Generate a unique certificate number" : "Enter program code and issue date first",
    disabled: !canGenerate,
    onHandle: async () => {
      if (!canGenerate || !date || !document.programCode) return;
      const existing = await client.fetch<string[]>(`*[_type == "certificate" && defined(certificateNumber)].certificateNumber`, {}, { perspective: "previewDrafts" });
      const [candidate] = allocateCertificateNumbers(existing, document.programCode, document.issueDate!, 1);
      if (!candidate) throw new Error("Certificate number could not be allocated.");
      patch.execute([{ set: { certificateNumber: candidate } }]);
      props.onComplete();
    },
  };
};
