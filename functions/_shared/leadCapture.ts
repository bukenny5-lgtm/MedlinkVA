export type LeadEnv = {
  BREVO_API_KEY?: string;
  BREVO_CONTACT_LIST_ID?: string;
  BREVO_CONSULTATION_LIST_ID?: string;
  BREVO_NEWSLETTER_LIST_ID?: string;
};

export class LeadRequestError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export type LeadRouteConfig<TPayload> = {
  routeKey: string;
  listIdKey: keyof LeadEnv;
  successMessage: string;
  parseBody(body: Record<string, unknown>): TPayload;
  buildBrevoPayload(payload: TPayload, listId: number): BrevoContactPayload;
};

type BrevoContactPayload = {
  email: string;
  attributes: Record<string, string>;
  listIds: number[];
  updateEnabled: boolean;
  emailBlacklisted: boolean;
};

const MAX_REQUEST_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestBuckets = new Map<string, number[]>();

function jsonResponse(body: Record<string, unknown>, status = 200, extraHeaders?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function notAllowed() {
  return jsonResponse({ ok: false, code: "METHOD_NOT_ALLOWED", message: "Method not allowed." }, 405, {
    Allow: "POST",
  });
}

function configurationError() {
  return jsonResponse(
    {
      ok: false,
      code: "CONFIGURATION_ERROR",
      message: "Lead capture is not configured on the server yet.",
    },
    503,
  );
}

function parseListId(value?: string) {
  const parsed = Number.parseInt(value?.trim() ?? "", 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function getIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("cf-connecting-ip")?.trim() || forwardedFor || "unknown";
}

function enforceRateLimit(request: Request, routeKey: string) {
  const key = `${routeKey}:${getIpAddress(request)}`;
  const now = Date.now();
  const entries = (requestBuckets.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (entries.length >= RATE_LIMIT_MAX_REQUESTS) {
    return jsonResponse(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Too many requests were sent too quickly. Please try again later.",
      },
      429,
    );
  }

  entries.push(now);
  requestBuckets.set(key, entries);

  return null;
}

async function readJsonBody(request: Request) {
  const rawBody = await request.text();

  if (rawBody.length > MAX_REQUEST_BYTES) {
    throw new LeadRequestError(413, "PAYLOAD_TOO_LARGE", "The submission is too large. Please shorten it and try again.");
  }

  if (!rawBody.trim()) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", "The submission is empty.");
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    throw new LeadRequestError(400, "INVALID_JSON", "The submission body must be valid JSON.");
  }
}

function expectObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", "The submission is malformed.");
  }

  return value as Record<string, unknown>;
}

function readStringField(
  value: Record<string, unknown>,
  field: string,
  options?: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  },
) {
  const raw = value[field];

  if (typeof raw !== "string") {
    if (options?.required ?? true) {
      throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is required.`);
    }

    return "";
  }

  const trimmed = raw.trim();

  if ((options?.required ?? true) && trimmed.length === 0) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is required.`);
  }

  if (options?.minLength && trimmed.length < options.minLength) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is too short.`);
  }

  if (options?.maxLength && trimmed.length > options.maxLength) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is too long.`);
  }

  return trimmed;
}

function readOptionalStringField(value: Record<string, unknown>, field: string, maxLength = 500) {
  const raw = value[field];

  if (raw == null || raw === "") {
    return "";
  }

  if (typeof raw !== "string") {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is invalid.`);
  }

  const trimmed = raw.trim();

  if (trimmed.length > maxLength) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is too long.`);
  }

  return trimmed;
}

function readStringArrayField(value: Record<string, unknown>, field: string, maxLength = 10) {
  const raw = value[field];

  if (!Array.isArray(raw)) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is required.`);
  }

  const entries = raw
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);

  if (entries.length === 0) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} is required.`);
  }

  if (entries.length > maxLength) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${field} has too many selections.`);
  }

  return entries;
}

async function sendToBrevo(apiKey: string, payload: BrevoContactPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new LeadRequestError(502, "BREVO_ERROR", "The lead could not be delivered right now.");
    }
  } catch (error) {
    if (error instanceof LeadRequestError) {
      throw error;
    }

    throw new LeadRequestError(502, "BREVO_ERROR", "The lead could not be delivered right now.");
  } finally {
    clearTimeout(timeout);
  }
}

export async function createLeadResponse<TPayload>(request: Request, env: LeadEnv, config: LeadRouteConfig<TPayload>) {
  if (request.method !== "POST") {
    return notAllowed();
  }

  const rateLimitResponse = enforceRateLimit(request, config.routeKey);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = expectObject(await readJsonBody(request));
    const payload = config.parseBody(body);
    const honeypotValue = (payload as { website?: unknown }).website;

    if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
      throw new LeadRequestError(400, "HONEYPOT_TRIGGERED", "The submission could not be processed.");
    }

    const apiKey = env.BREVO_API_KEY?.trim() ?? "";
    const listId = parseListId(env[config.listIdKey]);

    if (!apiKey || !listId) {
      return configurationError();
    }

    const brevoPayload = config.buildBrevoPayload(payload, listId);
    await sendToBrevo(apiKey, brevoPayload);

    return jsonResponse(
      {
        ok: true,
        message: config.successMessage,
      },
      200,
    );
  } catch (error) {
    if (error instanceof LeadRequestError) {
      return jsonResponse(
        {
          ok: false,
          code: error.code,
          message: error.message,
        },
        error.status,
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "UNEXPECTED_ERROR",
        message: "The lead could not be sent right now.",
      },
      500,
    );
  }
}

export { expectObject, readOptionalStringField, readStringArrayField, readStringField };
