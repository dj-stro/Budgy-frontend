import React, { useEffect, useState } from 'react';
import { getAllTransactions } from '../services/transactionService';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions()
      .then(data => {
      console.log("Fetched data:", data); 
      setTransactions(data);
    })
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="container-fluid main-content">
      <h2>Transactions</h2>

      <table className='table table-striped table-bordered'>
        <thead> 
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Account</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map((txn) => (
                <tr key={txn.id}>
                    <td>{txn.id}</td>
                    <td>{txn.date}</td>
                    <td>{txn.accountFromId.name}</td>
                    <td>{txn.description}</td>
                    <td>{txn.amount}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
