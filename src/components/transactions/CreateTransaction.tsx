import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTransaction } from "../../services/transactionService.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext.js";
import { useTransactionFormData } from "../../hooks/useTransactionFormData.js";
import type { Account, CategoryType, TransactionCreationPayload, TransactionFormInputs, User } from "../../types/models.js"

const today = new Date().toISOString().split("T")[0];

// --- Validation Schema with Transfer Check ---
const transactionSchema: yup.ObjectSchema<TransactionFormInputs> = yup.object().shape({
  description: yup.string().required("Description is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  date: yup.string().required("Date is required"),
  type: yup
    .string()
    .oneOf(["INCOME", "EXPENSE", "TRANSFER"])
    .required("Transaction type is required"),

  // Category is only required for INCOME and EXPENSE, NOT TRANSFER (if transfer is category-less)
  // Assuming Category is required for all, including TRANSFER
  categoryId: yup.string().required("Category is required"),
  userId: yup.string().required("User ID is required for form submission logic"),
  accountFromId: yup.string().when("type", {
    is: (val: any) => val === "EXPENSE" || val === "TRANSFER",
    then: (schema) => schema.required("Account From is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountToId: yup.string().when("type", {
    is: (val: any) => val === "INCOME" || val === "TRANSFER",
    then: (schema) => schema.required("Account To is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Inter-field validation for Transfer
  transferCheck: yup.string().when("type", {
    is: "TRANSFER",
    then: (schema) =>
      schema.test(
        "notSameAccount",
        "Source and Destination accounts must be different", // This message is tied to the transferCheck field error
        function (_) {
          const { accountFromId, accountToId } = this.parent;
          return accountFromId !== accountToId;
        }
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const CreateTransaction: React.FC = () => {
  const { currentUser } = useUser() as { currentUser: User | null};
  const navigate = useNavigate();

  // 1. Use Custom Hook for Data Fetching
  const { categories, accounts, dataLoading, dataError } =
    useTransactionFormData() as {
      categories: CategoryType[],
      accounts: Account[],
      dataLoading: boolean,
      dataError: string
    };

  const [loading, setLoading] = useState(false); // Submission loading
  const [serverError, setServerError] = useState("");

  const {
  register,
  handleSubmit,
  setValue,
  watch,
  reset,
  formState: { errors },
} = useForm<TransactionFormInputs>({
  resolver: yupResolver(transactionSchema) as any,
  defaultValues: {
    // Required fields are set to a value that matches the required type
    description: "",
    amount: "",
    date: today, 
    type: "EXPENSE",
    categoryId: "",
    userId: currentUser?.id || "",
    accountFromId: undefined,
    accountToId: undefined,
    transferCheck: undefined,
  } as TransactionFormInputs, 
});

  const transactionType = watch("type"); // dynamically watch transaction type

  // Set userId when currentUser is available
  useEffect(() => {
    if (currentUser) setValue("userId", currentUser.id);
  }, [currentUser, setValue]);

  // Submit handler
  const onSubmit: SubmitHandler<TransactionFormInputs> = async (data) => {
    setLoading(true);
    setServerError("");

    // Cleanup for API Payload
    let transactionData = { ...data };

    // Remove fields not relevant to the transaction type
    if (transactionData.type === "INCOME") {
      delete transactionData.accountFromId;
    } else if (transactionData.type === "EXPENSE") {
      delete transactionData.accountToId;
    }
    // transferCheck is only for front-end validation, remove it before sending
    delete transactionData.transferCheck;

    try {
      await createTransaction(transactionData as TransactionCreationPayload);
      // replace with a Toast notification library
      alert("Transaction Created successfully!");
      reset();
      navigate("/");
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Data Loading and Errors (UX Improvement)
  if (dataLoading) {
    return <div className="container mt-4">Loading form data...</div>;
  }

  if (dataError) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{dataError}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Add New Transaction</h2>

      {serverError && <div className="alert alert-danger">{serverError}</div>}
      {/* Display the inter-field error if it exists */}
      {errors.transferCheck && (
        <div className="alert alert-warning">
          {errors.transferCheck.message}
        </div>
      )}

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

        {/* 4. Account From (Conditionally Rendered) */}
        {(transactionType === "EXPENSE" || transactionType === "TRANSFER") && (
          <div className="form-group mb-2">
            <label>Account From:</label>
            <select className="form-control" {...register("accountFromId")}>
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
        )}

        {/* 4. Account To (Conditionally Rendered) */}
        {(transactionType === "INCOME" || transactionType === "TRANSFER") && (
          <div className="form-group mb-2">
            <label>Account To:</label>
            <select className="form-control" {...register("accountToId")}>
              <option value="">Select Account To</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} - {acc.description}
                </option>
              ))}
            </select>
            {errors.accountToId && (
              <small className="text-danger">
                {errors.accountToId.message}
              </small>
            )}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={loading} // Only submission loading matters here
        >
          {loading ? "Saving..." : "Save Transaction"}
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
