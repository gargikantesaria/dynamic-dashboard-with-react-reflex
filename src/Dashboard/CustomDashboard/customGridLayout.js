import { ConnectedTvOutlined } from "@mui/icons-material";
import { useAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import React, { useState, useEffect } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import {
  ActiveDbTab,
  ConfigData,
  GlobalLayout,
  SelectedView,
 
} from "../../atoms";
import { useDeleteLayout, useUpdateLayout } from "../../queries/mutation";
import Views from "./Views";
import { useLocation } from "react-router-dom";

export default function CustomGridLayout(props) {

  const [viewId, setViewId] = useAtom(SelectedView);
  const [layouts, setLayouts] = useAtom(GlobalLayout);
  const [tabId, setTabId] = useAtom(ActiveDbTab);
  const location = useLocation()
  // const [layout, setLayout] = useState();
  // const [layoutStyleChosen] = useAtom(layoutStyle);
  const [configData, setConfigData] = useAtom(ConfigData);
  // Handle layout change events
  function handleResize() {}
  // const mutateDeleteLayout = useDeleteLayout({
  //     onSuccess: (data) => {
  //       console.log("mutate", data);
  //     },
  //     onError: (e) => {
  //       console.log(e)
  //     }
  //   })
  // to remove grid item
  // const onRemoveItem = (itemId) => {
  //     // let selectedItem = props.layout[props.i];
  //     // selectedItem["matrices"] = props.layout[props.i]["matrices"].filter((data) => data.id !== itemId);
  //     // props.setLayout(() => {
  //     // return [
  //     //     ...props.layout?.slice(0, props.i),
  //     //     selectedItem,
  //     //     ...props.layout?.slice(props.i + 1),
  //     // ];
  //     // });
  //    // mutateDeleteLayout.mutateAsync({ "layout_id": itemId,token:token})

  //     // to hide ReflexElement in DOM
  //     document.querySelectorAll(`.item-${itemId}`).forEach((element) => {
  //         element.classList.add('hidden');
  //     });
  // };

  // const renderReflexElementByIndex = (currentIndex) => {
  //     if(props.layoutConfig[currentIndex]){
  //         return (
  //             <ReflexElement className={`item-${props.data?.matrices[currentIndex]?.id} p-1 flex border border-[#25272B] rounded-2xl bg-[#181818] overflow-hidden flex-col relative w-full h-full text-white items-start`}>
  //                 <div className="flex pb-6 w-full">
  //                     <span
  //                     className="cursor-pointer rounded-full text-white bg-borderGreen/50 leading-[12px] text-xl p-1 pt-[5px]  font-medium absolute top-[5px] right-[10px]  hover:text-white hover:bg-red-500/90 "
  //                         onClick={() => {
  //                          onRemoveItem(props.layoutConfig[currentIndex]?.id);
  //                     }}
  //                     >
  //                     ×
  //                     </span>
  //                 </div>
  //                 <div className="pane-content">
  //                     Griddd Layout : {props.data?.matrices[currentIndex]?.metricName !== "" ? props.data?.matrices[currentIndex]?.metricName : props.data?.matrices[currentIndex]?.id}
  //                 </div>
  //             </ReflexElement>
  //         );
  //     } else {
  //         return;
  //     }
  // }

  // for add new item : start
  // console.log(props.layoutStyleInitialItemsLength)
  // slice new added items
  // const newitemsArray = props.layoutConfig?.slice(props.layoutStyleInitialItemsLength);

  // new added items reflex elements array
  // const newAddedItemsReflexElements = [];
  // newitemsArray.forEach((matrice,i)=>{
  //     newAddedItemsReflexElements.push(
  //         <ReflexElement key={`element${i}`} className={`item-${matrice?.id} p-1 flex border border-[#25272B] rounded-2xl bg-[#181818] overflow-hidden flex-col relative w-full h-full text-white items-start`}>
  //             <div className="flex pb-6 w-full">
  //                 <span
  //                 className="cursor-pointer rounded-full text-white bg-borderGreen/50 leading-[12px] text-xl p-1 pt-[5px]  font-medium absolute top-[5px] right-[10px]  hover:text-white hover:bg-red-500/90 "
  //                 onClick={()=>{
  //                     onRemoveItem(matrice?.id);
  //                 }}
  //                 >
  //                 ×
  //                 </span>
  //             </div>
  //             <div className="pane-content">
  //                 Grid Layoutttt : {matrice?.metricName}
  //             </div>
  //         </ReflexElement>
  //     );

  //     // don't add splitter for last element
  //     (i < newitemsArray.length - 1) ? newAddedItemsReflexElements.push(<ReflexSplitter key={`splitter${i}`} />) : '';
  // });

  // for add new item : end

  const mutatePatchLayout = useUpdateLayout({
    onSuccess: (data) => {
      console.log("patched data", data);    
      setLayouts(layouts.map((layout) => {
        if (layout.id === tabId) {
          return data["layout Updated"];
        }
        return layout;
      }));
    },
    
    onError: (e) => {
      console.log(e);
    },
  });

  let UpdateConfig = () => {
    if (JSON.stringify(configData?.data) !== "{}" && configData.id) {      
      if (configData.id === tabId) {
        if (viewId) {
          console.log("cfData",configData)
          let activeLayout = layouts.find((item) => item.id === tabId);
          let updatedArr = activeLayout?.layout_config.map((obj) =>
            obj?.uuid === viewId
              ? { ...obj,type:configData?.data?.type, config: configData?.data?.config }
              : obj
          );
          console.log("up", updatedArr);
          const patch = {
            layout_id: props.layout.id,
            layout_config: updatedArr,
          };
          mutatePatchLayout.mutateAsync( patch);
          setConfigData({ id: tabId, data: {}, uuid: "" });
        } else {
          let viewConfig = [...props.layout.layout_config];
          viewConfig.push(configData.data);
          const patchData = {
            layout_id: props.layout.id,
            layout: `layout_${viewConfig.length}_1`,
            layout_config: viewConfig,
          };
          mutatePatchLayout.mutateAsync( patchData);
          setConfigData({ id: tabId, data: {}, uuid: "" });
        }
      }
    }
  };
  useEffect(() => {
    UpdateConfig();
  }, [configData]);

  return (
    <div
      style={location.pathname === '/share'?{height:"96vh",width:"98vw" ,marginInline:"auto",marginBlock:"2vh"}:{  height: `calc(100vh - 145px)` }}
      className=" relative flex"
      id="main-custom-grid-container"
    >
      {props.layout?.layout_config?.length > 0 ? (
        renderLayout(props.layout, props.layout.layout.slice(-1))
      ) : (
          <>
            {console.log("aafasfasf",props.layout)}
          <div className="border text-semibold bg-[#212124ab] text-[#B7B7B7] border-[#27272C] w-full h-full rounded-2xl flex items-center justify-center">
            {`db add wb/sc view_name`}
          </div>
        </>
      )}
{/*<button className="absolute text-sm right-4 -top-10 px-5 py-1 rounded-lg bg-violet-500">
        Save
      </button> */}
    </div>
  );
}

const renderLayout = (LAYOUT, i) => {
  // console.log("lay",LAYOUT.layout_config?.[0]);
  switch (LAYOUT.layout) {
    case "layout_1_1":
      return (
        <ReflexContainer orientation="vertical">
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[0]} />
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_2_1":
    case "layout_2_2":
      return (
        <ReflexContainer orientation={i === "1" ? "vertical" : "horizontal"}>
          {/* {console.log()} */}
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[0]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[1]} />
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_3_1":
    case "layout_3_6":
      return (
        <ReflexContainer orientation={i === "1" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer
              orientation={i === "1" ? "horizontal" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer
              orientation={i === "1" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_3_4":
    case "layout_3_5":
      return (
        <ReflexContainer orientation={i === "4" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[0]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[1]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[2]} />
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_3_2":
    case "layout_3_3":
      return (
        <ReflexContainer orientation={i === "2" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer
              orientation={i === "2" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer
              orientation={i === "2" ? "horizontal" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_4_1":
      return (
        <ReflexContainer orientation={"horizontal"}>
          <ReflexElement>
            <ReflexContainer orientation={"vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_4_6":
      return (
        <ReflexContainer orientation={"horizontal"}>
          <ReflexElement>
            <ReflexContainer orientation={"vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_4_2":
    case "layout_4_3":
      return (
        <ReflexContainer orientation={i === "3" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer
              orientation={i === "3" ? "horizontal" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer
              orientation={i === "3" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_4_4":
    case "layout_4_5":
      return (
        <ReflexContainer orientation={i === "4" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[0]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[1]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[3]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[4]} />
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_5_1":
      return (
        <ReflexContainer orientation={"vertical"}>
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_5_2":
      return (
        <ReflexContainer orientation={"horizontal"}>
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_5_3":
      return (
        <ReflexContainer orientation={"horizontal"}>
          <ReflexElement>
            <ReflexContainer orientation={"vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={"horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_5_4":
    case "layout_5_5":
      return (
        <ReflexContainer orientation={i === "4" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[0]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[1]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[2]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[3]} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Views config={LAYOUT.layout_config?.[4]} />
          </ReflexElement>
        </ReflexContainer>
      );

    case "layout_6_1":
    case "layout_6_2":
      return (
        <ReflexContainer orientation={i === "1" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer
              orientation={i === "1" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer
              orientation={i === "1" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[5]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    case "layout_6_3":
    case "layout_6_4":
      return (
        <ReflexContainer orientation={i == "3" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer orientation={i == "3" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "3" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />

          <ReflexElement>
            <ReflexContainer orientation={i == "3" ? "vertical" : "horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "3" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "3" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[5]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
        </ReflexContainer>
      );
    case "layout_7_1":
    case "layout_7_2":
      return (
        <ReflexContainer orientation={i == "1" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer orientation={i == "1" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "1" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "1" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />

          <ReflexElement>
            <ReflexContainer orientation={i == "1" ? "vertical" : "horizontal"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "1" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[5]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer orientation={i == "1" ? "horizontal" : "vertical"}>
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[6]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
        </ReflexContainer>
      );
    case "layout_8_1":
    case "layout_8_2":
      return (
        // <ReflexContainer orientation={i === "2" ? "horizontal" : "vertical"}>
        //   <ReflexElement>
        <ReflexContainer orientation={i === "1" ? "horizontal" : "vertical"}>
          <ReflexElement>
            <ReflexContainer
              orientation={i === "1" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[0]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[1]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[2]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[3]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <ReflexContainer
              orientation={i === "1" ? "vertical" : "horizontal"}
            >
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[4]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[5]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[6]} />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement>
                <Views config={LAYOUT.layout_config?.[7]} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      );
    default:
      return;
  }
};
