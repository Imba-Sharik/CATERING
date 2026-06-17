import "server-only";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getMailEnv() {
  const port = Number(process.env.SMTP_PORT ?? "587");
  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("Invalid environment variable: SMTP_PORT");
  }

  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureRaw === "true" || secureRaw === "1" || (secureRaw === undefined && port === 465);

  return {
    host: requireEnv("SMTP_HOST"),
    port,
    secure,
    user: requireEnv("SMTP_USER"),
    pass: requireEnv("SMTP_PASS"),
    from: requireEnv("MAIL_FROM"),
    to: requireEnv("MAIL_TO"),
  };
}
