import React, { useState } from "react";
import { useAtom } from "jotai";
import { Address } from "../../atoms";
import { useNeutrinoData } from "../../queries/hooks";
import NeutrinoPopup from "./Components/NeutrinoPopup";
import Graph from "react-graph-vis";
import { Box } from "@chakra-ui/react";

const Neutrino = () => {
  const [address] = useAtom(Address);
  const filterEdge = (edges, edgeid) => {
    return edges.filter((edge) => edge.id === edgeid);
  };
  const [neutrinoData, setNeutrinoData] = useState({});
  const newData = useNeutrinoData(address);
  // console.log(newData);
  // const helloData = newData?.edges.map((e) => {
  //   return { ...e, length: 150 };
  // });
  // const finalData = { nodes: newData?.nodes, edges: helloData };
  // // newData.edges = helloData;
  // console.log(finalData, "hhhh");
  function _getTimeDifference(curr, prev) {
    var ms_Min = 60 * 1000; // milliseconds in Minute
    var ms_Hour = ms_Min * 60; // milliseconds in Hour
    var ms_Day = ms_Hour * 24; // milliseconds in day
    var ms_Mon = ms_Day * 30; // milliseconds in Month
    var ms_Yr = ms_Day * 365; // milliseconds in Year
    var diff = curr - prev; //difference between dates.
    // If the diff is less then milliseconds in a minute
    if (diff < ms_Min) {
      return Math.round(diff / 1000) + " seconds ago";

      // If the diff is less then milliseconds in a Hour
    } else if (diff < ms_Hour) {
      return Math.round(diff / ms_Min) + " minutes ago";

      // If the diff is less then milliseconds in a day
    } else if (diff < ms_Day) {
      return Math.round(diff / ms_Hour) + " hours ago";

      // If the diff is less then milliseconds in a Month
    } else if (diff < ms_Mon) {
      return +Math.round(diff / ms_Day) + " days ago";

      // If the diff is less then milliseconds in a year
    } else if (diff < ms_Yr) {
      return +Math.round(diff / ms_Mon) + " months ago";
    } else {
      return +Math.round(diff / ms_Yr) + " years ago";
    }
  }
  const options = {
    width: "100%",
    height: "100%",
    manipulation: {
      enabled: true,
    },
    nodes: {
      // label: true,
      color: {
        border: "#2B7CE9",
        background: "#97C2FC",
        highlight: {
          border: "#2B7CE9",
          background: "#D2E5FF",
        },
        hover: {
          border: "#2B7CE9",
          background: "#D2E5FF",
        },
      },
    },
    edges: {
      selectionWidth: (width) => width * 1.2,
      label: undefined,
      scaling: {
        min: 1,
        max: 15,
        label: {
          enabled: false,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5,
        },
        customScalingFunction: function (min, max, total, value) {
          if (max === min) {
            return 0.5;
          } else {
            var scale = 1 / (max - min);
            return Math.max(0, (value - min) * scale);
          }
        },
      },
      width: 1,
      color: {
        // arrows: { to: { color: "red" } },
        color: "#848484",
        highlight: "#848484",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0,
      },
      // smooth: {
      //   type: "continuous",
      // },
      // arrows: {
      //   to: {
      //     color: "red",
      //   },

      //   from: {
      //     color: "green",
      //   },
      // },
      font: {
        size: 0,
      },
      width: 2,
      smooth: {
        type: "continuous",
        forceDirection: "none",
      },
      chosen: {
        label: function (values) {
          values.size = 2;
        },
      },
    },

    groups: {
      exchange: {
        shape: "dot",
        color: {
          background: "#F15412",
          border: "RGBA(43, 124, 233, 0.5)",
          highlight: {
            border: "RGBA(43, 124, 233, 0.5)",
            background: "#F15412",
          },
        },
      },
      dex: {
        shape: "dot",
        color: {
          background: "#8758FF",
          border: "RGBA(43, 124, 233, 0.5)",
          highlight: {
            border: "RGBA(43, 124, 233, 0.5)",
            background: "#8758FF",
          },
        },
      },
      from_address: {
        shape: "dot",
        color: {
          background: "rgb(42,46,51)",
          border: "RGBA(43, 124, 233, 0.5)",
          highlight: {
            border: "RGBA(43, 124, 233, 0.5)",
            background: "rgb(42,46,51)",
          },
        },
      },
      to_address: {
        shape: "dot",
        color: {
          background: "rgb(42,46,51)",
          border: "RGBA(43, 124, 233, 0.5)",
          highlight: {
            border: "RGBA(43, 124, 233, 0.5)",
            background: "rgb(42,46,51)",
          },
        },
      },
    },
    physics: {
      barnesHut: {
        gravitationalConstant: -20000,
        springLength: 300,
        damping: 0.3,
        springConstant: 0.1,
        avoidOverlap: 0.92,
        centralGravity: 0,
      },
      stabilization: {
        enabled: true,
        // iterations: 2000,
      },
      minVelocity: 0,
      repulsion: {
        nodeDistance: 1000,
      },
      // springConstant:0.8
    },
    // interaction: {
    //   hover: true,
    // },
    layout: {
      hierarchical: false,
    },
    // clusterNodeProperties: {
    //   allowSingleNodeCluster: true,
    // },
    //   edges: {
    //     width: 2,
    //     color: "#0099ff"
    //   },
  };
  const events = {
    select: () => {},
    selectEdge: (event) => {
      const { edges } = event;
      const edgeId = edges[0];
      const edge = filterEdge(newData?.data?.edges, edgeId);
      setNeutrinoData(edge);
    },
    // selectNode:()=.{}
  };
  if (!address) {
    return (
      <Box
        h="calc(100%)"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        style={{
          border: "1px solid rgba(255, 255, 255, 0.06)",
          // fontFamily: "Ubuntu Mono, monospace !important",
        }}
      >
        <div className="border text-semibold bg-[#212124ab] text-[#B7B7B7] border-[#27272C] w-full h-full flex items-center justify-center">
          {`wb wallet 0xd7...4c6`}
        </div>
      </Box>
    );
  }

  return address && newData?.isLoading ? (
    <Box
      h="100%"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.06)",
        // fontFamily: "Ubuntu Mono, monospace !important",
      }}
    >
      <div className="border text-semibold bg-[#212124ab] text-[#B7B7B7] border-[#27272C] w-full h-full flex items-center justify-center">
        loading...
      </div>
    </Box>
  ) : newData?.isSuccess ? (
    <div className="h-[85vh] relative ">
      {/* <DateRangePicker /> */}
      <NeutrinoPopup data={neutrinoData} setNeutrinoData={setNeutrinoData} />
      <Graph
        graph={newData?.data}
        options={options}
        events={events}
        // getNetwork={(network) => {
        //   console.log(network);
        // }}
      />
    </div>
  ) : (
    <Box
      h="100%"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.06)",
        // fontFamily: "Ubuntu Mono, monospace !important",
      }}
    >
      <div className="border text-semibold bg-[#212124ab] text-[#B7B7B7] border-[#27272C] w-full h-full flex items-center justify-center">
        Something Went wrong.
      </div>
    </Box>
  );
};

export default Neutrino;
