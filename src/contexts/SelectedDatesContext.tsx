import React, { createContext, useContext, useState } from "react";

export interface SelectedDatesContextType {
  
  selectedMonths: number[]; 
  selectedYear: number; 
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  toggleMonth: (monthIndex: number) => void;
}

interface SelectedDatesProviderProps {
  children: React.ReactNode;
}

const defaultContextValue: SelectedDatesContextType = {
  selectedMonths: [],
  selectedYear: new Date().getFullYear(),
  setSelectedYear: () => {}, // No-op function for default
  toggleMonth: () => {},     // No-op function for default
};

const SelectedDatesContext = createContext<SelectedDatesContextType>(defaultContextValue);

export const SelectedDatesProvider: React.FC<SelectedDatesProviderProps> = ({ children }) => {
  
  // State initialization with explicit types
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]); // number[]
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // number

  // Toggle month selection on/off
  const toggleMonth = (monthIndex: number): void => {
    setSelectedMonths((prev) =>
      prev.includes(monthIndex)
        ? prev.filter((m) => m !== monthIndex)
        : [...prev, monthIndex]
    );
  };

  // The value object is correctly inferred as SelectedDatesContextType
  const value: SelectedDatesContextType = {
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

export const useSelectedDates = (): SelectedDatesContextType => {
  const context = useContext(SelectedDatesContext);  
  return context;
};