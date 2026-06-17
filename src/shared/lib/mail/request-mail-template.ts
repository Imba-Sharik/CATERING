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

const TABLE_RESET =
  "border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;";

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

function buildPreheader(data: RequestFormPayload): string {
  const guests = data.guests.toLowerCase().includes("гост")
    ? data.guests
    : `${data.guests} гостей`;

  return `Новая заявка от ${data.name} — ${data.eventDate}, ${guests}`;
}

export function buildRequestMailText(data: RequestFormPayload): string {
  return [
    "CATERING BY LOFT HALL",
    "============================",
    "",
    "Новая заявка с сайта",
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
    "============================",
    "info@lofthall.ru",
    "+7 (966) 195-02-25",
    "ул. Ленинская Слобода, 26с 15, Москва",
  ].join("\n");
}

// Подпись поля (мелкий капс) + значение. Без переносов/отступов внутри ячейки,
// чтобы whitespace не «уезжал» в почтовых клиентах.
function fieldCell(label: string, value: string, paddingRight: number): string {
  return `<td valign="top" width="50%" style="width:50%;padding:0 ${paddingRight}px 0 0;">`
    + `<p style="margin:0 0 6px;font-family:${FONT_STACK};font-size:11px;line-height:16px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.muted};">${escapeHtml(label)}</p>`
    + `<p style="margin:0;font-family:${FONT_STACK};font-size:16px;line-height:24px;font-weight:400;color:${COLORS.foreground};">${escapeHtml(value)}</p>`
    + `</td>`;
}

// Одна строка из двух полей. На мобильном медиазапрос делает столбики (class field-col).
function fieldRow(left: [string, string], right: [string, string]): string {
  return `<tr>`
    + `<td class="field-col" valign="top" width="50%" style="width:50%;padding-bottom:24px;">`
    + `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}"><tr>`
    + fieldCell(left[0], left[1], 0)
    + `</tr></table></td>`
    + `<td class="field-col" valign="top" width="50%" style="width:50%;padding-bottom:24px;">`
    + `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}"><tr>`
    + fieldCell(right[0], right[1], 0)
    + `</tr></table></td>`
    + `</tr>`;
}

function formatRow(value: string): string {
  const inner = value.trim()
    ? `<span style="display:inline-block;padding:7px 16px;background-color:${COLORS.chip};border:1px solid ${COLORS.border};border-radius:8px;font-family:${FONT_STACK};font-size:12px;line-height:18px;font-weight:500;color:${COLORS.foreground};">${escapeHtml(value)}</span>`
    : `<p style="margin:0;font-family:${FONT_STACK};font-size:16px;line-height:24px;color:${COLORS.foreground};">—</p>`;

  return `<tr><td colspan="2" style="padding-bottom:24px;">`
    + `<p style="margin:0 0 10px;font-family:${FONT_STACK};font-size:11px;line-height:16px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.muted};">Формат</p>`
    + inner
    + `</td></tr>`;
}

function commentRow(value: string): string {
  const html = escapeHtml(dash(value)).replaceAll("\n", "<br />");

  return `<tr><td colspan="2">`
    + `<p style="margin:0 0 10px;font-family:${FONT_STACK};font-size:11px;line-height:16px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.muted};">Комментарий</p>`
    + `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}"><tr>`
    + `<td bgcolor="${COLORS.cardInner}" style="padding:16px;background-color:${COLORS.cardInner};border:1px solid ${COLORS.border};border-radius:8px;font-family:${FONT_STACK};font-size:15px;line-height:24px;color:${COLORS.foreground};">${html}</td>`
    + `</tr></table>`
    + `</td></tr>`;
}

