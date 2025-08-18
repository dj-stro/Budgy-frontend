import React, { useEffect, useState } from "react";
import { getTransactionsByUserIds } from "../services/transactionService";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch transactions for selected user
  useEffect(() => {
    if (!currentUserId) return;
    const fetchTransactions = async () => {
      setTxLoading(true);
      try {
        const data = await getTransactionsByUserIds([currentUserId]);
        setTransactions(data || []);
      } catch (err) {
        console.error("Error fetching user transactions:", err);
      } finally {
        setTxLoading(false);
      }
    };
    fetchTransactions();
  }, [currentUserId]);

  const handleChange = (event) => {
    setCurrentUserId(event.target.value);
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "—";

  const formatAmount = (amount) =>
    amount != null
      ? Number(amount).toLocaleString("en-ZA", {
          style: "currency",
          currency: "ZAR",
        })
      : "—";

  return (
    <div className="container-fluid main-content">
      <h2>Transactions</h2>

      <div className="container-fluid mb-3">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <select value={currentUserId} onChange={handleChange}>
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}
      </div>

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
