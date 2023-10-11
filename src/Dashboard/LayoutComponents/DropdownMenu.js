// import { Badge, Box, Flex, Text } from "@chakra-ui/react";
// import { ArrowUp } from "iconsax-react";
// import { useAtom } from "jotai";
// import { displayDropdown } from "../../atoms";
// import dashboardImg from "../../assets/dashboard.svg";
// import terminalImg from "../../assets/terminal.svg";
// import workbenchImg from "../../assets/workbench.svg";
// import screenerImg from "../../assets/screener.svg";

import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DropdownTab from "./DropdownTab";

export default function DropdownMenu({dataConfig , command , handleSelectedCommandOptionValue}) {
  // const [display, setDisplay] = useAtom(displayDropdown);
  // const [recentSearch, setRecent] = useState([
  //   "db add btcusd binance 30d",
  //   "db add btcusd binance 30d",
  //   "db add btcusd binance 30d",
  //   "db add btcusd binance 30d",
  // ]);

  // const [activeItem, setActiveItem] = useState("");

  // const handleItemClick = (itemName) => {
  //   setActiveItem(itemName);
  // };

  // return (
  //   <>
  //     {!display ? (
  //       <Box
  //         w="calc(100% - 16px)"
  //         className="absolute w-full mx-2  left-0 top-[50px]"
  //       >
  //         <Box
  //           border={"1px"}
  //           borderColor="gray.stroke"
  //           bgColor={"gray.glass"}
  //           className="  px-4 rounded-md w-full backdrop-blur-[64px]  "
  //         >
  //           {/* <Flex className="ml-4 my-6">
  //             {recentSearch.map((recent, i) => (
  //               <Box
  //                 key={i}
  //                 bgColor={"black.500"}
  //                 className="px-3 py-1 cursor-pointer rounded-md mr-2 text-sm flex items-center "
  //               >
  //                 <Flex align={"center"}>
  //                   <ArrowUp
  //                     className="icon mr-3 rotate-45"
  //                     variant="Linear"
  //                     size={14}
  //                   />{" "}
  //                   {recent}
  //                 </Flex>
  //               </Box>
  //             ))}
  //           </Flex> */}
  //           <Box w="100%">
  //             <Flex>
  //               <Box w="10%">
  //                 <Box>
  //                   <Text className="ml-4 font-bold text-[14px] mt-4">Tools</Text>
  //                   <Box
  //                     color="gray.100"
  //                     _hover={{ bg: "blue" }}
  //                     className="flex  cursor-pointer hover:text-white mt-2 rounded-md py-1 px-2"
  //                     onClick={() => handleItemClick("Dropdown")}
  //                     bg={(activeItem === "Dropdown") ? "blue" : "transparent"}
  //                   >
  //                     <img
  //                       className="mr-3"
  //                       src={dashboardImg}
  //                       width={16}
  //                       height={15}
  //                       alt="dashboard"
  //                     />
  //                     <Flex direction={"column"}>
  //                       <Text className="text-sm pb-0.5">Dashboard</Text>
  //                       <Flex className="text-[10px]">
  //                         <img
  //                           className="mr-2"
  //                           src={terminalImg}
  //                           width={6}
  //                           height={6}
  //                           alt="terminal"
  //                         />
  //                         db
  //                       </Flex>
  //                     </Flex>
  //                   </Box>
  //                   <Box
  //                     color="gray.100"
  //                     _hover={{ bg: "blue" }}
  //                     className="flex cursor-pointer hover:text-white mt-2 rounded-md py-1 px-2"
  //                     onClick={() => handleItemClick("Workbench")}
  //                   >
  //                     <img
  //                       className="mr-3 "
  //                       src={workbenchImg}
  //                       width={16}
  //                       height={15}
  //                       alt="workbench"
  //                     />
  //                     <Flex direction={"column"}>
  //                       <Text className="text-sm pb-0.5">Workbench</Text>
  //                       <Flex className="text-[10px]">
  //                         <img
  //                           className="mr-2"
  //                           src={terminalImg}
  //                           width={6}
  //                           height={6}
  //                           alt="terminal"
  //                         />
  //                         wb
  //                       </Flex>
  //                     </Flex>
  //                   </Box>
  //                   <Box
  //                     color="gray.100"
  //                     _hover={{ bg: "blue" }}
  //                     className="flex cursor-pointer hover:text-white mt-2 rounded-md py-1 px-2"
  //                     onClick={() => handleItemClick("Screener")}
  //                   >
  //                     <img
  //                       className="mr-3"
  //                       src={screenerImg}
  //                       width={16}
  //                       height={15}
  //                       alt="screener"
  //                     />
  //                     <Flex direction={"column"}>
  //                       <Text className="text-sm pb-0.5">Screener</Text>
  //                       <Flex className="text-[10px]">
  //                         <img
  //                           className="mr-2"
  //                           src={terminalImg}
  //                           width={6}
  //                           height={6}
  //                           alt="terminal"
  //                         />
  //                         sc
  //                       </Flex>
  //                     </Flex>
  //                   </Box>
  //                 </Box>
  //               </Box>
  //               {(activeItem === "Dropdown") && (
  //               <Box className="ml-10 w-[80%]">
  //                 <Text className="text-[14px] ">Save Workbench / Screeners</Text>
  //                 <DropdownTab />
  //               </Box>)}
  //             </Flex>
  //           </Box>
  //         </Box>
  //       </Box>
  //     ) : ( <></>) 
  //   }
  //   </>
  // );

  const [display, setDisplay] = useState(false);
  const [dropdownTabData , setDropdownTabData] = useState(null);

  // to handle case if after command searching particular name then filter data according to name
  const getdataConfigFilteredByName = (commandConfigData , name) => {
    return commandConfigData?.filter((el) => {return el.name.replace(/ /g,'').toLowerCase().includes(name)});
  };

  const handleDisplayData = () => {
    let commandStr = command.replace(/ /g,'').toLowerCase();
    if(commandStr.includes("wb") && dataConfig?.data?.Workbenches?.length > 0){
      setDisplay(true);
      // if after command searching particular name then filter data according to name
      const searchedName = commandStr.replace('dbaddwb','').replace(/ /g,'').toLowerCase();
      (searchedName.length > 0) ? setDropdownTabData(getdataConfigFilteredByName(dataConfig?.data?.Workbenches , searchedName)) : setDropdownTabData(dataConfig?.data?.Workbenches);
    }
    if(commandStr.toLowerCase().includes("sc") && dataConfig?.data?.Screeners?.length > 0){
      setDisplay(true);
      // if after command searching particular name then filter data according to name
      const searchedName = commandStr.replace('dbaddsc','').replace(/ /g,'').toLowerCase();
      (searchedName.length > 0) ? setDropdownTabData(getdataConfigFilteredByName(dataConfig?.data?.Screeners , searchedName)) : setDropdownTabData(dataConfig?.data?.Screeners);
    }
  };

  useEffect(()=>{
    handleDisplayData();
  },[command]);


  return (
    <>
      {
        display ? (
          <Box
            w="calc(100% - 16px)"
            className="absolute w-full mx-2 left-0 top-[50px]"
          >
            <Box
              border={"1px"}
              borderColor="gray.stroke"
              bgColor={"gray.glass"}
              className="px-4 rounded-md w-full backdrop-blur-[64px]"
            >
              <Box w="100%">
                <DropdownTab dropdownTabData={dropdownTabData} handleSelectedCommandOptionValue={handleSelectedCommandOptionValue}/>
              </Box>
            </Box>
          </Box>
        ) : (<></>)
      }
    </>
  );
}
