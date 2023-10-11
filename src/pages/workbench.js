import React, { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom";

// import FooterTab from "../Workbench/Explorer/FooterTab";
import FooterTab from "../ChartPOC/Explorer/FooterTab";
import { Box, Flex } from "@chakra-ui/layout";
import { useAtom } from "jotai";
import requireAuth from "./auth/requireAuth";
import { InitialHeight, SIDEBAR, HEADER, Granularity } from "../atoms";
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement,
  ReflexHandle,
} from "react-reflex";
import "react-reflex/styles.css";
// import Workbench from "../Workbench/Workbench";
import Chart from "../Dashboard/Chart";
import GranularityContainer from "../Dashboard/LayoutComponents/Granularity";

class ControlledElementCls extends React.Component {
  constructor() {
    super();

    this.onMinimizeClicked = this.onMinimizeClicked.bind(this);

    this.onMaximizeClicked = this.onMaximizeClicked.bind(this);

    this.state = {
      size: -1,
    };
  }

  onMinimizeClicked() {
    const currentSize = this.getSize();
    if(this.state.size<=60){
      return;
    }
    const update = (size) => {
      return new Promise((resolve) => {
        this.setState(
          {
            size: size < 60 ? 60 : size,
          },
          () => resolve()
        );
      });
    };

    const done = (from, to) => {
      return from < to;
    };

    this.animate(currentSize, 60, -(currentSize-120), done, update);
  }

  onMaximizeClicked() {
    const currentSize = this.getSize();
    if(this.state.size>=window.innerHeight){
      return;
    }
    const update = (size) => {
      return new Promise((resolve) => {
        this.setState(
          {
            size: size > window.innerHeight ? window.innerHeight : size,
          },
          () => resolve()
        );
      });
    };

    const done = (from, to) => {
      return from > to;
    };

    this.animate(currentSize, window.innerHeight, (window.innerHeight-currentSize-100), done, update);
  }

  getSize() {
    const domElement = ReactDOM.findDOMNode(this);
    console.log(this.props);

    switch (this.props.orientation) {
      case "horizontal":
        return domElement.offsetHeight;

      case "vertical":
        return domElement.offsetWidth;

      default:
        return 0;
    }
  }

  animate(start, end, step, done, fn) {
    const stepFn = () => {
      if (!done(start, end)) {

        fn(start += step).then(() => {
          stepFn()
          // window.requestAnimationFrame(stepFn)
        })
      }
    };

    stepFn();
  }

  render() {
    return (
      <ReflexElement
        size={this.state.size}
        className="right-pane"
        minSize={60}
        flex={0.066}
        {...this.props}
      >
        <div
          className="pane-content"
          style={{ height: "calc(100% - 10px)", minHeight: "45px" }}
        >
          <FooterTab
            ReflexHandle={ReflexHandle}
            onMaximizeClicked={this.onMaximizeClicked}
            onMinimizeClicked={this.onMinimizeClicked}
          />
        </div>
      </ReflexElement>
    );
  }
}

const ControlledElement = React.forwardRef((props, ref) => {
  return <ControlledElementCls innerRef={ref} {...props} />;
});

function WorkbenchContainer() {
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  const [granularityActive, SetGranularityActive] = useAtom(Granularity);
  const footerRef = useRef(null);
  let SetConfig = () => {
    setSideBar(true);
    setHeader(true);
  };
  useEffect(() => {
    SetConfig();
  }, []);
  // const [H, setH] = useAtom(InitialHeight);
  console.log(window.innerHeight);
  const [analysisPane, setAnalysisPane] = useState({
    sizeLocked: false,
    name: "Analysis Pane",
    direction: -1,
    id: "analysis_pane",
    minSize: 60,
  });

  return (
    <div style={{ height: "calc(100vh - 90px)", width: "calc(100vw - 80px)" }}>
      <ReflexContainer orientation="horizontal">
        <ReflexElement
          className="left-pane"
          propagateDimensionsRate={200}
          propagateDimensions={true}
          resizeWidth={false}
          resizeHeight={false}
          flex={0.95}
        >
          <div className="pane-content" style={{ height: "100%" }}>
            <Chart
              granularityActive={granularityActive}
              SetGranularityActive={SetGranularityActive}
            />
            {granularityActive ? (
              <Box
                ml={"71%"}
                w={"29%"}
                h="100%"
                borderRadius={"8px"}
                borderWidth="1px"
              >
                <GranularityContainer />
              </Box>
            ) : (
              <></>
            )}
          </div>
        </ReflexElement>

        <ReflexSplitter />
        <ControlledElement ref={footerRef} {...analysisPane} />
      </ReflexContainer>
      {/* <Flex direction={"column"}>
        <Box h={H} style={{ w: "95vw" }}>
          <Workbench />
        </Box>
        <FooterTab />
      </Flex> */}
    </div>
  );
}

export default requireAuth(WorkbenchContainer);
