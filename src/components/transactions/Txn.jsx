import React from "react";
import TxnRow from "./TxnRow";

function Txn({ filteredTransactions, txLoading }) {
  return txLoading ? (
    <p>Loading transactions...</p>
  ) : filteredTransactions.length === 0 ? (
    <p>No transactions found.</p>
  ) : (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Category</th>
          <th>Account From</th>
          <th>Account To</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((txn) => (
          <TxnRow key={txn.id} txn={txn} />
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(Txn);
