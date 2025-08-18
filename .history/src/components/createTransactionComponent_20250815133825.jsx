import React, { useState, useEffect } from "react";
import { createTransaction } from "../services/transactionService";
import { getAllCategories } from "../services/categoryService";
import { getAllAccounts } from "../services/accountService";
import useFormSubmit from "../hooks/useFormSubmit";

const CreateTransaction = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    type: "EXPENSE",
    category: { id: "" },
    accountFrom: { id: "" },
    accountTo: { id: "" },
    user: { id: 1 }, // hardcoded for now, adjust if needed
  });

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const resetForm = () => setFormData({ name: "", type: "EXPENSE" });

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  useEffect(() => {
    getAllAccounts()
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Error fetching accounts", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   createTransaction(formData)
  //     .then(() => {
  //       alert("Transaction created!");
  //       // Optionally reset form or redirect
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("Failed to create transaction");
  //     });
  // };

  const { handleSubmit } = useFormSubmit({
    submitFunction: createTransaction,
    onSuccess: () => alert("Transaction Created!"),
    onError: () => alert("Failed to create transaction!."),
    resetForm,
  });

  return (
    <div className="container mt-4">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
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
            value={formData}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            name="accountFrom"
            value={formData.accountFrom}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label>Account To:</label>
          <input
            type="text"
            className="form-control"
            name="accountTo"
            value={formData.accountTo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
