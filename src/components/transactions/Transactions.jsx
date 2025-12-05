import React, { useEffect, useState } from "react";
import { getTransactionsByUserIds } from "../../services/transactionService";
import { useUser } from "../../contexts/UserContext";
import { useSelectedDates } from "../../contexts/SelectedDatesContext";
import TxnList from "./TxnList";
import useFilteredTransactions from "../../hooks/useFilteredTransactions"; 

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  const { currentUser } = useUser();
  const { selectedMonths, selectedYear } = useSelectedDates();

  // Fetch transactions for selected user
  useEffect(() => {
    if (!currentUser) return;

    const fetchTransactions = async () => {
      setTxLoading(true);
      try {
        const data = await getTransactionsByUserIds([currentUser.id]);
        setTransactions(data || []);
      } catch (err) {
        console.error("Error fetching user transactions:", err);
      } finally {
        setTxLoading(false);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  // Filter by year + selected months
  const filteredTransactions = useFilteredTransactions(transactions, selectedYear, selectedMonths);
  
  if (!currentUser) {
    return (
      <div className="container-fluid main-content">
        <h2>Transactions</h2>
        <p>Please select a user from the dropdown above.</p>
      </div>
    );
  }

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
          Transactions for {currentUser.username} — {selectedYear}
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
