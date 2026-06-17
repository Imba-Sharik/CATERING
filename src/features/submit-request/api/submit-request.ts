import type { RequestFormPayload } from "@/shared/lib/mail/types";

type SubmitRequestResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitRequest(
  payload: RequestFormPayload,
): Promise<SubmitRequestResult> {
  const response = await fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as SubmitRequestResult;

  if (!response.ok || !data.ok) {
    return {
      ok: false,
      error: data.ok === false ? data.error : "Не удалось отправить заявку",
    };
  }

  return { ok: true };
}
