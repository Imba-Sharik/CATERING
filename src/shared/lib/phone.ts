/**
 * РФ-телефон: маска +7 (___) ___-__-__.
 * Работаем по Москве/МО — формат жёстко российский (11 цифр, код страны 7).
 */

/** Только цифры из строки, код страны нормализован к 7 (8→7, ввод с 9xx→7 9xx). */
function normalizeDigits(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits[0] === "8") digits = "7" + digits.slice(1);
  else if (digits[0] === "9") digits = "7" + digits;
  else if (digits[0] !== "7") digits = "7" + digits;
  return digits.slice(0, 11); // 7 + 10 национальных
}

/** Форматирует ввод в маску +7 (495) 123-45-67 по мере набора. */
export function formatPhone(input: string): string {
  const digits = normalizeDigits(input);
  if (!digits) return "";

  const a = digits.slice(1, 4); // код
  const b = digits.slice(4, 7);
  const c = digits.slice(7, 9);
  const d = digits.slice(9, 11);

  let out = "+7";
  if (a) out += ` (${a}`;
  if (a.length === 3) out += ")";
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (d) out += `-${d}`;
  return out;
}

/** true, если номер полный: ровно 11 цифр и код страны 7. */
export function isValidPhone(input: string): boolean {
  const digits = normalizeDigits(input);
  return digits.length === 11 && digits[0] === "7";
}
