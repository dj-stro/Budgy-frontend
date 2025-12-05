import React, { createContext, useContext, useState } from "react";

const SelectedDatesContext = createContext();

export const SelectedDatesProvider = ({ children }) => {
  const [selectedMonths, setSelectedMonths] = useState([]); // 0–11 indexes
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Toggle month selection on/off
  const toggleMonth = (monthIndex) => {
    setSelectedMonths((prev) =>
      prev.includes(monthIndex)
        ? prev.filter((m) => m !== monthIndex)
        : [...prev, monthIndex]
    );
  };

  const value = {
    selectedMonths,
    selectedYear,
    setSelectedYear,
    toggleMonth,
  };

  return (
    <SelectedDatesContext.Provider value={value}>
      {children}
    </SelectedDatesContext.Provider>
  );
};

export const useSelectedDates = () => useContext(SelectedDatesContext);
