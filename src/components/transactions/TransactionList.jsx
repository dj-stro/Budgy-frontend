import React, { useEffect, useState } from "react";
import { getTransactionsByUserIds } from "../../services/transactionService";
import { useUser } from "../../contexts/UserContext";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);

  const { currentUser } = useUser();

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

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "—";

  const formatAmount = (amount) =>
    amount != null
      ? Number(amount).toLocaleString("en-ZA", {
          style: "currency",
          currency: "ZAR",
        })
      : "—";

  if (!currentUser) {
    return (
      <div className="container-fluid main-content">
        <h2>Transactions</h2>
        <p>Please select a user from the dropdown above.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid main-content">
      <h2>Transactions for {currentUser.username}</h2>

      {txLoading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
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
                <td>{txn.category?.name || "—"}</td>
                <td>{txn.accountFrom?.name || "—"}</td>
                <td>{txn.accountTo?.name || "—"}</td>
                <td>{txn.description || "—"}</td>
                <td>{formatAmount(txn.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;
