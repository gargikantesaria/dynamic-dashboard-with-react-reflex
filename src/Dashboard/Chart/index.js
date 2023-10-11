import React from "react";
import { Granularity } from "../../atoms";
import { useAtom } from "jotai";

// Import necessary ChartIQ library files
import { CIQ } from "chartiq/js/standard";
import "chartiq/js/components";
import "chartiq/js/addOns";

import ChartTemplate from "./Template";

// Base styles required by the library to render color correctly.
import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css"; // Index API
import "chartiq/css/chartiq.css"; // Index UI
// SignalIq Plugins
import "chartiq/js/advanced.js";
import "chartiq/plugins/signaliq/signaliqDialog";
import "chartiq/plugins/signaliq/signaliq-marker";
import "chartiq/plugins/signaliq/signaliq-paintbar";

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm";
import EmojiPopover from "chartiq/js/thirdparty/emoji-popover.es";
import marker from "chartiq/examples/markers/markersSample";

import defaultConfig from "chartiq/js/defaultConfiguration";
import LookupDriver from "./LookupDriver";
import QuoteFeed from "./QuoteFeed";
import { LiquidationPool } from "./Studies/LiquidationPool";
import Velocity from "./Studies/Velocity";
import Gini from "./Studies/Gini";
import WalletAnalysis from "./Studies/WalletAnalysis";
import OpenInterest from "./Studies/OpenInterest";
import OpenInterestValue from "./Studies/OpenInterestValue";
import FundingRate from "./Studies/FundingRate";
import OrderBookDelta from "./Studies/OrderBookDelta";
import OrderBookTotal from "./Studies/OrderBookTotal";
import OrderBookRatio from "./Studies/OrderBookRatio";
import TradeBookDelta from "./Studies/TradeBookDelta";
import TradeBookCumulativeDelta from "./Studies/TradeBookCumulativeDelta";
import CCV from "./Studies/CCV";
import BalanceHistory from "./Studies/BalanceHistory";
import ActiveUsers from "./Studies/ActiveUsers";
import TxnCounts from "./Studies/TxnCounts";
import MedianNetWorth from "./Studies/MedianNetWorth";
import PNL from "./Studies/PNL";
import CPI from "./Studies/CPI";
import { Symbols } from "./Symbols";
import Marker from "./Marker";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    let config = {
      chartId: "_coreChart",
      showFooter: false,
      initialSymbol: Symbols[0],
      plugins: { tfc: null, marketDepth: null, crossSection: null }, // Activated Plugins go here!
      onChartReady: () => null,
      lookupDriver: LookupDriver,
    };

    let resources = {
      quoteFeed: new QuoteFeed(),
      markerFeed: marker.MarkersSample,
      scrollStyle: PerfectScrollbar, // use improved component scrollbar appearance https://perfectscrollbar.com
      emojiPicker: EmojiPopover,
    };

    let customStudies = {
      liquidation_pool: new LiquidationPool(),
      Velocity: new Velocity(),
      Gini: new Gini(),
      wallet_analysis: new WalletAnalysis(),
      open_interest: new OpenInterest(),
      open_interest_value: new OpenInterestValue(),
      funding_rate: new FundingRate(),
      order_book_delta: new OrderBookDelta(),
      order_book_total: new OrderBookTotal(),
      order_book_ratio: new OrderBookRatio(),
      trade_book_delta: new TradeBookDelta(),
      trade_book_cumulative_delta: new TradeBookCumulativeDelta(),
      CCV: new CCV(),
      balance_history: new BalanceHistory(),
      active_users: new ActiveUsers(),
      txn_counts: new TxnCounts(),
      median_net_worth: new MedianNetWorth(),
      pnl: new PNL(),
      cpi: new CPI(),
    };

    this.container = React.createRef();
    this.config = CIQ.extend(defaultConfig(resources), config);

    CIQ.Studies.studyLibrary = CIQ.extend(
      CIQ.Studies.studyLibrary,
      customStudies
    );
    CIQ.SignalIQ.Marker = Marker(this.props.setGranularity);

    this.stx = null;
    this.uiContext = null;
  }

  componentDidMount() {
    if (this.init) return;
    const container = this.container.current;
    const { chartInitialized } = this.props;
    const { config } = this;

    portalizeContextDialogs(container);
    // Delay the call to createChartAndUI so any other chart components on the page
    // using multi chart setup have a chance to call portalizeContextDialogs
    window.setTimeout(() => {
      const uiContext = (this.uiContext = this.createChartAndUI({
        container,
        config,
      }));
      const chartEngine = (this.stx = uiContext.stx);
      chartEngine.chart.xAxis.displayGridLines = false;
      chartEngine.chart.yAxis.displayGridLines = false;
      chartEngine.controls.chartControls.style.display = "none";
      chartEngine.controls.chartControls = null;
      this.setState({ stx: chartEngine, UIContext: uiContext });

      if (chartInitialized) {
        chartInitialized({ chartEngine, uiContext });
      }
    }, 0);
    this.init = true;
    this.rendered = false;
  }

  saveLayout() {
    // Access the ChartEngine instance through this.stx
    const layout = this.stx.exportLayout(true);
    console.log("layout", layout);
    // Do something with the layout object here
  }
  componentWillUnmount() {
    // Destroy the ChartEngine instance when unloading the component.
    // This will stop internal processes such as quotefeed polling.
    if (!this.stx || !this.rendered) return;

    this.stx.destroy();
    this.stx.draw = () => {};
  }

  createChartAndUI({ container, config }) {
    return new CIQ.UI.Chart().createChartAndUI({ container, config });
  }

  render() {
    this.rendered = true;
    return (
      <cq-context
        ref={this.container}
        style={this.props.granularity ? { width: "70%" } : {}}
      >
        <ChartTemplate config={this.config} />
      </cq-context>
    );
  }
}
export default function Chart() {
  const [granularity, setGranularity] = useAtom(Granularity);
  return (
    <ChartComponent granularity={granularity} setGranularity={setGranularity} />
  );
}
/**
 * For applications that have more then one chart, keep single dialog of the same type
 * and move it outside context node to be shared by all chart components
 */
function portalizeContextDialogs(container) {
  container.querySelectorAll("cq-dialog").forEach((dialog) => {
    dialog.remove();
    if (!dialogPortalized(dialog)) {
      document.body.appendChild(dialog);
    }
  });
}

function dialogPortalized(el) {
  const tag = el.firstChild.nodeName.toLowerCase();
  return Array.from(document.querySelectorAll(tag)).some(
    (el) => !el.closest("cq-context")
  );
}

/**
 * @callback Core~chartInitialized
 * @param {CIQ.ChartEngine} chartEngine
 * @param {CIQ.UI.Context} uiContext
 */

// Adjustments to compensate for when webpack config is not available
(function initDynamicShare() {
  // Decorate the library function to avoid copying html2canvas.min.js to distribution to js/thirdparty directory
  const fullChart2PNG = CIQ.Share.fullChart2PNG;
  CIQ.Share.fullChart2PNG = function (stx, params, cb) {
    import("chartiq/js/thirdparty/html2canvas.min.js").then(() => {
      fullChart2PNG(stx, params, cb);
    });
  };
})();
