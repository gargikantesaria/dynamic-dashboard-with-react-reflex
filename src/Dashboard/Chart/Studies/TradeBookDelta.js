import TradeBookStudy from "./TradeBookStudy";

class TradeBookDelta extends TradeBookStudy {
	name = "Trade Book Delta";

	computeForBidAsk = (bid, ask) => bid - ask;
}

export default TradeBookDelta;
