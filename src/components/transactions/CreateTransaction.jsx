import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useAccounts } from "../../contexts/AccountContext";
import { useCategories } from "../../contexts/CategoryContext";
import { addTransaction } from "../../services/sqliteService";

const CreateTransaction = () => {
  const { currentUser } = useUser();
  const { accounts } = useAccounts();
  const { categories } = useCategories();

  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [accountFromId, setAccountFromId] = useState("");
  const [accountToId, setAccountToId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !categoryId || !accountFromId || !amount) return;

    await addTransaction({
      userId: currentUser.id,
      date,
      categoryId: parseInt(categoryId),
      accountFromId: parseInt(accountFromId),
      accountToId: accountToId ? parseInt(accountToId) : null,
      amount: parseFloat(amount),
      description,
    });

    setDate("");
    setCategoryId("");
    setAccountFromId("");
    setAccountToId("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="container mt-4">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.type})
            </option>
          ))}
        </select>
        <select
          value={accountFromId}
          onChange={(e) => setAccountFromId(e.target.value)}
          required
        >
          <option value="">From Account</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <select
          value={accountToId}
          onChange={(e) => setAccountToId(e.target.value)}
        >
          <option value="">To Account (optional)</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className="btn btn-primary mt-2" type="submit">
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
