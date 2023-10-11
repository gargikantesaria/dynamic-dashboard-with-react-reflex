import BarChartStudy from "./BarChartStudy";
import {getSymbolAddress} from "../utils";

class WalletAnalysis extends BarChartStudy {
	name = "Wallet Analysis";
	inputs = {
		address: "0xc600832A8cAE6217d44d31A9C5a7250c23bcfCDe"
	};
	outputs = {
		withdrawals: "red",
		deposits: {color: "green", opacity: 0.9}
	};

	getURLToCall = (stx, inputs) =>
		`${process.env.REACT_APP_BACKEND_URI}/metrics/wallet/?address_list=${inputs.address}` +
		`&token_address=${getSymbolAddress(stx.chart.symbol)}`;

	addDataToBar = (bar, extension) => {
		bar[`deposits ${extension}`] = this.data.deposits.find((deposit) =>
			new Date(deposit.timestamp).getTime() === bar.DT.getTime())?.value;
		bar[`withdrawals ${extension}`] = this.data.withdrawals.find((withdrawal) =>
			new Date(withdrawal.timestamp).getTime() === bar.DT.getTime())?.value;
	}
}

export default WalletAnalysis;
