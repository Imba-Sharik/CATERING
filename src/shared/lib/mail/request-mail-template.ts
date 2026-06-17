import type { RequestFormPayload } from "./types";

const COLORS = {
  surface: "#0a0a0a",
  card: "#000000",
  cardInner: "#111111",
  foreground: "#ffffff",
  muted: "#bfbfbf",
  border: "#2e2e2e",
  chip: "#1c1c1c",
} as const;

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dash(value: string): string {
  return value.trim() || "—";
}

function formatReceivedAt(): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(new Date());
}

// Короткий номер заявки. Помимо удобства, делает каждое письмо уникальным —
// иначе Gmail/Яндекс/Mail.ru сворачивают повторяющийся каркас в «цитату».
function buildRef(): string {
  return Date.now().toString(36).toUpperCase().slice(-6);
}

function buildPreheader(data: RequestFormPayload): string {
  const guests = data.guests.toLowerCase().includes("гост")
    ? data.guests
    : `${data.guests} гостей`;

  return `Новая заявка от ${data.name} — ${data.eventDate}, ${guests}`;
}

export function buildRequestMailText(data: RequestFormPayload): string {
  return [
    "CATERING BY LOFT HALL",
    "",
    `Новая заявка с сайта (№${buildRef()})`,
    `Получена: ${formatReceivedAt()} (МСК)`,
    "",
    `Имя:               ${data.name}`,
    `Телефон:           ${data.phone}`,
    `Дата события:      ${data.eventDate}`,
    `Количество гостей: ${data.guests}`,
    `Формат:            ${dash(data.format)}`,
    "",
    "Комментарий:",
    dash(data.comment),
    "",
    "info@lofthall.ru · +7 (966) 195-02-25",
    "ул. Ленинская Слобода, 26с 15, Москва",
  ].join("\n");
}

const LABEL_STYLE = `margin:0 0 6px;font-family:${FONT_STACK};font-size:11px;line-height:16px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.muted};`;
const VALUE_STYLE = `margin:0;font-family:${FONT_STACK};font-size:16px;line-height:24px;font-weight:400;color:${COLORS.foreground};`;

// Две колонки напрямую в <td> — без вложенных таблиц, чтобы разметка была плоской
// и переживала клиенты/расширения, которые её переупаковывают.
function fieldRow(left: [string, string], right: [string, string]): string {
  return (
    `<tr>` +
    `<td class="field-col" valign="top" width="50%" style="width:50%;padding:0 12px 22px 0;">` +
    `<p style="${LABEL_STYLE}">${escapeHtml(left[0])}</p>` +
    `<p style="${VALUE_STYLE}">${escapeHtml(left[1])}</p>` +
    `</td>` +
    `<td class="field-col" valign="top" width="50%" style="width:50%;padding:0 0 22px 12px;">` +
    `<p style="${LABEL_STYLE}">${escapeHtml(right[0])}</p>` +
    `<p style="${VALUE_STYLE}">${escapeHtml(right[1])}</p>` +
    `</td>` +
    `</tr>`
  );
}

function formatRow(value: string): string {
  const inner = value.trim()
    ? `<span style="display:inline-block;padding:7px 16px;background-color:${COLORS.chip};border:1px solid ${COLORS.border};border-radius:8px;font-family:${FONT_STACK};font-size:12px;line-height:18px;font-weight:500;color:${COLORS.foreground};">${escapeHtml(value)}</span>`
    : `<p style="${VALUE_STYLE}">—</p>`;

  return (
    `<tr><td colspan="2" style="padding-bottom:22px;">` +
    `<p style="${LABEL_STYLE}">Формат</p>` +
    inner +
    `</td></tr>`
  );
}

function commentRow(value: string): string {
  const html = escapeHtml(dash(value)).replaceAll("\n", "<br />");

  return (
    `<tr><td colspan="2">` +
    `<p style="${LABEL_STYLE}">Комментарий</p>` +
    `<div style="padding:16px;background-color:${COLORS.cardInner};border:1px solid ${COLORS.border};border-radius:8px;font-family:${FONT_STACK};font-size:15px;line-height:24px;color:${COLORS.foreground};">${html}</div>` +
    `</td></tr>`
  );
}

export function buildRequestMailHtml(data: RequestFormPayload): string {
  const preheader = escapeHtml(buildPreheader(data));
  const receivedAt = escapeHtml(formatReceivedAt());
  const phoneHref = escapeHtml(data.phone.replace(/[^\d+]/g, ""));
  const ref = buildRef();

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark only" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Заявка №${ref}</title>
  <style>
    body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; }
    @media only screen and (max-width:600px) {
      .email-card { padding:28px 22px !important; }
      .field-col { display:block !important; width:100% !important; padding:0 0 18px 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.surface};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${COLORS.surface};">${preheader}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${COLORS.surface}" style="border-collapse:collapse;background-color:${COLORS.surface};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"><tr><td><![endif]-->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;max-width:600px;margin:0 auto;">
          <tr>
            <td class="email-card" bgcolor="${COLORS.card}" style="background-color:${COLORS.card};border:1px solid ${COLORS.border};border-radius:16px;padding:40px 36px;">

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="font-family:${FONT_STACK};font-size:12px;line-height:18px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.foreground};">CATERING BY LOFT HALL</td>
                </tr>
                <tr>
                  <td style="padding-top:28px;font-family:${FONT_STACK};font-size:28px;line-height:34px;font-weight:600;color:${COLORS.foreground};">Новая заявка с сайта</td>
                </tr>
                <tr>
                  <td style="padding-top:8px;font-family:${FONT_STACK};font-size:14px;line-height:22px;color:${COLORS.muted};">№${ref} · получена ${receivedAt} (МСК)</td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${COLORS.cardInner}" style="border-collapse:collapse;margin-top:28px;background-color:${COLORS.cardInner};border:1px solid ${COLORS.border};border-radius:12px;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                      ${fieldRow(["Имя", data.name], ["Телефон", data.phone])}
                      ${fieldRow(["Дата события", data.eventDate], ["Количество гостей", data.guests])}
                      ${formatRow(data.format)}
                      ${commentRow(data.comment)}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td align="center" style="padding:28px 0 24px;">
                    <a href="tel:${phoneHref}" style="display:inline-block;padding:13px 26px;border:1px solid ${COLORS.foreground};border-radius:8px;font-family:${FONT_STACK};font-size:14px;line-height:20px;font-weight:500;color:${COLORS.foreground};text-decoration:none;">Позвонить клиенту</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-family:${FONT_STACK};font-size:12px;line-height:20px;color:${COLORS.muted};">
                    <a href="mailto:info@lofthall.ru" style="color:${COLORS.muted};text-decoration:none;">info@lofthall.ru</a>
                    &nbsp;·&nbsp;
                    <a href="tel:+79661950225" style="color:${COLORS.muted};text-decoration:none;">+7 (966) 195-02-25</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:6px;font-family:${FONT_STACK};font-size:11px;line-height:16px;color:${COLORS.muted};">ул. Ленинская Слобода, 26с 15, Москва</td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}
