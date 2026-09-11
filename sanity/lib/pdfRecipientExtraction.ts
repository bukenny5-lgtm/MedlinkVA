import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

export type PdfRecipientPage = {
  fileName: string;
  pageNumber: number;
  text: string;
  detectedName: string;
  confidence: "High" | "Review" | "No name detected" | "Scanned or no selectable text";
};

export type PdfRecipientExtraction = {
  fileName: string;
  pages: PdfRecipientPage[];
};

const maxPdfBytes = 10 * 1024 * 1024;
const maxPdfFiles = 10;
const markerPattern = /proudly\s+presented\s+to/i;
const boilerplatePattern = /^(certificate|of|participation|proudly|presented|to|for|completing|practical|training|in|awarded|recognition|active|participation|commitment|professional|development|medlink|va|issued|date|certificate|number|scan|verify)$/i;

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function candidateName(items: string[], markerIndex: number) {
  const markerEnd = markerIndex + 1;
  for (let index = markerEnd; index < Math.min(items.length, markerEnd + 5); index += 1) {
    const candidate = normalize(items[index]);
    if (!candidate || markerPattern.test(candidate) || boilerplatePattern.test(candidate)) continue;
    if (/^[-–—•:]+$/.test(candidate)) continue;
    if (/\d{3,}/.test(candidate)) continue;
    return { name: candidate, confidence: index === markerEnd ? "High" as const : "Review" as const };
  }
  return { name: "", confidence: "No name detected" as const };
}

export async function extractPdfRecipients(files: File[]): Promise<PdfRecipientExtraction[]> {
  if (!files.length) throw new Error("Choose at least one PDF file.");
  if (files.length > maxPdfFiles) throw new Error(`Select no more than ${maxPdfFiles} PDFs per extraction session.`);
  files.forEach((file) => {
    if (file.size > maxPdfBytes) throw new Error(`${file.name} is larger than the 10 MB PDF limit.`);
    if (!file.name.toLowerCase().endsWith(".pdf")) throw new Error(`${file.name} is not a PDF. Select only .pdf files.`);
  });

  const results: PdfRecipientExtraction[] = [];
  for (const file of files) {
    const loadingTask = pdfjsLib.getDocument({ data: await file.arrayBuffer(), useWorkerFetch: false });
    const pdf = await loadingTask.promise;
    const pages: PdfRecipientPage[] = [];
    try {
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const items = content.items.map((item) => "str" in item ? normalize(item.str) : "").filter(Boolean);
        const text = items.join(" ");
        const markerIndex = items.findIndex((item) => markerPattern.test(item));
        if (!text) {
          pages.push({ fileName: file.name, pageNumber, text: "", detectedName: "", confidence: "Scanned or no selectable text" });
        } else if (markerIndex < 0) {
          pages.push({ fileName: file.name, pageNumber, text, detectedName: "", confidence: "No name detected" });
        } else {
          const candidate = candidateName(items, markerIndex);
          pages.push({ fileName: file.name, pageNumber, text, detectedName: candidate.name, confidence: candidate.confidence });
        }
        page.cleanup();
      }
    } finally {
      await loadingTask.destroy?.();
    }
    results.push({ fileName: file.name, pages });
  }
  return results;
}

export { maxPdfBytes, maxPdfFiles };
