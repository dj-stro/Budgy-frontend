import React, { useEffect, useState } from "react";
import { getTransactionsByUserIds } from "../../services/transactionService";
import { useUser } from "../../contexts/UserContext";
import { useSelectedDates } from "../../contexts/SelectedDatesContext";
import CategoryUsage from "../charts/CategoryUsage";

const TransactionList = () => {
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
  const filteredTransactions = transactions.filter((txn) => {
    if (!txn.date) return false;
    const d = new Date(txn.date);
    const txnYear = d.getFullYear();
    const txnMonth = d.getMonth();

    if (txnYear !== selectedYear) return false;
    if (selectedMonths.length === 0) return true; // all months for that year
    return selectedMonths.includes(txnMonth);
  });

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

        <div className="row">
          <div className="col-md-6">
            {txLoading ? (
              <p>Loading transactions...</p>
            ) : filteredTransactions.length === 0 ? (
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
                  {filteredTransactions.map((txn) => (
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

          <div className="col-md-6 d-flex flex-column align-items-center justify-content-start">
            <div className="w-100 mb-4" style={{ height: "400px" }}>
              <CategoryUsage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
