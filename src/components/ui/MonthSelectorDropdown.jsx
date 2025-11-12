import React, { useState } from "react";
import { useSelectedDates } from "../../contexts/SelectedDatesContext";

const MonthSelectorDropdown = () => {
  const { selectedMonths, selectedYear, setSelectedYear, toggleMonth } =
    useSelectedDates();
  const [open, setOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toggleDropdown = () => setOpen((prev) => !prev);

  const selectedLabels =
    selectedMonths.length === 0
      ? "All Months"
      : selectedMonths
          .sort((a, b) => a - b)
          .map((m) => months[m].slice(0, 3))
          .join(", ");

  return (
    <div className="position-relative d-inline-block me-3">
      <button
        className="btn btn-outline-light dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        {selectedYear} – {selectedLabels}
      </button>

      {open && (
        <div
          className="dropdown-menu show p-3 shadow"
          style={{ minWidth: "220px", zIndex: 1000 }}
        >
          {/* Year header */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSelectedYear(selectedYear - 1)}
            >
              ◀
            </button>
            <strong>{selectedYear}</strong>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSelectedYear(selectedYear + 1)}
            >
              ▶
            </button>
          </div>

          {/* Month checkboxes */}
          <div className="d-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {months.map((month, idx) => (
              <label key={month} className="form-check-label mb-1">
                <input
                  type="checkbox"
                  className="form-check-input me-1"
                  checked={selectedMonths.includes(idx)}
                  onChange={() => toggleMonth(idx)}
                />
                {month.slice(0, 3)}
              </label>
            ))}
          </div>

          {/* Optional: clear selection */}
          <button
            className="btn btn-sm btn-outline-danger mt-3 w-100"
            onClick={() => {
              // clear all months
              months.forEach((_, i) => {
                if (selectedMonths.includes(i)) toggleMonth(i);
              });
            }}
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthSelectorDropdown;
