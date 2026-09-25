/**
 * Formatea un número como moneda colombiana (COP).
 * Ejemplo: 20000000 -> "$ 20.000.000"
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "$ 0";
  }
  const formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(amount));

  return formatted.replace("COP", "$").trim();
}

/**
 * Formatea un porcentaje.
 * Ejemplo: 12.5 -> "12,50%"
 */
export function formatPercent(rate: number): string {
  if (isNaN(rate) || rate === null || rate === undefined) {
    return "0,00%";
  }
  return `${rate.toFixed(2).replace(".", ",")}% EA`;
}

/**
 * Limpia una cadena para convertirla a número
 */
export function parseNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const cleaned = value.replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
