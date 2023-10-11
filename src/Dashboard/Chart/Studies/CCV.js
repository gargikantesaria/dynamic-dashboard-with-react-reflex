import BaseWorkbenchStudy from "./BaseWorkbenchStudy";

class CCV extends BaseWorkbenchStudy {
	name = "CCV";
	metric = "ccv";

	y_keys = ['inflow', 'outflow'];
	yy_key = 'netflow';
}

export default CCV;
