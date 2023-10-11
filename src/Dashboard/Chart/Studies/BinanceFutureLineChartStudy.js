import LineChartStudy from "./LineChartStudy";
import {convertChartPeriodToBinancePeriod} from "../utils";

class BinanceFutureLineChartStudy extends LineChartStudy {

	baseUrl = "https://fapi.binance.com/futures/data";
	keyX = "timestamp";

	getURLToCall = (stx) => {
		let symbol = stx.chart.symbol;
		let period = convertChartPeriodToBinancePeriod(stx.layout.interval * stx.layout.periodicity,
			stx.layout.timeUnit || stx.layout.interval);
		let limit = 500;
		return `${this.baseUrl}/${this.endpoint}?symbol=${symbol}&period=${period}&limit=${limit}`;
	}

	getXYData = (data) => ({
		x: data.map((d) => new Date(d[this.keyX]).getTime()),
		y: data.map((d) => parseFloat(d[this.keyY]))
	});
}

export default BinanceFutureLineChartStudy;
