import React from "react";

// Import necessary ChartIQ library files
import {CIQ} from "chartiq/js/standard";
import "chartiq/js/components";
import "chartiq/js/addOns";

import CustomTemplate from "./CustomTemplate";

// Base styles required by the library to render color correctly.
import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css"; // Chart API
import "chartiq/css/chartiq.css"; // Chart UI
// SignalIq Plugins
import "chartiq/js/advanced.js";
import "chartiq/plugins/signaliq/signaliqDialog";
import "chartiq/plugins/signaliq/signaliq-marker";
import "chartiq/plugins/signaliq/signaliq-paintbar";

import defaultConfig from "chartiq/js/defaultConfiguration";

export default class CustomChart extends React.Component {
  constructor(props) {
    super(props);
    const { config, resources } = props;

    this.container = React.createRef();
    this.config = CIQ.extend(defaultConfig(resources), config);

    CIQ.Studies.studyLibrary = CIQ.extend(
      CIQ.Studies.studyLibrary,
      this.props.studyLibrary
    );

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

      this.setState({ stx: chartEngine, UIContext: uiContext });

      if (this.props.viewConfig) {
        // console.log(layout[this.props.data])
        chartEngine.importLayout(
          JSON.parse(JSON.stringify(this.props.viewConfig))
        );
      }
      if (chartInitialized) {
        chartInitialized({ chartEngine, uiContext });
      }
    }, 0);
    this.init = true;
    this.rendered = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.viewConfig !== prevProps.viewConfig) {
      this.stx?.importLayout(JSON.parse(JSON.stringify(this.props.viewConfig)));
    }
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
        style={{ width: "100% ", height: "100%" }}
      >
        <CustomTemplate config={this.config} />
      </cq-context>
    );
  }
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
  let result = Array.from(document.querySelectorAll(tag)).some(
    (el) => !el.closest("cq-context")
  );
  return result;
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
