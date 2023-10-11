import {Symbols} from "./Symbols";

export const convertChartPeriodToBinancePeriod = (period, interval) => {
	if (isNaN(period)) period = 1;
	if (period >= 60) return `${period / 60}h`;
	switch (interval) {
		case "second":
			return `${period}s`;
		case "minute":
			if (`${period}` === '10')
				return '5m';
			return `${period}m`;
		case "day":
			return `${period}d`;
		case "week":
			return `${period}w`;
		case "month":
			return `${period}M`;
		default:
			return interval;
	}
}

export const getEtherscanSymbol = (symbol) =>
	Symbols.find((s) => s.symbol === symbol)?.etherscanSymbol || "usdt";

export const getSymbolAddress = (symbol) =>
	Symbols.find((s) => s.symbol === symbol)?.address;
