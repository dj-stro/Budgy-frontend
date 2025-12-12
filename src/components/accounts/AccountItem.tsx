import React from 'react';
import { formatAmount } from "../../utils/formatters.js";
import type { AccountItemProps } from '../../types/models.js';

const AccountItem: React.FC<AccountItemProps> = ({ acc }) => {
  const { id, name, description, balance, budgetBalance, budgetAllowed, user } = acc;
  
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{formatAmount(balance)}</td>
      <td>{formatAmount(budgetBalance)}</td>
      <td>{formatAmount(budgetAllowed)}</td>
      <td>{user?.name || user?.id || "—"}</td> 
    </tr>
  );

}

export default React.memo(AccountItem);