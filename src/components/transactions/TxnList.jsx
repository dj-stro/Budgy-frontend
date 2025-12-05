import Txn from "./Txn";
import CategoryUsage from "../charts/CategoryUsage";

function TxnList({ filteredTransactions, txLoading }) {
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
