import {indexOfLessOrEqual} from "../../../utils";
import OrderFlowStudy from "./OrderFlowStudy";

class OrderBookStudy extends OrderFlowStudy {

	metric = 'orderbook_vol';

	getXYData = (data) => ({
		x: data.data.map((d) => new Date(d.timestamp).getTime()),
		y1: data.data.map((d) => this.computeForBidAsk(d.bid_vol_usdt_0_1, d.ask_vol_usdt_0_1)),
		y2: data.data.map((d) => this.computeForBidAsk(d.bid_vol_usdt_0_2_5, d.ask_vol_usdt_0_2_5)),
		y3: data.data.map((d) => this.computeForBidAsk(d.bid_vol_usdt_0_5, d.ask_vol_usdt_0_5)),
		y4: data.data.map((d) => this.computeForBidAsk(d.bid_vol_usdt_0_10, d.ask_vol_usdt_0_10)),
		y5: data.data.map((d) => this.computeForBidAsk(d.bid_vol_usdt_0_20, d.ask_vol_usdt_0_20)),
	});

	addDataToBar = (bar, extension, inputs) => {
		let i = indexOfLessOrEqual(this.data.x, bar.DT.getTime());
		if (inputs.value > 10 && inputs.value <= 20)
			bar[`line ${extension}`] = this.data.y5[i];
		else if (inputs.value > 5 && inputs.value <= 10)
			bar[`line ${extension}`] = this.data.y4[i];
		else if (inputs.value > 2.5 && inputs.value <= 5)
			bar[`line ${extension}`] = this.data.y3[i];
		else if (inputs.value > 1 && inputs.value <= 2.5)
			bar[`line ${extension}`] = this.data.y2[i];
		else if (inputs.value >= 0 && inputs.value <= 1)
			bar[`line ${extension}`] = this.data.y1[i];
	}
}

export default OrderBookStudy;
