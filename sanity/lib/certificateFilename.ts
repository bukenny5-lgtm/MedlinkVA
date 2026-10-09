function safeFilenamePart(value?: string) {
  if (!value) return "";
  return value
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[. ]+$/g, "");
}

export function certificatePdfFilename(recipientName?: string, certificateNumber?: string) {
  const recipient = safeFilenamePart(recipientName);
  const number = safeFilenamePart(certificateNumber);
  if (recipient && number) return `${recipient} - ${number}.pdf`;
  if (recipient) return `${recipient} - MedLink VA Certificate.pdf`;
  if (number) return `MedLink VA Certificate - ${number}.pdf`;
  return "MedLink VA Certificate.pdf";
}
