// Связь между секцией «Форматы» и «Формой заявки»: клик по карточке формата
// проматывает к форме и подставляет выбранный формат.
export const FORMAT_EVENT = "format:select";

export function requestFormat(format: string) {
  window.dispatchEvent(new CustomEvent<string>(FORMAT_EVENT, { detail: format }));
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
}
