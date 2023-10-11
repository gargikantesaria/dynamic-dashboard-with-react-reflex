import OrderBookStudy from "./OrderBookStudy";

class OrderBookTotal extends OrderBookStudy {
	name = "Order Book Total";

	computeForBidAsk = (bid, ask) => bid + ask;
}

export default OrderBookTotal;
