import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
    import { v4 as uuidV4 } from "uuid";
import { Flex, Skeleton, Tooltip } from "@chakra-ui/react";
import { useAtom } from "jotai";
import requireAuth from "./auth/requireAuth";
import {
  ActiveDbTab,
  GlobalLayout,
  selectedMetricInfo,
  HEADER,
  SIDEBAR,
  SelectedView
} from "../atoms";
import CustomGridLayout from "../Dashboard/CustomDashboard/customGridLayout";
import {
  useDeleteLayout,
  useGetLayout,
  usePostLayout,
  useUpdateLayout,
} from "../queries/mutation";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { Share } from "iconsax-react";

import {  layoutToggle } from "../atoms";
const Dashboard = () => {
  const [create, setCreate] = useState(false)
  //skeleton
  const [isLoading, setIsLoading] = useState(true);
  const [Loaded,setLoaded] = useState(true)
  //global layout for workbench
  const [layouts, setLayouts] = useAtom(GlobalLayout);

  // initial custom layout
 
  const [layoutsChange, setLayoutsChange] = useAtom(layoutToggle);  

  //views uuid state
  const [viewId,setViewId] = useAtom(SelectedView)

  const [tabId, setTabId] = useAtom(ActiveDbTab);
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  const [size,setSize] = useState({width:null,height:null})
  let SetConfig = () => {
    setSideBar(true);
    setHeader(true);
  }
useEffect(() => {
  SetConfig()
}, []);
  
useEffect(() => {
  function handleResize() {
    setSize({ width: window.innerWidth, height: window.innerHeight });   
  }
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  // selected layout style initial container item length
  const [layoutStyleInitialItemsLength, setLayoutStyleInitialItemsLength] =
    useState(0);
  const mutateDeleteLayout = useDeleteLayout({
    onSuccess: (data) => {
      console.log("del", data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [newName, setNewName] = useState(layouts[tabId]?.name);
  const addLayout = () => {
    if (layouts.length < 10) {
      setNewName( "layout " +
      String.fromCharCode(97 + Math.random() * 26) +
      String.fromCharCode(97 + Math.random() * 26))
      const postObj = {
        layout_name:newName,         
        layout: [],
        layout_config: [],
      };
    
      mutatePostLayout.mutateAsync(postObj);
      setIsOpen(false)
    }
  };


  const onRenameItem = () => {
    if (newName.length > 1) {
      const patchData = {
        layout_id: tabId,
        name: newName,
      };
      mutatePatchLayout.mutateAsync(patchData);
    }  
  };

  const mutateGetLayout = useGetLayout({
    onSuccess: (data) => {
      setTabId(data.layouts[0]?.id);
      setLayouts(data.layouts);
      setIsLoading(false)
      setLoaded(false)
      console.log("mutate", tabId);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const mutatePostLayout = usePostLayout({
    onSuccess: (data) => {
      setLayouts([...layouts, data.layouts]);
      console.log("post", layouts);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const mutatePatchLayout = useUpdateLayout({
    onSuccess: (data) => {
      setLayouts(
        layouts.map((obj) => (obj.id === tabId ? data["layout Updated"] : obj))
      );
      console.log("patch", data);
    },
    onError: (e) => {
      console.log(e);
    },
  });


  const getInitialLayout = () => {
    setIsLoading(true)
    mutateGetLayout.mutateAsync();
  };
  useEffect(() => {
   
    getInitialLayout();
  }, []);
  // for add layout button
  const AddLayoutBtn = () => {
    return (
      <Tooltip
        label={
          layouts?.length < 10 ? "Add layout" : "Add layout limit exceeded"
        }
      >
        <button
          className={`dashboardTabs inline-block py-2 px-1 relative cursor-pointer disabled:cursor-not-allowed ${
            layouts?.length < 8 ? "top-1" : ""
          }`}
          onClick={() => {
            setCreate(true)
            setIsOpen(true)
          }}
          disabled={layouts?.length < 10 ? false : true}
        >
          <img
            className=""
            src={require("../assets/add_icon.png")}
            width={15}
            height={15}
            alt="add-layout"
          />
        </button>
      </Tooltip>
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    // setEditLayoutState(!editLayoutState)
    setIsOpen(true);
  };
  const onClose = () => {
    // setNewName(layout[layoutTabID].name)
    // setEditLayoutState(!editLayoutState)
    setIsOpen(false);
  };
  const onSaveAndClose = () => {
    onRenameItem();
    // setEditLayoutState(!editLayoutState)
    setIsOpen(false);
  };
  const onDeleteItem = () => {
    const filteredArray = layouts.filter((obj) => obj.id !== tabId);
    mutateDeleteLayout.mutateAsync(tabId);
    setLayouts(filteredArray); 
    setIsOpen(false);
  };
  return (
        <div className="relative dashboard-page">
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {console.log(isOpen)}
            <ModalOverlay backdropFilter="blur(4px)" />
            <ModalContent
              maxWidth={700}
              color={"white"}
              backgroundColor={"gray.glass"}
            >
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody className="mt-1 mb-10">
                <Input
                  fontSize={"14px"}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  value={newName}
                  variant={"unstyled"}
                  placeholder="Enter Name..."
                />
              </ModalBody>

              <ModalFooter
                backgroundColor={"gray.stroke"}
                className="p-4 rounded"
              >
                <Share color="#f5f5f5" className="absolute left-6" />

                <Button
                  color={"gray.200"}
                  fontSize={"14px"}
                   onClick={!create?onDeleteItem:()=>setIsOpen(false)}
                  variant="ghost"
                  fontWeight={"light"}
                >
                  {!create ? `Delete Tab` : "Close Tab"}
                </Button>
                <Button
                  fontWeight={"light"}
                  fontSize={"14px"}
                  backgroundColor={"blue"}
                  mr={3}
                  ml={1}
                  onClick={!create?onSaveAndClose:addLayout}
                >
                  {!create ? `Save Changes` : "Create New Tab"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Tabs
            defaultIndex={0}
            onSelect={(index) => {
              // setTabId(layouts[index].id);
              setNewName(layouts[index].name);
              // setLayoutTabID(index);
            }}
          >
            {/* tab (custom layout) list */}
            <TabList className="border-0  mb-3">
          {!isLoading ? 
            layouts.map((data, i) => (
              <Tab
                onClick={() => {
                  setTabId(data.id);
                  setViewId(null);
                }}
                key={i}
                className={`dashboardTabs inline-block mr-4 py-2 px-12 mb-2 text-center min-width-150px md:px-3 cursor-pointer
                  ${size?.width >= 1208 && layouts?.length > 7
                    ? "compactDashboardTab"
                    : ""
                  }
                  ${size?.width >= 952 &&
                    size?.width < 1208 &&
                    layouts?.length > 5
                    ? layouts?.length < 8
                      ? "lgCompactDashTabBtw5to7"
                      : layouts?.length >= 8
                        ? "lgCompactDashTabBtw8to10 !pl-0 !pr-6"
                        : ""
                    : ""
                  }
                  ${size?.width >= 920 &&
                    size?.width < 952 &&
                    layouts?.length > 5
                    ? layouts?.length < 8
                      ? "lgCompactDashTabBtw5to7"
                      : layouts?.length >= 8
                        ? "lgSmallCompactDashTabBtw8to10 !pl-0 !pr-6"
                        : ""
                    : ""
                  }
                  ${size?.width >= 696 &&
                    size?.width < 920 &&
                    layouts?.length > 4
                    ? layouts?.length < 7
                      ? "mdCompactDashTabBtw4to7 !pl-0"
                      : layouts?.length >= 7
                        ? `mdCompactDashTabBtw8to10 !pl-0 !pr-2 ${size?.width >= 808 ? "mdLargeDashTabBtw8to10" : ""
                        }`
                        : ""
                    : ""
                  }`}
              >
                <Tooltip
                  label={data.name}
                  placement="bottom"
                  className="mt-2"
                >
                  <span
                    className={`${size?.width >= 1208 && layouts?.length > 7
                        ? "dashboardLayoutName"
                        : ""
                      } layoutName`}
                  >
                    
                    {data.name}
                      
                      
                  </span>
                </Tooltip>
                <img
                  className="absolute top-[6px] right-3.5 hidden editIcon"
                  src={require("../assets/editPencil.png")}
                  width={15}
                  height={15}
                  alt="edit"
                  onClick={() => {
                    setCreate(false);
                    onOpen();
                  }}
                />
              </Tab>
            ))
           : (
            <>
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"   />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"  />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"  />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"  />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"   />
          
            </>)}
         
              {/* Add custom layout */}
          {!isLoading ? <AddLayoutBtn /> : <></>}
            </TabList>

        {/* tab content */}
        
        {layouts.map((data, i) => (
          <TabPanel key={i}>
            <CustomGridLayout
              layout={data}
              layoutStyleInitialItemsLength={layoutStyleInitialItemsLength}
            />
          </TabPanel>
        ))}
          
          </Tabs>
        </div>     
  );
};

export default requireAuth(Dashboard);
