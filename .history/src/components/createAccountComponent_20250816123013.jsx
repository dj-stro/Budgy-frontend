import React, { useState, useEffect } from "react";
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
        userId: 1 // hardcoded for now
    };

    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();

    const resetForm = () = setFormData(initialFormState);
};