import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";
import { getTransactionsByUserIds } from "../../services/transactionService.js";
import { useUser } from "../../contexts/UserContext.js";
import type { User, TransactionModel } from "../../types/models.js";
import { prepareCategoryData, type CategoryChartEntry } from "../../utils/dataTransform.js";

// Define the color palette (good practice to keep outside component render)
const COLORS: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a83279",
  "#82ca9d",
];


const CategoryUsage: React.FC = () => {
  // Use a typed state for transactions
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  // Assuming useUser returns an object containing the User model or null
  const { currentUser } = useUser() as { currentUser: User | null };

  // 1. Fetch transactions (Improved useEffect)
  useEffect(() => {
    // Check if currentUser exists and has an ID
    if (!currentUser?.id) {
      setTransactions([]); // Clear transactions if user logs out or is null
      return;
    }

    const fetchTransactions = async (userId: string) => {
      try {
        // Explicitly type the expected return value from the service function
        const data: TransactionModel[] = await getTransactionsByUserIds([
          userId,
        ]);
        setTransactions(data || []);
      } catch (err) {
        console.error("Error fetching user transactions:", err);
        // Optionally set a state to display an error to the user
      }
    };

    fetchTransactions(currentUser.id);

    // Dependency array now correctly includes only what is needed for the effect
  }, [currentUser?.id]); // Depend only on the ID to avoid re-running if other user properties change

  // 2. Transform data for chart (Cached with useMemo)
  // Use useMemo to ensure data transformation only runs when transactions change
  const chartData: CategoryChartEntry[] = useMemo(() => {
    // The utility function should handle the transformation and filtering
    return prepareCategoryData(transactions);
  }, [transactions]); // Recalculate only when transactions change

  // 3. Custom label renderer (Cached with useCallback)
  // Recharts provides properties like name, value, percent, etc.
  // We use PieLabelRenderProps from recharts for type safety.
  const renderCustomLabel = useCallback(
    ({ name, value, percent }: PieLabelRenderProps): string => {
      if (name === undefined || value === undefined || percent === undefined)
        return "";
      const formattedPercent = ((percent as number) * 100).toFixed(1);
      // Use .toLocaleString() for better readability of large numbers
      const formattedValue = (value as number).toLocaleString();
      return `${name}: ${formattedValue} (${formattedPercent}%)`;
    },
    []
  );

  // --- Render Logic ---

  if (!currentUser) {
    return <p className="text-center">Please log in to view category usage.</p>;
  }

  if (chartData.length === 0) {
    return (
      <div style={{ width: "100%", height: 400 }}>
        <h5 className="text-center">Usage</h5>
        <p className="text-center">
          No transaction data available for charting.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h5 className="text-center">Category Usage</h5>
      {/* Example of what a Pie Chart based on transaction categories represents */}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value" // Must match the property name in CategoryChartEntry
            label={renderCustomLabel}
            labelLine={false} // Often set to false when using custom labels
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`} // Use name or ID for a more stable key
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* Tooltip and Legend provide interactive context */}
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryUsage;
