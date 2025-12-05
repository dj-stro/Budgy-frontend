import AccountItem from "./AccountItem";

function AccountRow({ accounts }) {
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
        {accounts.map((acc) => (
          <AccountItem key={acc.id} acc={acc} />
        ))}
      </tbody>
    </table>
  );
}

export default AccountRow;
