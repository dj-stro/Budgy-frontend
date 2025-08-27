import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionList from "./components/transactionListComponent";
import CreateTransaction from "./components/createTransactionComponent";
import CreateCategory from "./components/createCategoryComponent";
import AccountList from "./components/accountsListComponent";
import CreateAccount from "./components/createAccountComponent";
import { UserProvider } from "./contexts/UserContext";
import { HeaderComponent } from "./components/headerComponent";
import { FooterComponent } from "./components/footerComponent";
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
