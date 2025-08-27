import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionList from "./components/transactions/TransactionList";
import CreateTransaction from "./components/transactions/CreateTransaction";
import CreateCategory from "./components/categories/CreateCategory";
import AccountList from "./components/accounts/AccountsList";
import CreateAccount from "./components/accounts/CreateAccount";
import { UserProvider } from "./contexts/UserContext";
import { HeaderComponent } from "./components/layout/Header";
import { FooterComponent } from "./components/layout/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <HeaderComponent />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<TransactionList />} />
              <Route path="/addTransaction" element={<CreateTransaction />} />
              <Route path="/addCategory" element={<CreateCategory />} />
              <Route path="/accounts" element={<AccountList />} />
              <Route path="/addAccount" element={<CreateAccount />} />
              <Route path="*" element={<TransactionList />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
