import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { v4 as uuidV4 } from "uuid";
import requireAuth from "./auth/requireAuth";
import { Skeleton, Tooltip, useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { GlobalScreener,HEADER,SIDEBAR} from "../atoms";
import { useNavigate } from "react-router-dom";
import { useGetMetricOptions,  useScreenerQuery } from "../queries/mutation";
import addIcon from "../assets/add_icon.png"
import editPencil from "../assets/editPencil.png"
import {
  useDeleteScreener,
  useGetScreener,
  usePostScreener,
  useUpdateScreener,
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
  Select,
} from "@chakra-ui/react";
import CustomScreenerLayout from "../Dashboard/Screener/CustomScreenerLayout";


const Screener = () => {
  const navigate = useNavigate();
  
  //skeleton
  const [isLoading, setIsLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editState, setEditState] = useState(false);
  const [screenerTabID, setScreenerTabID] = useState(0);
  const [screenerCollection, setScreenerCollection] = useAtom(GlobalScreener);
  const [currentScreener, setCurrentScreener] = useState(
    screenerCollection[screenerTabID]
  );
  
  const [size,setSize] = useState({width:null,height:null})
  const [screenerName, setScreenerName] = useState(
    screenerCollection[screenerTabID].name
  );
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  let SetConfig = () => {
    setSideBar(true);
    setHeader(true);
  }
useEffect(() => {
  SetConfig()
}, []);
const toast = useToast({
  containerStyle: {
    color: "white",
  },
});
  
useEffect(() => {
  function handleResize() {
    setSize({ width: window.innerWidth, height: window.innerHeight });   
  }
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  
  const [metricOptions, setMetricOptions] = useState([]);
  const [selectedMetricConfig, setSelectedMetricConfig] = useState([{name : "", fields:{}}]);
  const [queryResult, setQueryResult] = useState([]);


  const onChangeScreener = () => {
    const editedConfig = {};
    selectedMetricConfig.forEach((metric,i)=> {
      editedConfig[metric.name]={fields:metric?.fields}
    })
    let postData = {config:editedConfig,layout_id:currentScreener.id,name:screenerName};
    let selectedScreenerData = currentScreener;
    selectedScreenerData.name = screenerName;
    selectedScreenerData.config = editedConfig;
    setCurrentScreener(selectedScreenerData);
    setScreenerCollection([
      ...screenerCollection?.slice(0, screenerTabID),
      selectedScreenerData,
      ...screenerCollection?.slice(screenerTabID + 1),
    ]);
    mutatePatchScreener.mutateAsync(postData);
    const query = { config: editedConfig }
    console.log("Query",query)
    mutateScreenerQuery.mutateAsync(query)
  };

  // console.log(screenerCollection,selectedMetricConfig);

  const addScreener = () => {
    if (screenerCollection.length < 7) {
      let screenerCollectionLength = screenerCollection.length;
      setSelectedMetricConfig([{name : "", fields:{}}])
      const newScreenerObject = {
        layout_config: {},
        layout_type:"screener",
        name: `Screener${uuidV4().slice(0, 2)}`,
      };


      const postData = {
          layout_config: {},
          layout_type:"screener",
          layout_name: newScreenerObject.name,
        }    
      
        setScreenerCollection(() => {
          return [...screenerCollection, newScreenerObject];
        });
        setScreenerTabID(screenerCollectionLength);
        setScreenerName(newScreenerObject.name);
        mutatePostScreener.mutateAsync(postData);
        onOpen();
      }   
  };

  const onScreenerSave = () => {
    saveToLS("screener", screenerCollection);
  };
  
 
  const mutateDeleteScreener = useDeleteScreener({
    onSuccess: (data) => {
      console.log("del", data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const mutateGetScreener = useGetScreener({
    onSuccess: (data) => {
      setScreenerCollection(data);
      setIsLoading(false);
      setSelectedMetricConfig(() => {
          return Object.keys(data[screenerTabID].config)
          .map((metric,i) => {
            return {
              name:metric,
              fields:data[screenerTabID]?.config[metric]?.fields
              }
            }
          )
        }
      );
      // console.log("mutate", data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const mutateGetMetricOptions = useGetMetricOptions({
    onSuccess: (data) => {
      setMetricOptions(data.metrics)
      // console.log("mutate", data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const mutateScreenerQuery = useScreenerQuery({
    onSuccess: (data) => {
      console.log("mutate", data);
      setQueryResult(data.tokens);
    },
    onError: (e) => {
      console.log(e);
      setQueryResult([]);
    },
  });
  const mutatePostScreener = usePostScreener({
    onSuccess: (data) => {
      // console.log(data);
      setCurrentScreener(data.layouts)
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const mutatePatchScreener = useUpdateScreener({
    onSuccess: (data) => {
      // console.log("patch", data);
    },
    onError: (e) => {
      console.log(e);
    },
  });



  const onOpen = () => {
    setEditState(!editState);
    setEditOpen(true);
  };
  const onClose = () => {
    setEditOpen(false);
  };
  const onSaveAndClose = () => {
    if (screenerName.includes(' ')) {
      toast({
        title: "Screener Name",
        description: "Space not allowed in Screener name!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      onChangeScreener();
      setEditOpen(false);
    }   
  };
  const onDeleteItem = () => {
    let tabIndex = screenerTabID;
    let initialLength = screenerCollection.length;
    let screenerID = currentScreener.id;
    if (initialLength - 1 == tabIndex) {
      setScreenerName(screenerCollection[screenerTabID - 1].name);
      setCurrentScreener(screenerCollection[screenerTabID - 1]);
    } else {
      setScreenerName(screenerCollection[screenerTabID + 1].name);
      setCurrentScreener(screenerCollection[screenerTabID + 1]);
    }
    setScreenerCollection([
      ...screenerCollection?.slice(0, tabIndex),
      ...screenerCollection?.slice(tabIndex + 1),
    ]);
    if (tabIndex == initialLength - 1) {
      setScreenerTabID(tabIndex - 1);
    }
    mutateDeleteScreener.mutateAsync( screenerID);
    // setEditState(!editState);
    setEditOpen(false);
  };

  // for add screener button
  const AddScreenerBtn = () => {
    return (
      <Tooltip
        label={
          screenerCollection?.length < 7
            ? "Add Screener"
            : "Add Screener limit exceeded"
        }
      >
        <button
          className="dashboardTabs inline-block py-2 px-1 relative top-1 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => {
            addScreener();
          }}
          disabled={screenerCollection?.length < 7 ? false : true}
        >
          <img
            className=""
            src={addIcon}
            width={15}
            height={15}
            alt="add-layout"
          />
        </button>
      </Tooltip>
    );
  };


  const getInitialState = () => {
    setIsLoading(true)
    mutateGetScreener.mutateAsync();
    mutateGetMetricOptions.mutateAsync();
    const query = {config:screenerCollection[screenerTabID].config}
    mutateScreenerQuery.mutateAsync(query)
  };
  useEffect(() => {
    getInitialState();
  }, []);

  useEffect(() => {
    onScreenerSave();
  }, [screenerCollection, setScreenerCollection]);


  const addStudy = () => {
    const defaultStudy = {name : "", fields:{}};
    const newSelectedMetricConfig = [...selectedMetricConfig, defaultStudy];
    setSelectedMetricConfig(() => {return newSelectedMetricConfig});
  }
  const deleteStudy = (idx) => {
    const newSelectedMetricConfig = selectedMetricConfig.filter((_,i)=>{
      return (idx!==i);
    });
    // newSelectedMetricConfig.push(defaultStudy);
    setSelectedMetricConfig(() => {return newSelectedMetricConfig});
  }
  const setMetricConfigType = (idx,name) => {
    const newSelectedMetricConfig = [...selectedMetricConfig];
    newSelectedMetricConfig[idx].name = name;
    newSelectedMetricConfig[idx].fields = {};
    setSelectedMetricConfig(() => {return newSelectedMetricConfig});
  } 

  const addCondition = (name,idx) => {
    
    const newSelectedMetricConfig = [...selectedMetricConfig];
    const possibleField = metricOptions.find(metric => {
      return name === Object.keys(metric)[0];
    })[name]['fields'][0]
    // newSelectedMetricConfig[idx].fields[possibleField]={low_range:'0',high_range:'0'};
    newSelectedMetricConfig[idx].fields[""]={low_range:'0',high_range:'0'};
    setSelectedMetricConfig(() => {return newSelectedMetricConfig});
  }

  const setMetricField = (idx,newField,prevField) => {
    const newSelectedMetricConfig = [...selectedMetricConfig];
    delete newSelectedMetricConfig[idx].fields[prevField];
    newSelectedMetricConfig[idx].fields[newField]={low_range:'0',high_range:'0'};
    setSelectedMetricConfig(() => {return newSelectedMetricConfig});
  }

  const setConfigInput = (fieldParameter,parameterValue,metricIdx,fieldName) => {
    const newSelectedMetricConfig = [...selectedMetricConfig];
    newSelectedMetricConfig[metricIdx].fields[fieldName][fieldParameter] = parameterValue;
    setSelectedMetricConfig(() => {return newSelectedMetricConfig});
  }
  
  return (
    <div className="screener-page">
      <Modal isCentered isOpen={editOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          background={"rgba(33, 33, 36, 0.67)"}
          maxWidth={700}
          color={"white"}
          backgroundColor={"gray.glass"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mt-1 mb-7">
            <Input
              className="mb-5"
              fontSize={"16px"}
              onChange={(e) => {
                setScreenerName(e.target.value);
              }}
              value={screenerName}
              variant={"unstyled"}
              placeholder="Name New Screener..."
            />
            <Button
              onClick={addStudy}
              className="m-3 ml-0"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                fontSize: "12px",
                color: "#B7B7B7",
                width: "100px",
                height: "24px",
                padding: "0px 8px",
              }}
            >
              Add a Study
            </Button>
            {selectedMetricConfig.map((data,i)=>{
              return <div key={i} style={{borderColor : "rgba(255, 255, 255,0.1)", borderWidth:"2px", padding:"5px", marginBottom:"5px" }}>
                <div style={{ color: "#B7B7B7", fontSize: "12px" }}>
                  Choose a Study:
                  <Select
                    width={"30%"}
                    size={"12px"}
                    lineHeight={"250%"}
                    bg="rgba(255, 255, 255, 0.04)"
                    borderColor="rgba(255, 255, 255, 0.04)"
                    color="white"
                    variant="filled"
                    className="mt-3 mb-3 pl-2"
                    onChange={(e)=>{setMetricConfigType(i,e.target.value)}}
                    value={data.name}
                  >
                    <option
                      style={{
                        color: "#B7B7B7",
                        fontSize: "12px",
                        background: "rgba(33, 33, 36, 0.67)",
                      }}
                      value={""}
                    >
                      {""}
                    </option>
                    {metricOptions.map((m_data,i) => {
                      return  <option
                      style={{
                        color: "#B7B7B7",
                        fontSize: "12px",
                        background: "rgba(33, 33, 36, 0.67)",
                      }}
                      value={Object.keys(m_data)[0]}
                    >
                      {Object.keys(m_data)[0]}
                    </option>
                    })}
                    
                  </Select>
                </div>
                <div style={{ color: "#B7B7B7", fontSize: "12px" }}>
                  Conditions 
                  <Button
                    className="m-3"
                    isDisabled={data.name.length==0}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      fontSize: "12px",
                      color: "#B7B7B7",
                      width: "100px",
                      height: "24px",
                      padding: "0px 8px",
                    }}
                    onClick={()=>{addCondition(data?.name,i)}}
                  >
                    Add condition
                  </Button>
                  {Object.keys(data?.fields).map((fieldName,field_i) => {
                    return <div
                      key={field_i}
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Select
                        width={"25%"}
                        size={"12px"}
                        lineHeight={"250%"}
                        bg="rgba(255, 255, 255, 0.04)"
                        borderColor="rgba(255, 255, 255, 0.04)"
                        color="white"
                        variant="filled"
                        className="mt-3 mb-3 pl-2"
                        onChange={(e)=>{setMetricField(i,e.target.value,fieldName)}}
                        value={fieldName}
                      >
                        <option
                          style={{
                            color: "#B7B7B7",
                            fontSize: "12px",
                            background: "rgba(33, 33, 36, 0.67)",
                          }}
                          value={""}
                        >
                          {""}
                        </option>
                        {metricOptions.length>0 && metricOptions
                          .find(ele => Object.keys(ele)[0]==data.name)[data.name]
                          ?.fields.map((field,f_i)=>{
                            return <option
                              style={{
                                color: "#B7B7B7",
                                fontSize: "12px",
                                background: "rgba(33, 33, 36, 0.67)",
                              }}
                              value={field}
                            >
                              {field}
                            </option>
                          })}

                      </Select>
                      <Input value={selectedMetricConfig[i]?.fields[fieldName]["low_range"]} onChange={(e)=>{setConfigInput("low_range",e.target.value,i,fieldName)}} className="pl-2" size={"12px"} lineHeight={"250%"} width={"25%"} placeholder={"Lower Range"}></Input>
                      <Input value={selectedMetricConfig[i]?.fields[fieldName]["high_range"]} onChange={(e)=>{setConfigInput("high_range",e.target.value,i,fieldName)}} className="pl-2" size={"12px"} lineHeight={"250%"} width={"25%"} placeholder={"Higher Range"}></Input>
                      
                    </div>
                  })}
                </div>
                <Button
                  className="m-3 ml-0"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    fontSize: "12px",
                    color: "#B7B7B7",
                    width: "100px",
                    height: "24px",
                    padding: "0px 8px",
                  }}
                  onClick={()=>{deleteStudy(i)}}
                >
                  Delete Study
                </Button>

              </div>
            })}
            
          </ModalBody>

          <ModalFooter backgroundColor={"gray.stroke"} className="p-4 rounded">
            <Button
              color={"gray.200"}
              fontSize={"14px"}
              onClick={onDeleteItem}
              variant="ghost"
              fontWeight={"light"}
            >
              Delete Tab
            </Button>
            <Tooltip
              label={
                screenerName.length === 0
                  ? "Please enter a valid name"
                  : "Save Changes"
              }
            >
              <Button
                isDisabled={screenerName.length === 0}
                fontWeight={"light"}
                fontSize={"14px"}
                backgroundColor={"blue"}
                mr={3}
                ml={1}
                onClick={onSaveAndClose}
              >
                Save Changes
              </Button>
            </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Tabs
        selectedIndex={screenerTabID}
        onSelect={(index) => {
          setScreenerName(screenerCollection[index].name);
          setCurrentScreener(screenerCollection[index]);
          setScreenerTabID(index);
          setSelectedMetricConfig(() => {
          return Object.keys(screenerCollection[index].config)
          .map((metric,i) => {
            return {
              name:metric,
              fields:screenerCollection[index].config[metric]?.fields
              }
            }
          )
        }
        );
        mutateScreenerQuery.mutateAsync( {config:screenerCollection[index].config})
        }}
      >
        {console.log(size,"size")}
        {/* tab (custom screener) list */}
        <TabList className="border-0 mb-3">
        {!isLoading ? screenerCollection.map((data, i) => (
            <Tab
              key={i}
              className={`dashboardTabs inline-block mr-4 py-2 px-12 mb-2 text-center min-width-150px md:px-3 cursor-pointer
              ${
                size?.width >= 1208 && screenerCollection?.length > 7
                  ? "compactDashboardTab"
                  : ""
              }
              ${
                size?.width >= 952 &&
                size?.width < 1208 &&
                screenerCollection?.length > 5
                  ? screenerCollection?.length < 8
                    ? "lgCompactDashTabBtw5to7"
                    : screenerCollection?.length >= 8
                    ? "lgCompactDashTabBtw8to10 !pl-0 !pr-6"
                    : ""
                  : ""
              }
              ${
                size?.width >= 920 &&
                size?.width < 952 &&
                screenerCollection?.length > 5
                  ? screenerCollection?.length < 8
                    ? "lgCompactDashTabBtw5to7"
                    : screenerCollection?.length >= 8
                    ? "lgSmallCompactDashTabBtw8to10 !pl-0 !pr-6"
                    : ""
                  : ""
              }
              ${
                size?.width >= 696 &&
                size?.width < 920 &&
                screenerCollection?.length > 4
                  ? screenerCollection?.length < 7
                    ? "mdCompactDashTabBtw4to7 !pl-0"
                    : screenerCollection?.length >= 7
                    ? `mdCompactDashTabBtw8to10 !pl-0 !pr-2 ${
                        size?.width >= 808 ? "mdLargeDashTabBtw8to10" : ""
                      }`
                    : ""
                  : ""
              }`}
            >
               <span
                      className={`${
                        size?.width >= 1208 && screenerCollection?.length > 7
                          ? "dashboardLayoutName"
                          : ""
                      } layoutName`}
                    >
                      {data.name}
                    </span>
              {/* {data.name} */}
              <img
                className="absolute right-3.5 hidden editIcon"
                src={editPencil}
                width={15}
                height={15}
                alt="edit"
                onClick={() => {
                  onOpen();
                }}
              />
            </Tab>
          )) : (
            <>
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"   />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"  />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"  />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"   />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"  />
              <Skeleton className="dashboardTabs inline-block mr-4 py-3 px-12 mb-2 text-center min-width-150px"   />
          
            </>)}

          {/* Add custom layout */}
          {!isLoading ?<AddScreenerBtn />: <></>}
          
        </TabList>

        {/* tab content */}
        {screenerCollection.map((data, i) => (
          <TabPanel key={i}>
            <CustomScreenerLayout i={i} ID={screenerTabID} data={data} tokenData={queryResult}/>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default requireAuth(Screener);

// save to local storage
function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "screener",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
