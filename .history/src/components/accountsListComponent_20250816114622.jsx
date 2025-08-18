import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../services/accountService";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    getAllAccounts()
      .then((data) => {
        setAccounts(data || []);
      })
      .catch((err) => {
        console.error("Error fetching accounts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container-fluid main-content">Loading...</div>;
  }

  if(accounts.length === 0){
    return (
        <div className="container-fluid main-content">
            <h2>Accounts</h2>
            <p>No accounts found!</p>
        </div>
    );
  }

  return (
    <div className="container-fluid main-content">
        <h2>Accounts</h2>
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
