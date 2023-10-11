import moment from "moment";
import React, { useMemo, useState } from "react";
import Table from "../ReusableComponents/Table";
import convertToInternationalCurrencySystem from "../utils/utils";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Box, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { Address } from "../../atoms";
import { useAtom } from "jotai";
import neutrinoIcon from "../../assets/neutrinoRedirectArrow.png";

import {
  useInflowTransactionsData,
  useOutflowTransactionsData,
  useTransactionsData,
} from "../../queries/hooks";
import tokenAddress from "../utils/tokenAddress";

const Transactions = ({ setActive }) => {
  const [address] = useAtom(Address);
  const [offset, setOffset] = useState(0);
  const [inflowOffset, setInflowOffset] = useState(0);
  const [outflowOffset, setOutflowOffset] = useState(0);
  const Data = useTransactionsData(address, offset);
  const InData = useInflowTransactionsData(address, inflowOffset);
  const OutData = useOutflowTransactionsData(address, outflowOffset);
  // console.log(address)
  const TransactionsData = Data?.data?.transactions
    ? Data?.data?.transactions.map((el) => ({
        time: moment
          .duration(
            moment(new Date().toISOString()).diff(
              moment(el.timestamp.replace(" ", "T") + "Z")
            )
          )
          .humanize(),
        // time:el[0],
        from: el.from_address,
        to: el.to_address,
        tokenAddress: el.token_address,
        value: el.value,
        usdValue: !el?.value_in_dollars
          ? "-"
          : el?.value_in_dollars?.toFixed(2),
      }))
    : [];
  const InflowTransactionsData = InData?.data?.transactions
    ? (InData?.data?.transactions).map((el) => ({
        time: moment
          .duration(
            moment(new Date().toISOString()).diff(
              moment(el.timestamp.replace(" ", "T") + "Z")
            )
          )
          .humanize(),
        // time:el[0],
        from: el.from_address,
        to: el.to_address,
        tokenAddress: el.token_address,
        value: el.value,
        usdValue: !el?.value_in_dollars
          ? "-"
          : el?.value_in_dollars?.toFixed(2),
      }))
    : [];
  const OutflowTransactionsData = OutData?.data?.transactions
    ? (OutData?.data?.transactions).map((el) => ({
        time: moment
          .duration(
            moment(new Date().toISOString()).diff(
              moment(el.timestamp.replace(" ", "T") + "Z")
            )
          )
          .humanize(),
        // time:el[0],
        from: el.from_address,
        to: el.to_address,
        tokenAddress: el.token_address,
        value: el.value,
        usdValue: !el?.value_in_dollars
          ? "-"
          : el?.value_in_dollars?.toFixed(2),
      }))
    : [];

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => (
          <div className="flex pl-2 text-[#1585ed]"> {row.time}</div>
        ),
        id: "time",
        // width: 200,
        size: 100,
        header: "TIME",
      },
      {
        accessorFn: (row) => `${row.from}`,
        id: "from",
        header: "FROM",
        enableClickToCopy: true,
      },
      {
        accessorFn: (row) => `${row.to}`,
        id: "to",
        header: "TO",
        enableClickToCopy: true,
      },
      {
        accessorFn: (row) => {
          let obj = tokenAddress?.find(
            (e) => e.token_address === row.tokenAddress
          );
          if (obj) {
            return (
              <div className="flex items-center">
                <img
                  className="w-[20px]  mx-3   rounded-full"
                  src={obj?.token_image}
                  alt=""
                />
                <div>{obj.token_name}</div>
              </div>
            );
          } else {
            return (
              <div className="flex items-center">
                {row.tokenAddress === "eth" ? (
                  <img
                    className="w-[20px]  mx-3 rounded-full"
                    src={
                      "https://d29fgp77ddnfv.cloudfront.net/tokens/ethereum.png"
                    }
                    alt="eth"
                  />
                ) : (
                  ""
                )}
                {row.tokenAddress === "eth" ? "ethereum" : row.tokenAddress}
              </div>
            );
          }
        },
        id: "tokenAddress",
        header: "TOKEN",
        enableClickToCopy: true,
        // width: 100,
        // size: 180,
      },
      {
        accessorFn: (row) =>
          `${convertToInternationalCurrencySystem(row.value)}`,
        id: "value",
        header: "VALUE",
        size: 100,
      },
      {
        accessorFn: (row) => (
          <div className="flex justify-between pr-4">
            {row.usdValue !== "-" ? (
              <>${convertToInternationalCurrencySystem(row.usdValue)}</>
            ) : (
              "-"
            )}

            <div>
              <img
                src={neutrinoIcon}
                className="h-6  bg-[#19191A] rounded-md hover:bg-[#1464FF] transition-all"
                alt=""
                onClick={() => {
                  setActive(3);
                }}
              />
            </div>
          </div>
        ),
        id: "usdvalue",
        header: "USD",
        size: 150,
      },
    ],
    []
  );
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
  return (
    <Box className="h-full">
      {address && Data?.isLoading && InData?.isLoading && OutData?.isLoading ? (
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
      ) : Data?.isSuccess && InData?.isSuccess && OutData?.isSuccess ? (
        <Tabs>
          <TabList className="border-0 mb-3 bg-[#2C2C30] rounded-md flex w-1/4 min-w-[400px]">
            <Tab className="w-3/6 alertStatusTabs">Transactions</Tab>
            <Tab className="w-3/6 alertStatusTabs">Inflow</Tab>
            <Tab className="w-3/6 alertStatusTabs">Outflow</Tab>
          </TabList>
          <TabPanel>
            <Table
              columns={columns}
              data={TransactionsData}
              height="calc(100vh - 213px)"
              setOffset={setOffset}
              type="transactions"
            />
          </TabPanel>
          <TabPanel>
            <Table
              columns={columns}
              data={InflowTransactionsData}
              height="calc(100vh - 213px)"
              setOffset={setInflowOffset}
              type="transactions"
            />
          </TabPanel>
          <TabPanel>
            <Table
              columns={columns}
              data={OutflowTransactionsData}
              height="calc(100vh - 213px)"
              setOffset={setOutflowOffset}
              type="transactions"
            />
          </TabPanel>
        </Tabs>
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
      )}
    </Box>
  );
};

export default Transactions;
