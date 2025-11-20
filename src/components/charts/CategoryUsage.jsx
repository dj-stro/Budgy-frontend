import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getTransactions } from "../../services/sqliteService";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryUsage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Category Usage",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const generateColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(
        `hsl(${Math.floor((i * 360) / num)}, 70%, 50%)`
      );
    }
    return colors;
  };

  useEffect(() => {
    const load = async () => {
      const txns = await getTransactions();

      // Aggregate total amounts per category
      const categoryMap = {};
      txns.forEach((t) => {
        const cat = t.categoryName || "Uncategorized";
        categoryMap[cat] = (categoryMap[cat] || 0) + Number(t.amount || 0);
      });

      const labels = Object.keys(categoryMap);
      const data = Object.values(categoryMap);
      const colors = generateColors(labels.length);

      setChartData({
        labels,
        datasets: [
          {
            label: "Category Usage",
            data,
            backgroundColor: colors,
          },
        ],
      });
    };

    load();
  }, []);

  return (
    <div>
      <h4>Category Usage</h4>
      {chartData.labels.length === 0 ? (
        <p>No data to display.</p>
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
};

export default CategoryUsage;
