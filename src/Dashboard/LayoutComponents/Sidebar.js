import { Box, Flex } from "@chakra-ui/react";
import {
  Alarm,
  ArrowSwapHorizontal,
  TableDocument,
  Firstline,
  Keyboard,
  Code1,
} from "iconsax-react";
import { useAtom } from "jotai";
import { useState,useEffect } from "react";
import { BuildCommandSwapSidebarData, SelectedSidebarMenu, SIDEBAR } from "../../atoms";
import Alert from "./Sidebar/Alert";
import News from "./Sidebar/News";
import SideBarDrawer from "./Sidebar/SideBarDrawer";
import Swap from "./Sidebar/Swap";
import Watchlist from "./Sidebar/Watchlist";

export default function Sidebar() {
  const [sideBar,setSideBar] = useAtom(SIDEBAR)
  const [sidebar, setSidebar] = useAtom(SelectedSidebarMenu)
  const [commandData, setCommandData] = useAtom(BuildCommandSwapSidebarData);

  const handleClick = (name) => {   
    setSidebar({
      alert: false,
    swap: false,
    watchlist: false,
      news: false,
    [name]:!(sidebar[name])
    })

    // to reset swap offchain tab data
    setCommandData(null);
  }
  

  if (!sideBar) return null;
  return (
    <Box className="fixed right-0" zIndex={2} h="calc(100vh - 90px)" w="60px">
      <Flex border='2px' borderColor={"gray.stroke"} bgColor="gray.main"
        className="absolute  mx-2 rounded-lg   px-2.5 right-0"
        h="100%"
        align={"center"}
        justify="space-between"
        direction={"column"}
      >
        <Box>
          <Flex align={"center"} direction={"column"}>

            <Box>
              <Alarm onClick={()=>handleClick("alert")} className="icon mt-5 mb-2" variant="Linear" size={24} />
              <SideBarDrawer displaySidebar={sidebar.alert}>
                  <Alert />
              </SideBarDrawer>
            </Box>
            <Box>
              <ArrowSwapHorizontal
                onClick={()=>handleClick("swap")}
              className="icon my-2"
              variant="Linear"
              size={24}
            />
            
              <SideBarDrawer displaySidebar={sidebar.swap}>
                <Swap/>
              </SideBarDrawer>
            </Box>
            <Box>
              <TableDocument  onClick={()=>handleClick("watchlist")} className="icon my-2" variant="Linear" size={24} />
              <SideBarDrawer displaySidebar={sidebar.watchlist}>
               <Watchlist/>
                </SideBarDrawer>
            </Box>
            <Box>
              <Firstline  onClick={()=>handleClick("news")} className="icon my-2" variant="Linear" size={24} />
              <SideBarDrawer displaySidebar={sidebar.news}>
                <News/>
                </SideBarDrawer>
              </Box>
          </Flex>
        </Box>
        <Box pb={"15px"}>
          <Code1 className="icon mb-4" variant="Linear" size={24} />
          <Keyboard variant="Linear" size={24} className="icon" />
        </Box>
      </Flex>
    </Box>
  );
}
