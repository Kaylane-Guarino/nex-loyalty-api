export function normalizeCpf(cpf: unknown): string {
  return String(cpf || "").replace(/\D/g, "");
}

export function parseBrazilianDate(date: unknown): string {
  if (typeof date === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    excelEpoch.setUTCDate(excelEpoch.getUTCDate() + date);

    return excelEpoch.toISOString().split("T")[0];
  }

  const dateAsString = String(date || "").trim();

  if (dateAsString.includes("-")) {
    const [day, month, year] = dateAsString.split("-");
    return `${year}-${month}-${day}`;
  }

  if (dateAsString.includes("/")) {
    const [day, month, year] = dateAsString.split("/");
    return `${year}-${month}-${day}`;
  }

  throw new Error(`Invalid transaction date: ${dateAsString}`);
}

export function parsePoints(points: unknown): number {
  return Number(String(points || "").replace(/\D/g, ""));
}

export function parseBrazilianMoney(value: unknown): number {
  return Number(
    String(value || "0")
      .replace(/\./g, "")
      .replace(",", ".")
  );
}

export function parseTransactionStatus(
  status: unknown
): "APPROVED" | "REJECTED" | "PENDING" {
  const normalizedStatus = String(status || "")
    .trim()
    .toLowerCase();

  if (normalizedStatus === "aprovado") return "APPROVED";
  if (normalizedStatus === "reprovado") return "REJECTED";

  return "PENDING";
}