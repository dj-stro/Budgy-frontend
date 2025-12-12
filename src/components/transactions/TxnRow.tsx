import React from 'react';
import { formatAmount } from '../../utils/formatters.js';
import { formatDate } from '../../utils/formatters.js';
import type { TransactionModel, CategoryType, Account } from '../../types/models.js';

interface TransactionViewModel extends TransactionModel {
    category?: CategoryType;
    accountFrom?: Account;
    accountTo?: Account;
}

interface TxnRowProps {
  txn: TransactionViewModel
}

interface NamedEntity {
  id: number | string;
  name: string;
}

function TxnRow({ txn }: TxnRowProps): React.ReactElement {
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