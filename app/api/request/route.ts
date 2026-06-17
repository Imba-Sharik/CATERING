import { NextResponse } from "next/server";

import { parseRequestPayload } from "@/shared/lib/mail/validate-request";
import { sendRequestMail } from "@/shared/lib/mail/send-request-mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseRequestPayload(body);
    await sendRequestMail(payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const isClientError =
      message.startsWith("Field ") ||
      message === "Invalid request body";

    console.error("[api/request]", error);

    return NextResponse.json(
      { ok: false, error: isClientError ? message : "Failed to send request" },
      { status: isClientError ? 400 : 500 },
    );
  }
}
