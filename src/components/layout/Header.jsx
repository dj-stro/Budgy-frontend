import React from "react";
import { useUser } from "../../contexts/UserContext";

export const HeaderComponent = () => {
  const { users, currentUser, setCurrentUser } = useUser();

  const handleChange = (e) => {
    const selected = users.find((u) => u.id === Number(e.target.value));
    setCurrentUser(selected);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand budgyLogo" href="/">
        bUDGY
      </a>
      {/* User selector */}
      <div className="ms-auto">
        {users.length > 0 && (
          <select
            className="form-select"
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
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNavAltMarkup"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <button type="button" className="btn btn-primary">
              <a className="nav-link" href="/addTransaction">
                Add Txn
              </a>
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-primary">
              <a className="nav-link" href="/addCategory">
                Categories
              </a>
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-primary">
              <a className="nav-link" href="/accounts">
                Accounts
              </a>
            </button>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};
