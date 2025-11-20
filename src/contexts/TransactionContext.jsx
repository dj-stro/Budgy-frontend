import React, { createContext, useState, useContext, useEffect } from "react";
import { getTransactionsByUserId, addTransaction } from "../db/sqliteService";
import { useUser } from "./UserContext";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { currentUser } = useUser();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const loadTransactions = async () => {
      const txns = await getTransactionsByUserId(currentUser.id);
      setTransactions(txns);
    };
    loadTransactions();
  }, [currentUser]);

  const createTransaction = async (txn) => {
    const newTxn = await addTransaction(txn);
    setTransactions((prev) => [...prev, newTxn]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
