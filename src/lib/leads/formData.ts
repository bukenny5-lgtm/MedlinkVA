export function readTrimmedField(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function readTrimmedOptionalField(formData: FormData, name: string) {
  const value = readTrimmedField(formData, name);
  return value.length > 0 ? value : "";
}

export function readMultiValueField(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => value.length > 0);
}
