export const CERTIFICATE_NUMBER_PATTERN = /^MLVA-([A-Z0-9]+)-(\d{8})-(\d{3,})$/;

export function issueDatePart(issueDate: string) {
  const value = issueDate.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.replaceAll("-", "") : null;
}

export function certificateNumberPrefix(programCode: string, issueDate: string) {
  const date = issueDatePart(issueDate);
  return date ? `MLVA-${programCode}-${date}-` : null;
}

export function buildCertificateNumber(prefix: string, sequence: number) {
  return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export function allocateCertificateNumbers(existingNumbers: string[], programCode: string, issueDate: string, count: number) {
  const prefix = certificateNumberPrefix(programCode, issueDate);
  if (!prefix || count < 1) return [];
  const used = new Set(existingNumbers);
  const allocated: string[] = [];
  let sequence = 1;
  while (allocated.length < count) {
    const candidate = buildCertificateNumber(prefix, sequence);
    if (!used.has(candidate)) {
      allocated.push(candidate);
      used.add(candidate);
    }
    sequence += 1;
  }
  return allocated;
}
