import BinanceFutureLineChartStudy from "./BinanceFutureLineChartStudy";

class OpenInterest extends BinanceFutureLineChartStudy {

	name = "Open Interest";
	endpoint = "openInterestHist";
	keyY = "sumOpenInterest";

}

export default OpenInterest;
