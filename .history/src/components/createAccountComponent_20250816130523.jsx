import React, { useState } from "react";
import { createAccount } from "../services/accountService";
import { useNavigate } from "react-router-dom";
import useFormSubmit from "../hooks/useFormSubmit";

const CreateAccount = () => {
  const initialFormState = {
    name: "",
    description: "",
    balance: 0,
    budgetBalance: 0,
    budgetAvailable: 0,
    budgetAllowed: 0,
    user: {
      id: 1, // Send user as an object
    }, // hardcoded for now
  };

  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  const resetForm = () => setFormData(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { handleSubmit } = useFormSubmit({
    submitFunction: createAccount,
    onSuccess: () => {
      alert("Account Created!");
      resetForm();
      //Navigate to accounts list
      navigate("/accounts");
    },
    onError: () => alert("Failed to create account!"),
    resetForm,
  });

  return (
    <div className="container mt-4">
      <h2>Add New Account</h2>
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="form-group mb-2">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
          <label>Balance:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Budget Balance:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="budgetBalance"
            value={formData.budgetBalance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Budget Available:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="budgetAvailable"
            value={formData.budgetAvailable}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Budget Allowed:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="budgetAllowed"
            value={formData.budgetAllowed}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Save Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
