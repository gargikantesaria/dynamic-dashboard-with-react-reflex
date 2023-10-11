import OrderBookStudy from "./OrderBookStudy";

class OrderBookRatio extends OrderBookStudy {
	name = "Order Book Ratio";

	computeForBidAsk = (bid, ask) => (bid - ask) / (bid + ask);
}

export default OrderBookRatio;
