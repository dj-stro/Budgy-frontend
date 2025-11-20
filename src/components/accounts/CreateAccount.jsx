import React, { useState } from "react";
import { useAccounts } from "../../contexts/AccountContext";

const CreateAccount = () => {
  const { createAccount, accounts } = useAccounts();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    await createAccount(name, parseFloat(balance) || 0);
    setName("");
    setBalance("");
  };

  return (
    <div className="container mt-4">
      <h2>Add Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Account name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          value={balance}
          placeholder="Initial balance"
          onChange={(e) => setBalance(e.target.value)}
        />
        <button className="btn btn-primary mt-2" type="submit">
          Save Account
        </button>
      </form>

      <ul className="mt-3">
        {accounts.map((a) => (
          <li key={a.id}>
            {a.name} —{" "}
            {a.balance?.toLocaleString("en-ZA", {
              style: "currency",
              currency: "ZAR",
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateAccount;
