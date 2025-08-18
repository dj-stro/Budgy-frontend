import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../services/accountService";

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        getAllAccounts()
          .then((data) => {
            setAccounts(data || []);
          })
          .catch((err) => {
            console.error("Error fetching accounts:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

}