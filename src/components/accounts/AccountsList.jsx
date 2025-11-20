import React, { useEffect, useState } from "react";
import { getAccounts } from "../../services/sqliteService";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const load = async () => {
      setAccounts(await getAccounts());
    };
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <ul className="list-group">
          {accounts.map((a) => (
            <li key={a.id} className="list-group-item">
              {a.name} ({a.type}) — {a.balance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountList;
