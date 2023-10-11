import LineChartStudy from "./LineChartStudy";
import {CIQ} from "chartiq";

class LineHistChartStudy extends LineChartStudy {

	outputs = {
		line0: "#FFFF00",
		line1: "#0000FF",
		line2: "#fc6f03",
		"Increasing Bar": "#00DD00",
		"Decreasing Bar": "#FF0000"
	}

	seriesFN = CIQ.Studies.displayHistogramWithSeries;
}

export default LineHistChartStudy;
