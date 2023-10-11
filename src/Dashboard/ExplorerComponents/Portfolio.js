import React, { useMemo } from "react";
import Table from "../ReusableComponents/Table";
import { Flex, Box, HStack, VStack } from "@chakra-ui/react";
import PortfolioPieTable from "./PortfolioPieTable";
import PortfolioPiechart from "./PortfolioPiechart";
// import { PortfolioColumns } from "../utils/utils";
import { useAtom } from "jotai";
import { useAvailableTokens, usePortfolioData } from "../../queries/hooks";
import { Address } from "../../atoms";
import tokenAddressList from "../utils/tokenAddressList";
import convertToInternationalCurrencySystem, {
  PortfolioPieTableColumns,
} from "../utils/utils";

const Portfolio = () => {
  const [walletAddress] = useAtom(Address);
  const portfolioData = usePortfolioData(walletAddress);
  const tokensData = useAvailableTokens();
  function calculatePieData(object) {
    const data = object
      ? Object.entries(object).map((item) => ({
          name: item[0],
          value: item[1]["value"],
        }))
      : {};
    //--------------
    let array1 = [];
    if (data.length > 5) {
      let dummyHash = { other: 0 };
      data.map((el, i) => {
        if (parseInt(el.value.toFixed(6)) > 0)
          if (i < 5) {
            array1.push(el);
          } else {
            dummyHash.other += el.value;
            // console.log(el.value.toFixed(6));
          }
      });
      array1.push({
        name: Object.keys(dummyHash)[0],
        value: Object.values(dummyHash)[0],
      });
    } else {
      data.map((el) => {
        array1.push(el);
      });
    }

    return array1;
  }
  const PieData =
    walletAddress && portfolioData?.isFetched && portfolioData?.data?.portfolio
      ? calculatePieData(portfolioData?.data?.portfolio)
      : [];
  const PortfolioColumns = useMemo(
    () => [
      {
        accessorFn: (row) => (
          <div className="flex pl-2">
            {row.asset === "eth" ? (
              <img
                src="https://d29fgp77ddnfv.cloudfront.net/tokens/ethereum.png "
                className="h-4 mr-4 rounded-full"
                alt=" "
              />
            ) : (
              <img
                src={tokenAddressList?.[row.address]?.[1]}
                className="h-4 mr-2 rounded-full"
                alt=" "
              />
            )}
            {row.asset.toUpperCase()}
            {/* {console.log(tokenAddressList?.[row?.address]?.[1])} */}
          </div>
        ),
        id: "asset",

        header: "Asset",
        size: 150,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorFn: (row) => (
          <div className="">
            {convertToInternationalCurrencySystem(row.holding)}
            <span className="text-gray-500 ml-2">
              {row.asset.toUpperCase()}
            </span>
          </div>
        ),
        id: "Holding",
        header: "Holding",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorFn: (row) => (
          <div className="">
            ${" "}
            {row.value / row.holding
              ? convertToInternationalCurrencySystem(row.value / row.holding)
              : "0.00"}
          </div>
        ),
        id: "Price",
        header: "Price",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorFn: (row) => (
          <div>{`$ ${convertToInternationalCurrencySystem(row.value)}`}</div>
        ),
        id: "value",
        header: "Value",
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
      },
    ],
    []
  );
  // console.log(portfolioData);

  const TableData =
    walletAddress && portfolioData?.isFetched && portfolioData?.data?.portfolio
      ? Object.entries(portfolioData?.data?.portfolio)?.map((e) => ({
          asset: e[0],
          holding: e[1]["holdings"],
          value: e[1]["value"],
          address: tokensData?.data?.tokens[e[0]]?.token_address,
        }))
      : [];

  if (!walletAddress) {
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
      {/* Portfolio */}
      {walletAddress && portfolioData.isLoading ? (
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
      ) : portfolioData?.isSuccess ? (
        <HStack spacing={4}>
          <Box w="50%">
            <Table columns={PortfolioColumns} data={TableData} />
          </Box>

          <Flex w={"50%"} flexDir={"column"} height={"calc(100vh - 178px)"}>
            {/* dehggcdefcdgce */}
            <Box h={"50%"} mb={4} borderColor={"white.100"} borderWidth={1}>
              <PortfolioPiechart data={PieData} />
            </Box>
            <Box h={"50%"} borderColor={"white.100"} borderWidth={1}>
              <PortfolioPieTable
                columns={PortfolioPieTableColumns}
                data={PieData}
                height="calc(100vh - 564px)"
              />
            </Box>
          </Flex>
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

export default Portfolio;
