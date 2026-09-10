type CertificateEnv = {
  SANITY_PROJECT_ID?: string;
  SANITY_DATASET?: string;
  SANITY_API_TOKEN?: string;
};

type PublicCertificate = {
  certificateNumber: string;
  recipientName: string;
  trainingTitle: string;
  trainingDuration?: string;
  issueDate: string;
  trainerNames?: string[];
  cohort?: string;
  status: "valid" | "revoked";
};

const requestWindowMs = 60_000;
const maxRequestsPerWindow = 30;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function clientKey(request: Request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function allowedRequest(request: Request) {
  const now = Date.now();
  const key = clientKey(request);
  const current = requestCounts.get(key);
  if (!current || current.resetAt <= now) {
    requestCounts.set(key, { count: 1, resetAt: now + requestWindowMs });
    return true;
  }
  if (current.count >= maxRequestsPerWindow) return false;
  current.count += 1;
  return true;
}

function normalizeNumber(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function isSafeCertificateNumber(value: string) {
  return value.length >= 3 && value.length <= 100 && /^[A-Z0-9][A-Z0-9._/-]*$/.test(value);
}

function isSafeToken(value: string) {
  return value.length >= 16 && value.length <= 128 && /^[A-Za-z0-9_-]+$/.test(value);
}

export async function onRequest(context: { request: Request; env: CertificateEnv }) {
  const { request, env } = context;
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
  if (!allowedRequest(request)) return json({ error: "Too many requests. Please try again shortly." }, 429);

  const url = new URL(request.url);
  const number = url.searchParams.get("number");
  const token = url.searchParams.get("token");
  const lookup = number ? { field: "certificateNumber", value: normalizeNumber(number) } : token ? { field: "verificationToken", value: token.trim() } : null;

  if (!lookup || lookup.value.length > 128) return json({ error: "Enter a certificate number or verification token." }, 400);
  if (lookup.field === "certificateNumber" ? !isSafeCertificateNumber(lookup.value) : !isSafeToken(lookup.value)) return json({ error: "The verification details are not valid." }, 400);

  const projectId = env.SANITY_PROJECT_ID?.trim();
  const dataset = env.SANITY_DATASET?.trim();
  if (!projectId || !dataset) return json({ error: "Certificate verification is temporarily unavailable." }, 503);

  const query = lookup.field === "certificateNumber"
    ? '*[_type == "certificate" && (certificateNumber == $value || legacyCertificateNumber == $value)][0...2]{certificateNumber, recipientName, trainingTitle, trainingDuration, issueDate, trainerNames, cohort, status}'
    : '*[_type == "certificate" && verificationToken == $value][0...2]{certificateNumber, recipientName, trainingTitle, trainingDuration, issueDate, trainerNames, cohort, status}';
  const endpoint = new URL(`https://${projectId}.api.sanity.io/v2026-09-03/data/query/${encodeURIComponent(dataset)}`);
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("$value", JSON.stringify(lookup.value));

  try {
    const response = await fetch(endpoint, {
      headers: env.SANITY_API_TOKEN ? { authorization: `Bearer ${env.SANITY_API_TOKEN}` } : undefined,
    });
    if (!response.ok) return json({ error: "Certificate verification is temporarily unavailable." }, 502);
    const payload = await response.json() as { result?: PublicCertificate[] };
    const matches = payload.result ?? [];
    if (matches.length > 1) return json({ error: "Certificate verification is temporarily unavailable." }, 409);
    return json({ certificate: matches[0] ?? null });
  } catch {
    return json({ error: "Certificate verification is temporarily unavailable." }, 502);
  }
}
