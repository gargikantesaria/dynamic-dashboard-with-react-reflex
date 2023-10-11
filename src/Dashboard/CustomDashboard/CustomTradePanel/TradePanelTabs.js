import React, { useEffect, useState } from "react";
import arrow from "../../../assets/arrow_down.svg";
import {
  useAccounts,
  useAssetsData,
  useCommandsData,
} from "../../../queries/hooks";
import { useAtom } from "jotai";
import "./TradePanelTabs.css";
import AutocompleteDropdown from "../../ReusableComponents/Autocomplete";
import { useSendAllCommandData } from "../../../queries/mutation";
import { OPENORDERSTOKEN, STUB } from "../../../atoms";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import terminalBoxIcon from "../../../assets/Footer_tab/terminal_box.svg";
import closeOutlineIcon from "../../../assets/Footer_tab/close_outline.svg";
import refreshIcon from "../../../assets/refreshcircle.svg";
import closeSquareIcon from "../../../assets/closesquare.svg";
import sendAllIcon from "../../../assets/send.png";

export function TradePanelTabs({
  children,
  handleRefreshData,
  onCloseAllPositions,
  onCloseAllOrders,
  handleChangeActiveTab,
  positionDataLoading,
  openOrderDataLoading,
  balanceDataLoading,
  commandsDataLoading,
  isLoadingCloseAll,
}) {
  const [stub, setStub] = useAtom(STUB);
  const [ordersToken, setOrdersToken] = useAtom(OPENORDERSTOKEN);
  const { data, status } = useAccounts();
  const { data: CommandsData } = useCommandsData();
  const assetData = useAssetsData(stub);

  const [mainDropdown, setMainDropdown] = useState(false);
  const [stubName, setStubName] = useState("Stub");

  let stubArr = [];
  let assetsArr = [];
  console.log(assetData);

  status === "success" &&
    Object.entries(data?.data).map((el, i) => stubArr.push(el[1]?.stub));
  // ------------------------------------------
  assetData?.isFetched &&
    Object.entries(assetData?.data?.data).map((el) =>
      assetsArr.push(el[1]?.symbol)
    );
  // console.log(stubArr);
  function findActiveTab(a) {
    return a.reduce((accumulator, currentValue, i) => {
      if (currentValue.props.active) {
        return i;
      }
      return accumulator;
    }, 0);
  }

  function tabValidator(tab) {
    return tab.type.displayName === "Tab" ? true : false;
  }

  console.log(assetsArr);

  const [activeTab, setActiveTab] = useState(findActiveTab(children));

  useEffect(() => {
    handleChangeActiveTab(activeTab);
  }, [activeTab, handleChangeActiveTab]);

  const mutationSendAllCommand = useSendAllCommandData();

  const onSendAllCommand = () => {
    if (CommandsData && CommandsData.length > 0) {
      const sendAllData = [
        "ptbot",
        CommandsData.map((el) => el.command.slice(6)).join(" \n "),
      ].join(" ");
      mutationSendAllCommand.mutateAsync({
        sendAllCommand: sendAllData,
      });
    }
  };

  return (
    <>
      <div className="flex tabs w-full items-center pb-2 text-sm ">
        {children.map((item, i) => {
          return (
            <div className="relative" key={i}>
              {tabValidator(item) && (
                <Tab
                  key={`tab-{i}`}
                  currentTab={i}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  {item.props.children}
                </Tab>
              )}
            </div>
          );
        })}

        <div className="flex pl-2 py-2 ml-auto">
          {activeTab !== 3 ? (
            <Box
              bg="white.50"
              borderRadius="6px"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
              minWidth="111px"
              className="flex justify-center mr-4"
            >
              <button className="px-3 py-1 flex table-tab-btn font-normal">
                {" "}
                <div className="relative">
                  <div
                    className="  border-0  items-center justify-between pl-2 flex rounded relative    cursor-pointer  w-full"
                    onClick={() => {
                      setMainDropdown(!mainDropdown);
                    }}
                  >
                    <span className="text-sm text-[#B7B7B7] t pr-3">
                      {stubName}
                    </span>
                    <span className={`${mainDropdown ? "rotate-180" : ""} w-5`}>
                      <img src={arrow} alt=" " className="w-5" />
                    </span>
                  </div>
                  <div
                    className=" absolute  z-10   top-7  left-[-20px] tabs-dropdown max-h-[180px] max-w-[200px]  rounded-md overflow-y-scroll"
                    style={
                      mainDropdown ? { display: "table" } : { display: "none" }
                    }
                  >
                    {stubArr.map((el, i) => {
                      return (
                        <div
                          className={`px-4 pt-1 pb-2 min-w-[140px] text-ellipsis whitespace-nowrap overflow-x-hidden tabs-dropdown-menu ${
                            i === 0 && stubArr?.length === 1
                              ? "rounded-md"
                              : i === 0
                              ? "rounded-t-md"
                              : i === stubArr?.length - 1
                              ? "rounded-b-md"
                              : ""
                          }`}
                          onClick={() => {
                            setStub(el);
                            setMainDropdown(false);
                            setStubName(el);
                          }}
                        >
                          {el}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </button>
            </Box>
          ) : (
            ""
          )}
          {activeTab === 1 ? (
            <AutocompleteDropdown
              options={assetsArr}
              onSelect={setOrdersToken}
            />
          ) : (
            <></>
          )}
          <Box
            position="relative"
            bg="white.50"
            borderRadius="6px"
            boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
            minWidth="111px"
            className="flex justify-center mr-4"
          >
            <button
              className={`px-3 py-1 flex table-tab-btn font-normal text-[#B7B7B7] ${
                positionDataLoading ||
                openOrderDataLoading ||
                balanceDataLoading ||
                commandsDataLoading
                  ? "invisible"
                  : ""
              }`}
              onClick={() => {
                handleRefreshData(activeTab);
              }}
            >
              Refresh{" "}
              <img className="w-5 ml-1" src={refreshIcon} alt="refresh" />{" "}
            </button>
            {(positionDataLoading ||
              openOrderDataLoading ||
              balanceDataLoading ||
              commandsDataLoading) && (
              <Spinner
                size={"sm"}
                color="#FFFFFF"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-8px",
                  marginLeft: "-8px",
                }}
              />
            )}
          </Box>

          {activeTab === 0 || activeTab === 1 ? (
            <Box
              position="relative"
              bg="white.50"
              borderRadius="6px"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
              minWidth="111px"
              className="flex justify-center mr-4"
            >
              <button
                className={`px-3 py-1 flex table-tab-btn font-normal text-[#B7B7B7] cursor-pointer ${
                  isLoadingCloseAll ? "invisible" : ""
                }`}
                onClick={() => {
                  activeTab === 0 ? onCloseAllPositions() : onCloseAllOrders();
                }}
              >
                Close all{" "}
                <img
                  className="w-4 ml-2"
                  style={{ marginTop: "2px" }}
                  src={closeSquareIcon}
                  alt=""
                />{" "}
              </button>
              {isLoadingCloseAll && (
                <Spinner
                  size={"sm"}
                  color="#FFFFFF"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-8px",
                    marginLeft: "-8px",
                  }}
                />
              )}
            </Box>
          ) : (
            <></>
          )}
          {activeTab === 3 ? (
            <Box
              bg="white.50"
              borderRadius="6px"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
              minWidth="111px"
              className="flex justify-center mr-4"
            >
              <button
                className={`px-3 py-1 flex table-tab-btn font-normal text-[#B7B7B7] cursor-pointer ${
                  !CommandsData || CommandsData?.data?.length === 0
                    ? "!cursor-not-allowed"
                    : ""
                } ${mutationSendAllCommand?.isLoading ? "invisible" : ""}`}
                onClick={onSendAllCommand}
                disabled={
                  !(CommandsData && CommandsData?.data?.length > 0) ||
                  mutationSendAllCommand?.isLoading
                    ? true
                    : false
                }
              >
                Send all{" "}
                <img
                  className="w-5 ml-1"
                  style={{ marginTop: "3px", marginBottom: "-3px" }}
                  src={sendAllIcon}
                  alt=""
                />{" "}
              </button>
              {mutationSendAllCommand?.isLoading && (
                <Spinner
                  size={"sm"}
                  color="#FFFFFF"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-8px",
                    marginLeft: "-8px",
                  }}
                />
              )}
            </Box>
          ) : (
            <></>
          )}
          {/* <Flex justifyItems={"center"}>
              <img
                className="icon"
                alt="terminalbox"
                src={terminalBoxIcon}
                width={14}
                height={14}
              />
              <img
                className="icon"
                alt="close"
                src={closeOutlineIcon}
                width={22}
                style={{ marginLeft: "12px" }}
                height={22}
              />
            </Flex> */}
        </div>
      </div>
      <div className=" w-full" style={{ height: "calc(100% - 45px)" }}>
        {children.map((item, i) => {
          return (
            <div
              key={i}
              className={` ${
                i === activeTab ? "visible h-[100%]" : "hidden h-[100%]"
              }`}
            >
              {item.props.component}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function Tab({ children, activeTab, currentTab, setActiveTab }) {
  return (
    <>
      <div
        className={`mr-3 min-w-[160px] py-1 px-3 text-sm relative flex flex-col cursor-pointer border-none text-center  
      ${
        activeTab === currentTab
          ? "text-[#FFFFFF] bg-[#1464FF] cursor-pointer rounded-lg"
          : "transition-all text-[#B7B7B7]"
      }`}
        onClick={() => setActiveTab(currentTab)}
      >
        {children}
      </div>
    </>
  );
}

Tab.displayName = "Tab";
