import BaseWorkbenchStudy from "./BaseWorkbenchStudy";

class CPI extends BaseWorkbenchStudy {
	name = "CPI Score";
	metric = "cpi";

	y_keys = ['cpi_txn_fee'];
	yy_key = 'cpi_gas_used';
}

export default CPI;
