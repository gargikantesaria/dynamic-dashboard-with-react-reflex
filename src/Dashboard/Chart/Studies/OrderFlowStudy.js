import LineChartStudy from "./LineChartStudy";

class OrderFlowStudy extends LineChartStudy {
	inputs = {
		value: 0,
	}

	getURLToCall = (stx) => {
		let epoch_low = stx.chart.dataSet[0].DT.getTime() / 1000;
		let epoch_high = stx.chart.dataSet[stx.chart.dataSet.length - 1].DT.getTime() / 1000;
		return `${process.env.REACT_APP_PUBLIC_URI}/workbench/orderflow?metric=${this.metric}&epoch_low=${epoch_low}` +
			`&epoch_high=${epoch_high}&symbol=${stx.chart.symbol}`;
	}
}

export default OrderFlowStudy;
