import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../../services/accountService";
import AccountRow from "./AccountRow";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const data = await getAllAccounts();
        setAccounts(data || []);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
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

  return (
    <div className="container-fluid main-content">
    <h2>Accounts</h2> 
      <AccountRow accounts={accounts} />
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/addAccount" className="btn btn-primary">
                Add New Account
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AccountList;
