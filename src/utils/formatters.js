export const formatDate = (dateString) =>
  dateString ? new Date(dateString).toISOString().split("T")[0] : "—";

export const formatAmount = (amount) =>
  amount != null
    ? Number(amount).toLocaleString("en-ZA", {
        style: "currency",
        currency: "ZAR",
      })
    : "—";

    