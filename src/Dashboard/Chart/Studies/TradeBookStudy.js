import OrderFlowStudy from "./OrderFlowStudy";
import {indexOfLessOrEqual} from "../../../utils";

class TradeBookStudy extends OrderFlowStudy {
	metric = 'trade_vol';

	getXYData(data) {
		return {
			x: data.data.map((d) => new Date(d.timestamp).getTime()),
			y1: data.data.map((d) => this.computeForBidAsk(d.buy_vol_0_1k, d.sell_vol_0_1k)),
			y2: data.data.map((d) => this.computeForBidAsk(d.buy_vol_1k_10k, d.sell_vol_1k_10k)),
			y3: data.data.map((d) => this.computeForBidAsk(d.buy_vol_10k_100k, d.sell_vol_10k_100k)),
			y4: data.data.map((d) => this.computeForBidAsk(d.buy_vol_100k_1m, d.sell_vol_100k_1m)),
			y5: data.data.map((d) => this.computeForBidAsk(d.buy_vol_1m_10m, d.sell_vol_1m_10m)),
		};
	}

	addDataToBar = (bar, extension, inputs) => {
		let i = indexOfLessOrEqual(this.data.x, bar.DT.getTime());
		if (inputs.value > 1000000 && inputs.value <= 10000000)
			bar[`line ${extension}`] = this.data.y5[i];
		else if (inputs.value > 100000 && inputs.value <= 1000000)
			bar[`line ${extension}`] = this.data.y4[i];
		else if (inputs.value > 10000 && inputs.value <= 100000)
			bar[`line ${extension}`] = this.data.y3[i];
		else if (inputs.value > 1000 && inputs.value <= 10000)
			bar[`line ${extension}`] = this.data.y2[i];
		else if (inputs.value >= 0 && inputs.value <= 1000)
			bar[`line ${extension}`] = this.data.y1[i];
	}
}

export default TradeBookStudy;
