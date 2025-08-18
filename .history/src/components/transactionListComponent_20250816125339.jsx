import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../services/transactionService";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions()
      .then((data) => {
        setTransactions(data || []);
        console.log("DATA " + data);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const formatAmount = (amount) => {
    if (amount == null) return "—";
    return Number(amount).toLocaleString("en-ZA", {
      style: "currency",
      currency: "ZAR",
    });
  };

  if (loading) {
    return <div className="container-fluid main-content">Loading...</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="container-fluid main-content">
        <h2>Transactions</h2>
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid main-content">
      <h2>Transactions</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Category</th>
            <th>Account From</th>
            <th>Account To</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{formatDate(txn.date)}</td>
              <tc>{txn.category?.name || "—"}</tc>
              <td>{txn.accountFrom?.name || "—"}</td>
              <td>{txn.accountTo?.name || "—"}</td>
              <td>{txn.description || "—"}</td>
              <td>{formatAmount(txn.amount)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
