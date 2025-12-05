import React from 'react';
import { formatAmount } from '../../utils/formatters';
import { formatDate } from '../../utils/formatters';

function TxnRow({ txn }) {
  // Use formatters
  return (
    <tr key={txn.id}>
      <td>{txn.id}</td>
      <td>{formatDate(txn.date)}</td>
      <td>{txn.category?.name || "—"}</td>
      <td>{txn.accountFrom?.name || "—"}</td>
      <td>{txn.accountTo?.name || "—"}</td>
      <td>{txn.description || "—"}</td>
      <td>{formatAmount(txn.amount)}</td>
    </tr>
  );
}

export default React.memo(TxnRow); // Memoize the row