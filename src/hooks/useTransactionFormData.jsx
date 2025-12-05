import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryService"; 
import { getAllAccounts } from "../services/accountService";

export const useTransactionFormData = () => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

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