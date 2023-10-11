import axios from "axios";
import {convertChartPeriodToBinancePeriod} from "./utils";

class QuoteFeed {
	url = "https://data.binance.com/api/v3";
	maxTicks = 1000;

	subscribe = ({symbol, interval, stx}) => {
		this.socket = new WebSocket(
			`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${convertChartPeriodToBinancePeriod(
				1,
				interval
			)}`
		);
		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const {k} = data;
			const {t, o, h, l, c, v} = k;
			stx.updateChartData([
				{
					DT: new Date(t),
					Open: parseFloat(o),
					High: parseFloat(h),
					Low: parseFloat(l),
					Close: parseFloat(c),
					Volume: parseFloat(v)
				}
			]);
		};
	};

	unsubscribe = () => {
		this.socket.close();
	};

	fetchInitialData = (
		symbol,
		suggestedStartDate,
		suggestedEndDate,
		params,
		cb
	) =>
		axios
			.get(
				`${this.url}/klines?symbol=${symbol}&interval=${convertChartPeriodToBinancePeriod(
					params.period,
					params.interval
				)}&limit=${this.maxTicks}`
			)
			.then((res) =>
				cb({
					quotes: this.formatChartData(res.data),
					moreAvailable: true,
					attribution: {source: "binance", exchange: "Binance"}
				})
			)
			.catch((error) => cb({error}));

	fetchPaginationData = (symbol, startDate, endDate, params, cb) =>
		axios
			.get(
				`${this.url}/klines?symbol=${symbol}&interval=${convertChartPeriodToBinancePeriod(
					params.period,
					params.interval
				)}&limit=${
					this.maxTicks
				}&startTime=${startDate.getTime()}&endTime=${endDate.getTime()}`
			)
			.then((res) =>
				cb({
					quotes: this.formatChartData(res.data),
					moreAvailable: true,
					attribution: {source: "binance", exchange: "Binance"}
				})
			)
			.catch((error) => cb({error}));

	formatChartData = (data) =>
		data.map(([date, Open, High, Low, Close, Volume]) => ({
			DT: new Date(date),
			Open: parseFloat(Open),
			High: parseFloat(High),
			Low: parseFloat(Low),
			Close: parseFloat(Close),
			Volume: parseFloat(Volume)
		}));
}

export default QuoteFeed;
