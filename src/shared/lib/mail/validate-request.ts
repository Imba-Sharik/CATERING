import type { RequestFormPayload } from "./types";

const REQUIRED_FIELDS: (keyof RequestFormPayload)[] = [
  "name",
  "phone",
  "eventDate",
  "guests",
];

export function parseRequestPayload(body: unknown): RequestFormPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const record = body as Record<string, unknown>;

  const payload: RequestFormPayload = {
    name: String(record.name ?? "").trim(),
    phone: String(record.phone ?? "").trim(),
    eventDate: String(record.eventDate ?? "").trim(),
    guests: String(record.guests ?? "").trim(),
    format: String(record.format ?? "").trim(),
    comment: String(record.comment ?? "").trim(),
  };

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field]) {
      throw new Error(`Field "${field}" is required`);
    }
  }

  // РФ-номер: ровно 11 цифр, код страны 7 или 8
  const phoneDigits = payload.phone.replace(/\D/g, "");
  if (phoneDigits.length !== 11 || !/^[78]/.test(phoneDigits)) {
    throw new Error(`Field "phone" is invalid`);
  }

  return payload;
}
