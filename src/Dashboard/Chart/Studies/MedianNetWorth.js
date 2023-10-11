import BaseWorkbenchStudy from "./BaseWorkbenchStudy";

class MedianNetWorth extends BaseWorkbenchStudy {
	name = "Median Net Worth";
	metric = "median_net_worth";

	y_keys = ['median_balance'];
}

export default MedianNetWorth;
