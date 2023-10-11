import { useAtom } from "jotai";
import { useLocation } from "react-router";
import { SelectedView, SharePrivacy } from "../../atoms";
import ScreenerConfig from "./CustomScreener/ScreenerConfig";
import TradePanel from "./CustomTradePanel/TradePanel";
import CustomWorbench from "./CustomWorkbench/CustomWorkbench";

export default function Views({ config }) {
  const location = useLocation()
  const [viewId, setViewId] = useAtom(SelectedView);
  const [privacy,setPrivacy]= useAtom(SharePrivacy)
  // console.log(viewId,"view data")
  return (
    <>
      <div className={`flex border ${
          viewId === config?.uuid ? "border-[#0057FF]" : "border-[#25272B]"
        } rounded-2xl bg-[#181818] overflow-hidden flex-col relative w-full h-full text-white items-start`}
      >
      
          <div
            onDoubleClick={() => {
              viewId !== config?.uuid
                ? setViewId(config?.uuid)
                : setViewId(null);
            }}
          className="pane-content overflow-hidden"
          style={{ width: "100%", height: "100%" }}
          >
            {/* <CustomWorbench viewConfig={config.config} /> */}
            {/* <ScreenerConfig query={config.config} /> */}
            < TradePanel />
          {/* {config?.type === "workbench" ? (
            <CustomWorbench viewConfig={config.config} />
          ) : config?.type === "screener" ? (
            <ScreenerConfig query={config.config} />
          ) : config?.type === "oems" ? 
          location.pathname === '/share'?(privacy==="private" ?<TradePanel />:<div className="w-full  text-semibold bg-[#212124ab]  text-[#B7B7B7] h-full flex items-center justify-center">Private Trade Panel.</div>):< TradePanel />
             : (
              <><p style={{paddingLeft: "10px", paddingTop: "10px"}}>View</p></>
            )} */}
          </div>
        
      </div>
    </>
  );
}

