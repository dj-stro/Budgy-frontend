import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createAccount } from "../../services/accountService.js";
import { useNavigate } from "react-router-dom";
import useFormSubmit from "../../hooks/useFormSubmit.js";
import type { AccountFormState } from "../../types/models.js";

const CreateAccount = () => {
  const initialFormState: AccountFormState = {
    name: "",
    description: "",
    balance: 0,
    budgetBalance: 0,
    budgetAllowed: 0,
    user: {
      id: "", // Send user as an object
    }, // hardcoded for now
  };

  const [formData, setFormData] = useState<AccountFormState>(initialFormState);
  const navigate = useNavigate();

  const resetForm = () => setFormData(initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as AccountFormState)); // Cast the merged object back to the state type
  };

  const { handleSubmit } = useFormSubmit<AccountFormState>({
    submitFunction: createAccount as (data: AccountFormState) => Promise<any>,
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
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, formData)}>
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
