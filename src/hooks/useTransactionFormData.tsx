import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryService.js"; 
import { getAllAccounts } from "../services/accountService.js";
import type { Account, CategoryType, TransactionFormData } from "../types/models.js";

export const useTransactionFormData = (): TransactionFormData => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        setDataError(null);
        const [cats, accs] = await Promise.all([
          getAllCategories(),
          getAllAccounts(),
        ]);
        setCategories(cats);
        setAccounts(accs);
      } catch (err) {
        console.error("Error fetching form data:", err);
        setDataError("Failed to load categories or accounts. Please try again.");
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  return { categories, accounts, dataLoading, dataError };
};