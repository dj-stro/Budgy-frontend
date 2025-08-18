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
    userId: 1, // hardcoded for now
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
      // Navigate to homepage
      //   navigate("/");
    },
    onError: () => alert("Failed to create transaction!"),
    resetForm,
  });
};
