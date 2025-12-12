import React from "react";
import type { TransactionModel } from "../types/models.js";
import type { SelectedDatesContextType } from "../contexts/SelectedDatesContext.js";

const useFilteredTransactions = (
  transactions: TransactionModel[],
  selectedYear: number,
  selectedMonths: number[]
): TransactionModel[] => {
  const filteredTransactions = React.useMemo(() => {
    // ... filtering logic from above ...
    return transactions.filter((txn) => {
      if (!txn.date) return false;
      const d = new Date(txn.date);
      const txnYear = d.getFullYear();
      const txnMonth = d.getMonth();

      if (txnYear !== selectedYear) return false;
      if (selectedMonths.length === 0) return true;
      return selectedMonths.includes(txnMonth);
    });
  }, [transactions, selectedYear, selectedMonths]);

  return filteredTransactions;
};

export default useFilteredTransactions;
