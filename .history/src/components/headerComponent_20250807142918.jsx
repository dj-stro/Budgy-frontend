import React from "react";

export const HeaderComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand budgyLogo" href="/">
        Budgy
      </a>
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
      <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/addTransaction">
              Add Txn
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/addCategory">
              Categories
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
