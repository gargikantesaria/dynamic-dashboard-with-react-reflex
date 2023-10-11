// import {
//   TabList,
//   Tabs,
//   Tab,
//   TabPanels,
//   TabPanel,
//   Box,
//   Text,
// } from "@chakra-ui/react";
// import { useAtom } from "jotai";

// import React, { useState } from "react";
// import { displayDropdown, selectedMetricInfo } from "../../atoms";

// export default function DropdownTab() {
//   const [display, setDisplay] = useAtom(displayDropdown);

//   const [selectedCategory, setSelectedCategory] = useState("all");
//   // const [selectedMetricDetails , setSelectedMetricDetails] = useAtom(selectedMetricInfo);

//   const TabData = [
//     {
//       name: "All",
//       slug: "all",
//       metric: [
//         {
//           name: "Thirty Days Return",
//           command: "30d",
//         },
//         {
//           name: "Circulation",
//           command: "circ",
//         },
//         {
//           name: "Volatility Indicator",
//           command: "vola",
//         },
//         {
//           name: "Realised Profit",
//           command: "realp",
//         },
//         {
//           name: "OI Market Capital Change",
//           command: "oic",
//         },
//       ],
//     },
//     // {
//     //   name: "Tara Metrics",
//     //   slug: "tara_meteics",
//     //   metric: [
//     //     {
//     //       name: "Thirty Days Return",
//     //       command: "30d",
//     //     },
//     //     {
//     //       name: "Circulation",
//     //       command: "circ",
//     //     },
//     //     {
//     //       name: "Volatility Indicator",
//     //       command: "vola",
//     //     },
//     //     {
//     //       name: "Realised Profit",
//     //       command: "realp",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //   ],
//     // },

//     // {
//     //   name: "Orderflow",
//     //   slug: "orderflow",
//     //   metric: [
//     //     {
//     //       name: "Thirty Days Return",
//     //       command: "30d",
//     //     },
//     //     {
//     //       name: "Circulation",
//     //       command: "circ",
//     //     },
//     //     {
//     //       name: "Volatility Indicator",
//     //       command: "vola",
//     //     },
//     //     {
//     //       name: "Realised Profit",
//     //       command: "realp",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //   ],
//     // },
//     // {
//     //   name: "OnChain",
//     //   slug: "onchain",
//     //   metric: [
//     //     {
//     //       name: "Thirty Days Return",
//     //       command: "30d",
//     //     },
//     //     {
//     //       name: "Circulation",
//     //       command: "circ",
//     //     },
//     //     {
//     //       name: "Volatility Indicator",
//     //       command: "vola",
//     //     },
//     //     {
//     //       name: "Realised Profit",
//     //       command: "realp",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //   ],
//     // },

//     // {
//     //   name: "Other",
//     //   slug: "other",
//     //   metric: [
//     //     {
//     //       name: "Thirty Days Return",
//     //       command: "30d",
//     //     },
//     //     {
//     //       name: "Circulation",
//     //       command: "circ",
//     //     },
//     //     {
//     //       name: "Volatility Indicator",
//     //       command: "vola",
//     //     },
//     //     {
//     //       name: "Realised Profit",
//     //       command: "realp",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //   ],
//     // },
//     // {
//     //   name: "Allocation Table",
//     //   slug: "allocation_table",
//     //   metric: [
//     //     {
//     //       name: "Thirty Days Return",
//     //       command: "30d",
//     //     },
//     //     {
//     //       name: "Circulation",
//     //       command: "circ",
//     //     },
//     //     {
//     //       name: "Volatility Indicator",
//     //       command: "vola",
//     //     },
//     //     {
//     //       name: "Realised Profit",
//     //       command: "realp",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //   ],
//     // },
//     // {
//     //   name: "Custom",
//     //   slug: "custom",
//     //   metric: [
//     //     {
//     //       name: "Thirty Days Return",
//     //       command: "30d",
//     //     },
//     //     {
//     //       name: "Circulation",
//     //       command: "circ",
//     //     },
//     //     {
//     //       name: "Volatility Indicator",
//     //       command: "vola",
//     //     },
//     //     {
//     //       name: "Realised Profit",
//     //       command: "realp",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //     {
//     //       name: "OI Market Capital Change",
//     //       command: "oic",
//     //     },
//     //   ],
//     // },
//   ];

//   // set selected metric details
//   const onSelectMetric = (metric) => {
//     // TO-DO : set other properties (if required) based on selected metric
//     // metric.category = selectedCategory;
//     // TO-DO : make it dynamic based on selected metric later
//     // metric.token = "bitcoin";
//     // metric.day = "14";
//     // setSelectedMetricDetails(metric);

//     // close search metrics
//     setDisplay(false);
//   };

//   return (
//     <Tabs mt={"10px"} variant="unstyled" isLazy>
//       <TabList w={"93%"} bgColor="black.400" className="rounded-lg ">
//         {TabData.map((TabName) => {
//           return (
//             <Tab
//               margin={"1px"}
//               w="180px"
//               alignItems={"center"}
//               display={"flex"}
//               justifyContent="center"
//               fontSize={"10px"}
//               color="#b7b7b7"
//               paddingBlock={"4px"}
//               _selected={{
//                 color: "white",
//                 bg: "white.200",
//                 borderRadius: "8px",
//               }}
//               onClick={() => {
//                 setSelectedCategory(TabName.slug);
//               }}
//             >
//               {TabName.name}
//             </Tab>
//           );
//         })}
//       </TabList>
//       <TabPanels mb="15px">
//         {TabData.map((Tab) => (
//           <TabPanel
//             p="0px"
//             className="leftFlow"
//             overflowY={"scroll"}
//             maxHeight={"290px"}
//           >
//             {Object.values(Tab.metric).map((metric) => (
//               <Box
//                 w={"93%"}
//                 color="gray.100"
//                 _hover={{ bgColor: "white.100" }}
//                 className="pl-3 rounded-md mt-2 py-2 "
//                 onClick={() => {
//                   onSelectMetric(metric);
//                 }}
//               >
//                 <Text className="px-[2px]" fontSize={"12px"}>
//                   {metric.name}
//                 </Text>
//                 <Box className="flex mt-1  text-[10px]">
//                   <img
//                     className="mr-1 "
//                     src={"/assets/terminal.svg"}
//                     width={6}
//                     height={6}
//                   />{" "}
//                   {metric.command}{" "}
//                 </Box>
//               </Box>
//             ))}
//           </TabPanel>
//         ))}
//       </TabPanels>
//     </Tabs>
//   );
// }

import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function DropdownTab({dropdownTabData , handleSelectedCommandOptionValue}) {

  return(
    <>
    { dropdownTabData?.map((el,i)=>(
      <Box
        key={`tabdata-${i}`}
        w={"100%"}
        color="gray.100"
        _hover={{ bgColor: "white.100" }}
        className="pl-3 rounded-md my-2 py-2 cursor-pointer"
        onClick={ () => {handleSelectedCommandOptionValue(el?.name?.replace(/screener_/,'').replace(/workbench_/,''))}}
      >
        <Text className="px-[2px]" fontSize={"12px"}>
          {el?.name?.replace(/screener_/,'').replace(/workbench_/,'')}
        </Text>
      </Box>
    ))}
    </>
  );
}