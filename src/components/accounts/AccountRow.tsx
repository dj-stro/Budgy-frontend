import AccountItem from "./AccountItem.js";
import React from "react";
import type { AccountRowProps } from "../../types/models.js";

const AccountRow: React.FC<AccountRowProps> = ({ accounts }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Balance</th>
          <th>Budget</th>
          <th>Budget Allowed</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <AccountItem key={account.id} acc={account} />
        ))}
      </tbody>
    </table>
  );
}

export default AccountRow;
