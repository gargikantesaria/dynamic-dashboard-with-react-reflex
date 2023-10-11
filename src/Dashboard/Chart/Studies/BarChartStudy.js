import LineChartStudy from "./LineChartStudy";
import {CIQ} from "chartiq";

class BarChartStudy extends LineChartStudy {

	outputs = {}
	parameters = {
		init: {
			panelName: "New Panel",
		},
		widthFactor: 0.5
	};
	range = "0 to max";
	yAxis = {ground: true, initialMarginTop: 0, zoom: 0, heightFactor: 0.5};
	seriesFN = CIQ.Studies.displaySeriesAsHistogram;


}

export default BarChartStudy;
