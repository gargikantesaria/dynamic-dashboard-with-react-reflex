import React, { useRef, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

const ExUsageWithdrawlsPiechart = ({ height, data }) => {
  const chartRef = useRef(null);
  // console.log(data)
  useEffect(() => {
    const chart = chartRef.current.getEchartsInstance();
    window.addEventListener("resize", () => {
      chart.resize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        chart.resize();
      });
    };
  }, []);

  const option = {
    title: {
      text: "Exchange Usage Withdrwals",
      // subtext: "Fake Data",
      left: "center",
      top: "25px",
    },
    tooltip: {
      trigger: "item",
      //   show: false,
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "white", // set the legend text color here
      },
    },
    series: [
      {
        name: "Exchnage Usage Withdrawls",
        type: "pie",
        radius: "50%",
        data: data ? data : [],
        // itemStyle: {
        color:
          data[0]?.name === "No tokens"
            ? ["rgba(33, 33, 36, 0.67)"]
            : ["#001D54", "#1464FF", "#5580D6", "#0A317D", "#1464FF"],
        // },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        labelLine: {
          normal: {
            show: false,
            length: 5,
            length2: 10,
            smooth: false, // set smooth to false to adjust the label line position
          },
        },
        label: {
          show: false,
          // textStyle: {
          //   fontSize: 12,
          //   fontWeight: 'bold'
          // }
        },
      },
    ],
  };

  return (
    <ReactEcharts
      ref={chartRef}
      option={option}
      style={{ height: "100%", width: "100%" }}
      // opts={{ renderer: "canvas", useDirtyRect: false }}
      onEvents={{
        resize: () => chartRef.current.getEchartsInstance().resize(),
      }}
    />
  );
};

export default ExUsageWithdrawlsPiechart;
