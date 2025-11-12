import React from "react";
import { useUser } from "../../contexts/UserContext";
import MonthSelectorDropdown from "../ui/MonthSelectorDropdown";

export const HeaderComponent = () => {
  const { users, currentUser, setCurrentUser } = useUser();

  const handleChange = (e) => {
    const selected = users.find((u) => u.id === Number(e.target.value));
    setCurrentUser(selected);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand budgyLogo" href="/">
        bUDGY
      </a>

      <div className="ms-auto d-flex align-items-center">
        {/* Month selector dropdown */}
        <MonthSelectorDropdown />

        {/* User selector */}
        {users.length > 0 && (
          <select
            className="form-select ms-2"
            style={{ width: "180px" }}
            value={currentUser?.id || ""}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}
      </div>
    </nav>
  );
};
