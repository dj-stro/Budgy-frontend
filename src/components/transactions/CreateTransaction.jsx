import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTransaction } from "../../services/transactionService";
import { getAllCategories } from "../../services/categoryService";
import { getAllAccounts } from "../../services/accountService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const today = new Date().toISOString().split("T")[0];

// --- Validation Schema (fixed .when() functions) ---
const transactionSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  date: yup.date().required("Date is required"),
  type: yup
    .string()
    .oneOf(["INCOME", "EXPENSE", "TRANSFER"])
    .required("Transaction type is required"),
  categoryId: yup.string().required("Category is required"),
  accountFromId: yup.string().when("type", {
    is: (val) => val === "EXPENSE" || val === "TRANSFER",
    then: (schema) => schema.required("Account From is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountToId: yup.string().when("type", {
    is: (val) => val === "INCOME" || val === "TRANSFER",
    then: (schema) => schema.required("Account To is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const CreateTransaction = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: "",
      date: today,
      type: "EXPENSE",
      categoryId: "",
      accountFromId: "",
      accountToId: "",
      userId: currentUser?.id || "",
    },
  });

  const transactionType = watch("type"); // dynamically watch transaction type

  // Set userId when currentUser is available
  useEffect(() => {
    if (currentUser) setValue("userId", currentUser.id);
  }, [currentUser, setValue]);

  // Fetch categories and accounts
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

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      await createTransaction(data);
      alert("Transaction Created!");
      reset();
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Transaction</h2>

      {serverError && <div className="alert alert-danger">{serverError}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Type */}
        <div className="form-group mb-2">
          <label>Type:</label>
          <select className="form-control" {...register("type")}>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
            <option value="TRANSFER">Transfer</option>
          </select>
          {errors.type && (
            <small className="text-danger">{errors.type.message}</small>
          )}
        </div>

        {/* Description */}
        <div className="form-group mb-2">
          <label>Description:</label>
          <input className="form-control" {...register("description")} />
          {errors.description && (
            <small className="text-danger">{errors.description.message}</small>
          )}
        </div>

        {/* Amount */}
        <div className="form-group mb-2">
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            {...register("amount")}
          />
          {errors.amount && (
            <small className="text-danger">{errors.amount.message}</small>
          )}
        </div>

        {/* Date */}
        <div className="form-group mb-2">
          <label>Date:</label>
          <input type="date" className="form-control" {...register("date")} />
          {errors.date && (
            <small className="text-danger">{errors.date.message}</small>
          )}
        </div>

        {/* Category */}
        <div className="form-group mb-2">
          <label>Category:</label>
          <select className="form-control" {...register("categoryId")}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <small className="text-danger">{errors.categoryId.message}</small>
          )}
        </div>

        {/* Account From */}
        <div className="form-group mb-2">
          <label>Account From:</label>
          <select
            className="form-control"
            {...register("accountFromId")}
            disabled={transactionType === "INCOME"}
          >
            <option value="">Select Account From</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} - {acc.description}
              </option>
            ))}
          </select>
          {errors.accountFromId && (
            <small className="text-danger">
              {errors.accountFromId.message}
            </small>
          )}
        </div>

        {/* Account To */}
        <div className="form-group mb-2">
          <label>Account To:</label>
          <select
            className="form-control"
            {...register("accountToId")}
            disabled={transactionType === "EXPENSE"}
          >
            <option value="">Select Account To</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} - {acc.description}
              </option>
            ))}
          </select>
          {errors.accountToId && (
            <small className="text-danger">{errors.accountToId.message}</small>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Transaction"}
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
