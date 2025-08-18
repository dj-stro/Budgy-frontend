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

  if (accounts.length === 0) {
    return (
      <div className="container-fluid main-content">
        <h2>Accounts</h2>
        <p>No accounts found!</p>
      </div>
    );
  }

  const formatAmount = (amount) => {
    if (amount == null) return "—";
    return Number(amount).toLocaleString("en-ZA", {
      style: "currency",
      currency: "ZAR",
    });
  };

  return (
    <div className="container-fluid main-content">
      <h2>Accounts</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Balance</th>
            <th>Budget</th>
            <th>Budget Avail.</th>
            <th>Budget Allowed</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.name}</td>
              <tc>{acc.description}</tc>
              <td>{formatAmount(acc.budget)}</td>
              <td>{formatAmount(acc.budgetBalance)}</td>
              <td>{formatAmount(acc.budgetAvailable)}</td>
              <td>{formatAmount(acc.budgetAllowed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul className="navbar-nav">
          <li className="nav-item">
            <button type="button" className="btn btn-primary">
              <a className="nav-link" href="/addAccount">
                Add New Account
              </a>
            </button>
          </li>
        </ul>
        </nav>
      </div>
    </div>
  );
};

export default AccountList;
