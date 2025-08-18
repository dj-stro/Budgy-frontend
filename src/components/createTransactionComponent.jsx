import React, { useState, useEffect } from "react";
import { createTransaction } from "../services/transactionService";
import { getAllCategories } from "../services/categoryService";
import { getAllAccounts } from "../services/accountService";
import { useNavigate } from "react-router-dom";
import useFormSubmit from "../hooks/useFormSubmit";

const today = new Date().toISOString().split("T")[0];

const CreateTransaction = () => {
  const initialFormState = {
    description: "",
    amount: "",
    date: today,
    type: "EXPENSE",
    categoryId: "",
    accountFromId: "",
    accountToId: "",
    userId: 1, // hardcoded for now
  };

  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const resetForm = () => setFormData(initialFormState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, accs] = await Promise.all([
          getAllCategories(),
          getAllAccounts(),
        ]);
        setCategories(cats);
        setAccounts(accs);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { handleSubmit } = useFormSubmit({
    submitFunction: createTransaction,
    onSuccess: () => {
      alert("Transaction Created!");
      resetForm();
      // Navigate to homepage
      navigate("/");
    },
    onError: () => alert("Failed to create transaction!"),
    resetForm,
  });

  return (
    <div className="container mt-4">
      <h2>Add New Transaction</h2>
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="form-group mb-2">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Type:</label>
          <select
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>

        <div className="form-group mb-2">
          <label>Category:</label>
          <select
            className="form-control"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-2">
          <label>Account From:</label>
          <select
            className="form-control"
            name="accountFromId"
            value={formData.accountFromId}
            onChange={handleChange}
          >
            <option value="">Select Account From</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} - {acc.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-2">
          <label>Account To:</label>
          <select
            className="form-control"
            name="accountToId"
            value={formData.accountToId}
            onChange={handleChange}
          >
            <option value="">Select Account To</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} - {acc.description}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
