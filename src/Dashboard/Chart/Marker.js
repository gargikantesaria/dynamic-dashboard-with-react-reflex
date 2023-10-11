import React from "react";
import { CIQ } from "chartiq/js/standard";
import { Granularity } from "../../atoms";
import { useAtom } from "jotai";
import moment from "moment";

const Marker = (setGranularity) => {
  const marker = CIQ.SignalIQ.Marker;
  marker._create = marker._create || marker.create;
  marker.create = function (params) {
    let { stx, sd } = params;
    let markerSignal = marker._create(params);
    markerSignal.click = function () {
      let { tick, chart } = markerSignal;
      let candle = chart.scrubbed[tick];
    //   console.log(candle);
      setGranularity(true);
      sd.signalData.toggleStudy();
      stx.findHighlights(null, true);
    };
    return markerSignal;
  };
  return marker;
};

export default Marker;
