import React, { createContext, useState, useContext, useEffect } from "react";
import { getAccounts, addAccount } from "../services/sqliteService";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      const dbAccounts = await getAccounts();
      setAccounts(dbAccounts);
    };
    loadAccounts();
  }, []);

  const createAccount = async (account) => {
    const newAccount = await addAccount(account);
    setAccounts((prev) => [...prev, newAccount]);
  };

  return (
    <AccountContext.Provider value={{ accounts, createAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => useContext(AccountContext);
