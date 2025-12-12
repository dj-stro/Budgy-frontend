import Txn from "./Txn.js";
import CategoryUsage from "../charts/CategoryUsage.js";
import type { TransactionModel } from "../../types/models.js";

interface TxnProps {
  filteredTransactions: TransactionModel[];
  txLoading: boolean;
}

function TxnList({ filteredTransactions, txLoading }: TxnProps) {
  return (
    <div className="row">
      <div className="col-md-6">
        <Txn
          filteredTransactions={filteredTransactions}
          txLoading={txLoading}
        />
      </div>

      <div className="col-md-6 d-flex flex-column align-items-center justify-content-start">
        <div className="w-100 mb-4" style={{ height: "400px" }}>
          <CategoryUsage />
        </div>
      </div>
    </div>
  );
}

export default TxnList;
