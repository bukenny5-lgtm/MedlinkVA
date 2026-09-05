export type LeadSubmissionResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      code: string;
      message: string;
      configuration?: boolean;
    };

async function readResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return (await response.json()) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  const text = await response.text();

  return text ? { message: text } : {};
}

function fallbackErrorMessage(status: number) {
  if (status === 400) {
    return "Please check the form and try again.";
  }

  if (status === 413) {
    return "The submission is too large. Please shorten your message and try again.";
  }

  if (status === 429) {
    return "Too many requests were sent too quickly. Please wait and try again.";
  }

  if (status === 503) {
    return "Lead capture is not configured yet.";
  }

  return "The form could not be sent right now. Please try again later.";
}

export async function submitLeadForm(endpoint: string, payload: Record<string, unknown>): Promise<LeadSubmissionResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await readResponseBody(response);
    const message =
      typeof body.message === "string" && body.message.trim().length > 0
        ? body.message
        : fallbackErrorMessage(response.status);

    if (response.ok) {
      return { ok: true, message };
    }

    return {
      ok: false,
      code: typeof body.code === "string" ? body.code : `HTTP_${response.status}`,
      configuration: response.status === 503 && body.code === "CONFIGURATION_ERROR",
      message,
    };
  } catch {
    return {
      ok: false,
      code: "NETWORK_ERROR",
      message: "The form could not be sent right now. Please try again later.",
    };
  }
}
