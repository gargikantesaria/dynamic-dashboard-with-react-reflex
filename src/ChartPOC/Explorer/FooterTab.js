import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";
import minimiseIcon from "../../assets/Footer_tab/minimise.svg";
import terminalBoxIcon from "../../assets/Footer_tab/terminal_box.svg";
import Portfolio from "../../Dashboard/ExplorerComponents/Portfolio";
import Transactions from "../../Dashboard/ExplorerComponents/Transactions";
import TopCounterparties from "../../Dashboard/ExplorerComponents/TopCounterparties";
import Neutrino from "../../Dashboard/ExplorerComponents/Neutrino";
import { Address } from "../../atoms";
import { useAtom } from "jotai";
// import Image from "next/image";

export default function FooterTab(props) {
  const [active, setActive] = useState(0);
  const [address] = useAtom(Address);
  
  const defaultIdx = address.length===0 ? -1 : 0;
  console.log(address, defaultIdx);
  //   const [state, setState] = useState(-1);
  // console.log(active);
  return (
    <Box
      overflow="hidden"
      mt={2}
      //   overflow={"hidden"}
      borderRadius={6}
      borderWidth={1}
      border={"gray.tabB"}
      h={"100%"}
      minH="40px"
    >
      <Tabs index={active} variant="unstyled">
        <TabList background={"gray.background"}>
          <Flex
            color={"gray.100"}
            py={0}
            w="100%"
            justifyContent={"space-between"}
          >
            <Flex w={"615px"}>
              <Tab
                onClick={() => {
                  setActive(0);
                }}
                _selected={{ color: "white", bg: "blue" }}
                fontSize={"14px"}
              >
                Transaction
              </Tab>
              <Tab
                onClick={() => {
                  setActive(1);
                }}
                _selected={{ color: "white", bg: "blue" }}
                fontSize={"14px"}
              >
                Portfolio
              </Tab>
              <Tab
                onClick={() => {
                  setActive(2);
                }}
                _selected={{ color: "white", bg: "blue" }}
                fontSize={"14px"}
              >
                Top CounterParties
              </Tab>
              <Tab
                onClick={() => {
                  setActive(3);
                }}
                _selected={{ color: "white", bg: "blue" }}
                fontSize={"14px"}
              >
                Neutrino
              </Tab>
            </Flex>
            <Flex justifyItems={"center"}>
              <img
                onClick={() => {
                  setActive(-1);
                  props.onMinimizeClicked();
                }}
                className="icon"
                alt="minimise"
                src={minimiseIcon}
                width={14}
                style={{ marginTop: "8px" }}
                height={14}
              />
              <img
                onClick={() => {
                  setActive(-1);
                  props.onMaximizeClicked();
                }}
                className="icon"
                alt="maximise"
                src={terminalBoxIcon}
                width={14}
                style={{ marginInline: "12px" }}
                height={14}
              />
            </Flex>
          </Flex>
        </TabList>
        <TabPanels background={"black.300"}>
          <TabPanel
            minH={250}
            style={{ height: "calc(100vh - 15.6vh)" }}
            backgroundColor="black.50"
          >
            <Transactions setActive={setActive} />
          </TabPanel>
          <TabPanel
            minH={250}
            style={{ height: "calc(100vh - 15.6vh)" }}
            backgroundColor="black.50"
          >
            {/* <p>two!</p> */}
            <Portfolio />
          </TabPanel>
          <TabPanel
            minH={250}
            style={{ height: "calc(100vh - 15.6vh)" }}
            backgroundColor="black.50"
          >
            {/* <p>two!</p> */}
            <TopCounterparties />
          </TabPanel>
          <TabPanel
            minH={250}
            style={{ height: "calc(100vh - 15.6vh)" }}
            backgroundColor="black.50"
          >
            {/* <p>two!</p> */}
            <Neutrino />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