export function buildRequestMailHtml(data: RequestFormPayload): string {
  const preheader = escapeHtml(buildPreheader(data));
  const receivedAt = escapeHtml(formatReceivedAt());
  const phoneHref = escapeHtml(data.phone.replace(/[^\d+]/g, ""));

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="dark only" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Заявка с сайта — ${escapeHtml(data.name)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table { border-collapse:collapse; }
    img { border:0; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    a { text-decoration:none; }
    @media only screen and (max-width:600px) {
      .email-card { padding:28px 22px !important; }
      .field-col { display:block !important; width:100% !important; box-sizing:border-box; padding-bottom:20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.surface};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${COLORS.surface};">${preheader}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${COLORS.surface}" style="${TABLE_RESET}background-color:${COLORS.surface};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"><tr><td><![endif]-->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}max-width:600px;margin:0 auto;">
          <tr>
            <td class="email-card" bgcolor="${COLORS.card}" style="background-color:${COLORS.card};border:1px solid ${COLORS.border};border-radius:16px;padding:40px 36px;">

              <!-- Шапка -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}">
                <tr>
                  <td style="padding-bottom:24px;font-family:${FONT_STACK};font-size:12px;line-height:18px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.foreground};">CATERING BY LOFT HALL</td>
                </tr>
              </table>

              <!-- Метка секции -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}">
                <tr>
                  <td valign="middle" style="font-family:${FONT_STACK};font-size:12px;line-height:18px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.muted};white-space:nowrap;padding-right:20px;">Заявка</td>
                  <td valign="middle" width="100%" style="font-size:0;line-height:0;"><div style="border-top:1px solid ${COLORS.border};font-size:0;line-height:0;">&nbsp;</div></td>
                </tr>
              </table>

              <!-- Заголовок -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}">
                <tr>
                  <td style="padding-top:24px;font-family:${FONT_STACK};font-size:28px;line-height:34px;font-weight:600;color:${COLORS.foreground};">Новая заявка с сайта</td>
                </tr>
                <tr>
                  <td style="padding-top:8px;padding-bottom:28px;font-family:${FONT_STACK};font-size:14px;line-height:22px;color:${COLORS.muted};">Получена ${receivedAt} (МСК)</td>
                </tr>
              </table>

              <!-- Карточка с данными -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${COLORS.cardInner}" style="${TABLE_RESET}background-color:${COLORS.cardInner};border:1px solid ${COLORS.border};border-radius:12px;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}">
                      ${fieldRow(["Имя", data.name], ["Телефон", data.phone])}
                      ${fieldRow(["Дата события", data.eventDate], ["Количество гостей", data.guests])}
                      ${formatRow(data.format)}
                      ${commentRow(data.comment)}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Кнопка -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}">
                <tr>
                  <td align="center" style="padding:28px 0;">
                    <a href="tel:${phoneHref}" style="display:inline-block;padding:13px 26px;border:1px solid ${COLORS.foreground};border-radius:8px;font-family:${FONT_STACK};font-size:14px;line-height:20px;font-weight:500;color:${COLORS.foreground};">Позвонить клиенту</a>
                  </td>
                </tr>
              </table>

              <!-- Футер -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${TABLE_RESET}">
                <tr><td style="border-top:1px solid ${COLORS.border};font-size:0;line-height:0;padding-top:24px;">&nbsp;</td></tr>
                <tr>
                  <td align="center" style="font-family:${FONT_STACK};font-size:12px;line-height:18px;color:${COLORS.muted};padding-bottom:8px;">Расчёт стоимости — в течение рабочего дня</td>
                </tr>
                <tr>
                  <td align="center" style="font-family:${FONT_STACK};font-size:12px;line-height:20px;color:${COLORS.muted};">
                    <a href="mailto:info@lofthall.ru" style="color:${COLORS.foreground};">info@lofthall.ru</a>
                    &nbsp;·&nbsp;
                    <a href="tel:+79661950225" style="color:${COLORS.foreground};">+7 (966) 195-02-25</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-family:${FONT_STACK};font-size:11px;line-height:16px;color:${COLORS.muted};padding-top:8px;">ул. Ленинская Слобода, 26с 15, Москва</td>
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
