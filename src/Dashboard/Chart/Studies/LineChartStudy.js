import {indexOfLessOrEqual} from "../../../utils";
import axios from "axios";

class LineChartStudy {
	overlay = true;
	inputs = {};
	outputs = {
		line: "#FFFF00"
	};

	parameters = {
		init: {
			panelName: "New Panel",
		},
	}

	getURLToCall = () => null;

	updateData = (stx, inputs) => {
		let url = this.getURLToCall(stx, inputs);
		if (
			this.updateTime &&
			new Date() - this.updateTime < 1000 * 60 * 60 &&
			this.updatedByUrl === url
		)
			return;
		axios
			.get(url)
			.then(response => this.data = this.getXYData(response.data))
			.catch(error => {
				console.error(error);
				this.data = null;
			});
		this.updatedByUrl = url;
		this.updateTime = new Date();
	};

	getXYData = (data) => data;

	calculateFN = (stx, sd) => {
		this.updateData(stx, sd.inputs);
		if (!this.data) return;
		stx.chart.scrubbed.forEach(bar => this.addDataToBar(bar, sd.name, sd.inputs));
	};

	addDataToBar = (bar, extension) => {
		bar[`line ${extension}`] = this.data.y[indexOfLessOrEqual(this.data.x, bar.DT.getTime())];
	}
}

export default LineChartStudy;
