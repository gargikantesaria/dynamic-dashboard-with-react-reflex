import React, { useMemo } from "react";
import Table from "../ReusableComponents/Table";
import convertToInternationalCurrencySystem from "../utils/utils";
import { Box, Flex, HStack } from "@chakra-ui/react";
import PortfolioPiechart from "./PortfolioPiechart";
import {
  useCounterPartiesData,
  useExchangeUsageData,
} from "../../queries/hooks";
import { Address } from "../../atoms";
import { useAtom } from "jotai";
import exchangeAddressData from "../utils/exchangeAddressData";
import ExUsageWithdrawlsPiechart from "./Components/ExUsageWithdrawlsPiechart";
import ExUsageDepositsPiechart from "./Components/ExUsageDepositsPiechart";

const TopCounterparties = () => {
  const [address] = useAtom(Address);

  const counterpartiesData = useCounterPartiesData(address);
  const exchnageUsageData = useExchangeUsageData(address);
  function calculatePieData(object) {
    const depostiData = object
      ? Object.entries(object.deposits).map((item) => ({
          name: item[0],
          value: item[1],
        }))
      : { name: "", value: 0 };
    const withdrawsData = object
      ? Object.entries(object.withdraws).map((item) => ({
          name: item[0],
          value: item[1],
        }))
      : { name: "", value: 0 };
    //--------------
    let array1 = [];
    let array2 = [];

    if (depostiData.length > 5) {
      let dummyHash = { other: 0 };
      depostiData.map((el, i) => {
        if (i < 4) {
          array1.push(el);
        } else {
          dummyHash.other += el.value;
        }
      });
      array1.push({
        name: Object.keys(dummyHash)[0],
        value: Object.values(dummyHash)[0],
      });
    } else {
      depostiData.map((el) => {
        array1.push(el);
      });
    }
    if (withdrawsData.length > 5) {
      let dummyHash = { other: 0 };
      withdrawsData.map((el, i) => {
        if (i < 4) {
          array2.push(el);
        } else {
          dummyHash.other += el.value;
        }
      });
      array2.push({
        name: Object.keys(dummyHash)[0],
        value: Object.values(dummyHash)[0],
      });
    } else {
      withdrawsData.map((el) => {
        array2.push(el);
      });
    }

    return [array1, array2];
  }

  const PieData =
    address &&
    exchnageUsageData?.isFetched &&
    exchnageUsageData?.data?.exchange_daily_bal
      ? calculatePieData(exchnageUsageData?.data?.exchange_daily_bal)
      : [];

  const TableData =
    address &&
    counterpartiesData?.isFetched &&
    counterpartiesData?.data?.counterparties
      ? Object.entries(counterpartiesData?.data?.counterparties)?.map((e) => ({
          address: e[0],
          transaction: e[1]["txn_count"]?.toFixed(),
          value: e[1]["total_value"]?.toFixed(3),
        }))
      : {};
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => (
          <div className="flex pl-2">
            {row.address in exchangeAddressData ? (
              <div className="flex">
                <img
                  src={exchangeAddressData[row.address]?.[1]}
                  className="h-4 mr-2 rounded-full"
                  alt="icon"
                />
                {exchangeAddressData[row.address]?.[0]}{" "}
              </div>
            ) : (
              row.address
            )}
          </div>
        ),
        id: "address",
        // muiTableBodyCellCopyButtonProps: {
        //   fullWidth: true,
        //    sx: { justifyContent: 'flex-start' },
        // },
        minSize: 80,
        size: 150,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
        header: "ENTITY",
      },
      {
        accessorFn: (row) => (
          <div className="text-grayText">
            {convertToInternationalCurrencySystem(row.transaction)}
          </div>
        ),
        id: "transaction",
        header: "TX",

        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
      },

      {
        accessorFn: (row) => (
          <div className="pl-4 mr-1">{`${convertToInternationalCurrencySystem(
            row.value
          )}`}</div>
        ),
        id: "value",
        header: "USD",

        muiTableHeadCellProps: {
          align: "right",
          // sx: {
          //   marginRight: "10px",
          // },
        },
        muiTableBodyCellProps: {
          align: "right",
        },
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
    <Box>
      {address &&
      counterpartiesData?.isLoading &&
      exchnageUsageData?.isLoading ? (
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
      ) : counterpartiesData?.isSuccess && exchnageUsageData?.isSuccess ? (
        <HStack spacing={4} alignItems="flex-start">
          <Box w="50%">
            <Table data={TableData} columns={columns} />
          </Box>
          <Box w="50%">
            {/* <PortfolioPieTable /> */}
            <Flex flexDir={"column"} height={"calc(100vh - 178px)"}>
              {/* dehggcdefcdgce */}
              <Box h={"50%"} mb={4} borderColor={"white.100"} borderWidth={1}>
                <ExUsageDepositsPiechart
                  data={
                    PieData[0]?.length
                      ? PieData[0]
                      : [{ name: "No tokens", value: 0 }]
                  }
                />
              </Box>
              <Box h={"50%"} borderColor={"white.100"} borderWidth={1}>
                <ExUsageWithdrawlsPiechart
                  data={
                    PieData[1]?.length
                      ? PieData[1]
                      : [{ name: "No tokens", value: 0 }]
                  }
                />
              </Box>
            </Flex>
          </Box>
        </HStack>
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

export default TopCounterparties;
