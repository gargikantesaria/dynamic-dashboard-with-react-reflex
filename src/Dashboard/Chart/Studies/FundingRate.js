import BinanceFutureLineChartStudy from "./BinanceFutureLineChartStudy";

class FundingRate extends BinanceFutureLineChartStudy {

	name = "Funding Rate";
	baseUrl = "https://fapi.binance.com/fapi/v1";
	endpoint = "fundingRate";
	keyX = "fundingTime";
	keyY = "fundingRate";

}

export default FundingRate;
