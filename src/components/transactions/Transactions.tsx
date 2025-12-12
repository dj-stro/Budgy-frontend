import React, { useEffect, useState } from "react";
import { getTransactionsByUserIds } from "../../services/transactionService.js";
import { useUser } from "../../contexts/UserContext.js";
import { useSelectedDates } from "../../contexts/SelectedDatesContext.js";
import TxnList from "./TxnList.js";
import useFilteredTransactions from "../../hooks/useFilteredTransactions.js"; 
import type { TransactionModel, TransactionProps, User } from "../../types/models.js";
import type { SelectedDatesContextType } from "../../contexts/SelectedDatesContext.js";

type FilteredTransactionsHook = (
    transactions: TransactionModel[],
    selectedYear: number,
    selectedMonths: number[]
) => TransactionModel[];

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const { currentUser } = useUser() as { currentUser: User | null };
  const { selectedMonths, selectedYear } = useSelectedDates() as SelectedDatesContextType;

  // Fetch transactions for selected user
  useEffect(() => {
    if (!currentUser) return;

    const fetchTransactions = async () => {
      setTxLoading(true);
      try {
        const data: TransactionModel[] = await getTransactionsByUserIds([currentUser.id]);
        setTransactions(data || []);
      } catch (err) {
        console.error("Error fetching user transactions:", err);
      } finally {
        setTxLoading(false);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  const filteredTransactions: TransactionModel[] = useFilteredTransactions(transactions, selectedYear, selectedMonths);
  
  if (!currentUser) {
    return (
      <div className="container-fluid main-content">
        <h2>Transactions</h2>
        <p>Please select a user from the dropdown above.</p>
      </div>
    );
  }

  const username = (currentUser as User).name || "Selected User";

  return (
    <div
      className="container-fluid main-content"
      style={{
        minHeight: "100vh", // full viewport height
        backgroundColor: "#fff", // white background
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <div className="container-fluid main-content">
        <h2>
          Transactions for {username} — {selectedYear}
        </h2>
        <TxnList
          filteredTransactions={filteredTransactions}
          txLoading={txLoading}
        />
      </div>
    </div>
  );
};

export default Transactions;
