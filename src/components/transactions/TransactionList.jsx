// src/components/transactions/TransactionList.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useSelectedDates } from "../../contexts/SelectedDatesContext";
import { getTransactions } from "../../services/sqliteService";
import CategoryUsage from "../charts/CategoryUsage";

const TransactionList = () => {
  const { currentUser } = useUser();
  const { selectedMonths, selectedYear } = useSelectedDates();
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const fetchTransactions = async () => {
      setTxLoading(true);
      try {
        const allTx = await getTransactions();
        const userTx = allTx.filter((tx) => tx.userId === currentUser.id);
        setTransactions(userTx);
      } catch (err) {
        console.error("Failed to load transactions", err);
      } finally {
        setTxLoading(false);
      }
    };
    fetchTransactions();
  }, [currentUser]);

  const filteredTransactions = transactions.filter((txn) => {
    const d = new Date(txn.date);
    if (d.getFullYear() !== selectedYear) return false;
    if (selectedMonths.length === 0) return true;
    return selectedMonths.includes(d.getMonth());
  });

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "—";
  const formatAmount = (amt) =>
    amt != null
      ? Number(amt).toLocaleString("en-ZA", {
          style: "currency",
          currency: "ZAR",
        })
      : "—";

  if (!currentUser) return <p>Please select a user.</p>;

  return (
    <div className="container-fluid main-content">
      <h2>
        Transactions for {currentUser.username} — {selectedYear}
      </h2>
      {txLoading ? (
        <p>Loading...</p>
      ) : filteredTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>From</th>
              <th>To</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{formatDate(tx.date)}</td>
                <td>{tx.categoryName}</td>
                <td>{tx.accountFromName}</td>
                <td>{tx.accountToName}</td>
                <td>{tx.description || "—"}</td>
                <td>{formatAmount(tx.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="w-100 mb-4" style={{ height: "400px" }}>
        <CategoryUsage />
      </div>
    </div>
  );
};

export default TransactionList;
