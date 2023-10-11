import BalanceHistory from "./BalanceHistory";

class PNL extends BalanceHistory {
	name = "PNL";

	getXYData = (data) => ({
		x: Object.keys(data.bal_hist_pnl).map((d) => new Date(d).getTime()),
		y: [Object.values(data.bal_hist_pnl).map((d) => d.cum_pnl)],
		yy: Object.values(data.bal_hist_pnl).map((d) => d.pnl),
	});
}

export default PNL;
