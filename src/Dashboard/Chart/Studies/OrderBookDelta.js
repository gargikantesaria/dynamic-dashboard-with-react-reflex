import OrderBookStudy from "./OrderBookStudy";

class OrderBookDelta extends OrderBookStudy {
	name = "Order Book Delta";

	computeForBidAsk = (bid, ask) => bid - ask;

}

export default OrderBookDelta;
