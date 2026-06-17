import "server-only";

import nodemailer from "nodemailer";

import { getMailEnv } from "./env";
import {
  buildRequestMailHtml,
  buildRequestMailText,
} from "./request-mail-template";
import type { RequestFormPayload } from "./types";

export async function sendRequestMail(data: RequestFormPayload): Promise<void> {
  const mailEnv = getMailEnv();

  const transporter = nodemailer.createTransport({
    host: mailEnv.host,
    port: mailEnv.port,
    secure: mailEnv.secure,
    auth: {
      user: mailEnv.user,
      pass: mailEnv.pass,
    },
  });

  await transporter.sendMail({
    from: mailEnv.from,
    to: mailEnv.to,
    subject: `Заявка с сайта — ${data.name}`,
    text: buildRequestMailText(data),
    html: buildRequestMailHtml(data),
    replyTo: data.phone.includes("@") ? data.phone : undefined,
  });
}
