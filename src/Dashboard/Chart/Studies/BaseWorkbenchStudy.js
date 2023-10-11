import LineHistChartStudy from "./LineHistChartStudy";
import {indexOfLessOrEqual} from "../../../utils";
import {getEtherscanSymbol} from "../utils";

class BaseWorkbenchStudy extends LineHistChartStudy {

	x_key = 'block_date';
	y_keys = ['value'];
	yy_key = null;

	getURLToCall = (stx) =>
		`${process.env.REACT_APP_PUBLIC_URI}/workbench/onchain_metrics/?metric=${this.metric}` +
		`&token=${getEtherscanSymbol(stx.chart.symbol)}`;

	getXYData = (data) => ({
		x: data.data.map((d) => new Date(d[this.x_key]).getTime()),
		y: this.y_keys?.map((key) => data.data.map((d) => d[key])),
		yy: this.yy_key && data.data.map((d) => d[this.yy_key]),
	});

	addDataToBar = (bar, extension) => {
		let i = indexOfLessOrEqual(this.data.x, bar.DT.getTime());
		this.data.y?.forEach((y, idx) => {
			bar[`line${idx} ${extension}`] = y[i];
		});
		bar[`${extension}_hist`] = this.data.yy && this.data.yy[i];
	}

}

export default BaseWorkbenchStudy;
