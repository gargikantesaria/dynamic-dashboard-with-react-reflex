import React from "react";
import convertToInternationalCurrencySystem from "../../utils/utils";
// moment
import { useAtom } from "jotai";
import { Address } from "../../../atoms";
import { Box, Flex, CloseButton } from "@chakra-ui/react";
import moment from "moment";
import tokenAddressList from "../../utils/tokenAddressList";

const NeutrinoPopup = ({ data, setNeutrinoData }) => {
  const [address] = useAtom(Address);

  //console.log(data[0]);
  const flexedData = data[0];
  return flexedData &&
    (address.toLocaleLowerCase() === flexedData?.to ||
      address.toLocaleLowerCase() === flexedData?.from) ? (
    <Box
      //   className="absolute z-10 bg-black border border-textGreen p-4 right-0"
      pos={"absolute"}
      zIndex="10"
      backgroundColor={"gray.glass"}
      borderColor="gray.stroke"
      padding={4}
      borderWidth={"1px"}
      borderRadius={"6px"}
      right={2}
      fontSize={"14px"}
      className="neutrinoPopup"
    >
      <Flex minW={96} justifyContent="space-between" mb={2}>
        <Box color={"gray.200"} className="neutrinoPopup">
          {flexedData?.date}
        </Box>
        <Flex alignItems={"center"}>
          <Box
            color={"blue"}
            fontWeight="semibold"
            mr={6}
            className="neutrinoPopup"
          >
            {moment
              .duration(
                moment(new Date().toISOString()).diff(
                  moment(flexedData?.date.replace(" ", "T") + "Z")
                )
              )
              .humanize() + " ago"}
          </Box>
          <CloseButton
            size="sm"
            onClick={() => {
              setNeutrinoData({});
            }}
          />
        </Flex>
      </Flex>
      <Box mb={3}>
        <Box color={"gray.200"} mb={2} className="neutrinoPopup">
          FROM
        </Box>
        <Box className="neutrinoPopup">{flexedData?.from}</Box>
      </Box>
      <Box mb={3}>
        <Box color={"gray.200"} mb={2} className="neutrinoPopup">
          FROM
        </Box>
        <Box className="neutrinoPopup">{flexedData?.to}</Box>
      </Box>
      <Flex justifyContent={"space-between"}>
        <Box textAlign={"left"}>
          <Box color={"gray.200"} mb={1} className="neutrinoPopup">
            TOKEN
          </Box>
          <Box className="neutrinoPopup">
            {console.log(tokenAddressList[flexedData?.token]?.[0])}
            {tokenAddressList[flexedData?.token]
              ? tokenAddressList[flexedData?.token]?.[0]
              : flexedData?.token.slice(0, 5)}
          </Box>
          {/* <Box className="neutrinoPopup">{flexedData?.token}</Box> */}
        </Box>
        <Box textAlign={"center"}>
          <Box color={"gray.200"} mb={1} className="neutrinoPopup">
            VALUE
          </Box>
          <Box className="neutrinoPopup">
            {convertToInternationalCurrencySystem(flexedData?.value)}
          </Box>
        </Box>
        <Box textAlign={"right"}>
          <Box color={"gray.200"} mb={1} className="neutrinoPopup">
            USD
          </Box>
          <Box className="neutrinoPopup">
            ${" "}
            {convertToInternationalCurrencySystem(flexedData?.value_in_dollar)}
          </Box>
        </Box>
      </Flex>
    </Box>
  ) : (
    <></>
  );
};

export default NeutrinoPopup;
