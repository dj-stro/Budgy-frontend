export const formatDate = (
  dateString: string | undefined | null
): string =>
  // The '!' tells TypeScript: "If we reach this code, dateString is NOT null or undefined."
  dateString
    ? new Date(dateString!).toISOString().split("T")[0]! 
    : "—";

export const formatAmount = (amount: number | null | undefined): string =>
  amount != null
    ? Number(amount).toLocaleString("en-ZA", {
      style: "currency",
      currency: "ZAR",
    })
    : "—";

