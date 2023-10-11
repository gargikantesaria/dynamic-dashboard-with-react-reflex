import TradeBookDelta from "./TradeBookDelta";
import {getCumulativeSum} from "../../../utils";

class TradeBookCumulativeDelta extends TradeBookDelta {
	name = "Trade Book Cumulative Delta";

	getXYData = (data) => {
		data = super.getXYData(data);
		return {
			x: data.x,
			y1: getCumulativeSum(data.y1),
			y2: getCumulativeSum(data.y2),
			y3: getCumulativeSum(data.y3),
			y4: getCumulativeSum(data.y4),
			y5: getCumulativeSum(data.y5),
		}
	}
}

export default TradeBookCumulativeDelta;
