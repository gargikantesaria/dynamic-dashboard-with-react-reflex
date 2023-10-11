import BaseWorkbenchStudy from "./BaseWorkbenchStudy";

class BalanceHistory extends BaseWorkbenchStudy {
	name = "Balance History";

	inputs = {
		address: "0xaeb960ed44c8a4ce848c50ef451f472a503456b2",
	}

	getURLToCall = (stx, inputs) =>
		`${process.env.REACT_APP_PUBLIC_URI}/metrics/bal_history_pnl?&address=${inputs.address}`;

	getXYData = (data) => ({
		x: Object.keys(data.bal_hist_pnl).map((d) => new Date(d).getTime()),
		y: [Object.values(data.bal_hist_pnl).map((d) => d.value)],
	});
}

export default BalanceHistory;
