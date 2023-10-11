import axios from "axios";
import {indexOfLessOrEqual} from "../../../utils";

export class LiquidationPool {
	name = "Liquidation Pool";
	inputs = {
		trade_size: 10000,
		level: "5x",
		delta: 0,
		days: 30
	};
	overlay = true;
	updateHeatmapData = (stx, sd) => {
		let token = stx.chart.symbol;
		let {trade_size, level, delta, days} = sd.inputs;
		let timeframe = "4H";
		let url = `${process.env.REACT_APP_PUBLIC_URI}/workbench/orderflow_metrics/?metric=liquidation&exchange=binance-futures&token=${token}&trade_size=${trade_size}&liq_level=${level}&total_days=${days}&timeframe=${timeframe}&delta=${delta}`;
		if (
			this.updatedTime &&
			new Date() - this.updatedTime < 1000 * 60 * 60 &&
			this.updatedByUrl === url
		)
			return;
		axios
			.get(url)
			.then((response) => {
				this.heatmap = response.data;
				this.heatmap.heatmap_x = this.heatmap.heatmap_x.map((date) =>
					new Date(date).getTime()
				);
			})
			.catch(console.error);
		this.updatedTime = new Date();
		this.updatedByUrl = url;
	};

	calculateFN = (stx, sd) => {
		this.updateHeatmapData(stx, sd);
		let heatmap = this.heatmap;
		if (!heatmap) return;
		let range = this.calculateRange(heatmap.heatmap_z);

		stx.chart.scrubbed.forEach((bar) => {
			let i = indexOfLessOrEqual(heatmap.heatmap_x, bar.DT.getTime());
			bar.liquidation = heatmap.heatmap_y.map((price, j) => [
				price,
				heatmap.heatmap_z[j][i] || 0,
				range.normalize(heatmap.heatmap_z[j][i] || 0)
			]);
		});
		!stx.prependdisplayChart &&
		stx.prepend("displayChart", function () {
			this.drawHeatmap(
				{
					widthFactor: 1,
					height: 100 // size increments of heatmap_y
				},
				[
					{
						field: "liquidation",
						color: "rgb(255, 0, 0)",
						opacity: {
							min: 0,
							max: 1
						}
					}
				]
			);
		});
	};

	calculateRange = (heatmap) => {
		const range = {
			arr: new Set([]),
			min: 0,
			max: 0,
			normalize: function (n) {
				return (n - this.min) / (this.max - this.min);
			}
		};
		heatmap.forEach((arr) => {
			range.arr = new Set([...range.arr, ...arr]);
			range.min = Math.min(...range.arr);
			range.max = Math.max(...range.arr);
		});
		return range;
	};
}
