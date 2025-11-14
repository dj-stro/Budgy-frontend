import React from "react";
import { Link } from "react-router-dom";
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
      <Link className="navbar-brand budgyLogo" to="/">
        bUDGY
      </Link>

      {/* Mobile menu button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {/* LEFT + CENTER NAV LINKS */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/addTransaction">
              New Transaction
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/accounts">
              Accounts
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/addCategory">
              Categories
            </Link>
          </li>
        </ul>

        {/* RIGHT SIDE CONTROLS */}
        <div className="d-flex align-items-center">
          {/* Month selector */}
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
      </div>
    </nav>
  );
};
