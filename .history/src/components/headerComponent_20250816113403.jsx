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
        </ul>
      </div>
    </nav>
  );
};
