import React, {Component} from "react";
import CustomChart from "./CustomChart";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm";
import EmojiPopover from "chartiq/js/thirdparty/emoji-popover.es";
import marker from "chartiq/examples/markers/markersSample";
import QuoteFeed from "../../Chart/QuoteFeed";
import LookupDriver from "../../Chart/LookupDriver";
import {LiquidationPool} from "../../Chart/Studies/LiquidationPool";

class CustomWorbench extends Component {
	config = {
		chartId: "_coreChart",
		preferences: { "chart.gridLines": true },
		initialSymbol: {
			symbol: "BTCBUSD",
			name: "Bitcoin",
			exchDisp: "Binance"
		},
		plugins: {tfc: null, marketDepth: null, crossSection: null}, // Activated Plugins go here!
		onChartReady: () => null,
		lookupDriver: LookupDriver
	};

	resources = {
		quoteFeed: new QuoteFeed(),
		markerFeed: marker.MarkersSample,
		scrollStyle: PerfectScrollbar, // use improved component scrollbar appearance https://perfectscrollbar.com
		emojiPicker: EmojiPopover
	};

	studyLibrary = {
		liquidation_pool: new LiquidationPool()
	};

	onChartInitialized = ({ chartEngine }) => (this.stx = chartEngine);

	render() {
		return (
			<CustomChart
					viewConfig={this.props.viewConfig}
					config={this.config}
					resources={this.resources}
					chartInitialized={this.onChartInitialized}
					studyLibrary={this.studyLibrary}
				/>
		);
	}
}

export default CustomWorbench;
