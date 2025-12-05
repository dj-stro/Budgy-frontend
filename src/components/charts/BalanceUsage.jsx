import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAccountsByUserId } from "../../services/accountService";
import { useUser } from "../../contexts/UserContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const BalanceUsage = () => {
  const [accounts, setAccounts] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    if (!currentUser) return;

    getAccountsByUserId(currentUser.id)
      .then((data) => {
        setAccounts(data || []);
      })
      .catch((err) => {
        console.error("Error fetching accounts:", err);
      });
  }, [currentUser]);

  return (
    <div className="d-flex flex-column w-100">
      {accounts.map((acc, index) => {
        const chartData = [
          { name: "Budget Allowed", value: acc.budgetAllowed },
          { name: "Budget Balance", value: acc.budgetBalance },
        ];

        return (
          <div key={acc.id || index} className="mb-4" style={{ width: "100%", height: 300, paddingTop: 40 }}>
            <h5 className="text-center">{acc.name}</h5>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default BalanceUsage;
