import BaseWorkbenchStudy from "./BaseWorkbenchStudy";

class TxnCounts extends BaseWorkbenchStudy {
	name = "Txn Counts";
	metric = "txn_count";

	y_keys = ['txn_count'];
}

export default TxnCounts;
