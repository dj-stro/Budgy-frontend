import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getTransactionsByUserIds } from "../../services/transactionService";
import { useUser } from "../../contexts/UserContext";
import { prepareCategoryData } from "../../utils/dataTransform";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a83279", "#82ca9d"];

const CategoryUsage = () => {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useUser();

  // Fetch transactions for selected user
  useEffect(() => {
    if (!currentUser) return;

    const fetchTransactions = async () => {
      try {
        const data = await getTransactionsByUserIds([currentUser.id]);
        setTransactions(data || []);
      } catch (err) {
        console.error("Error fetching user transactions:", err);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  // Transform data for chart
  const chartData = prepareCategoryData(transactions);

  // Custom label renderer
  const renderCustomLabel = ({ name, value, percent }) => {
    return `${name}: ${value} (${(percent * 100).toFixed(1)}%)`;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h5 className="text-center">Usage</h5>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label={renderCustomLabel} 
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryUsage;
