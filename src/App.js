import MainRoute from "./routes/Routes";
import { BrowserRouter as Router} from "react-router-dom";
import QueryClient from "./queries/queryClient";
import { QueryClientProvider } from "react-query";
import { Provider } from "jotai";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Dashboard/LayoutComponents/Header";
import theme from "./ChakraTheme";
import Sidebar from "./Dashboard/LayoutComponents/Sidebar";
import "chartiq/css/page-defaults.css";
import { Box } from "@chakra-ui/react";
import "react-reflex/styles.css";
import { useState,useEffect } from "react";
// import { calc } from "@chakra-ui/theme-tools";

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <QueryClientProvider client={QueryClient}>
      <Provider>
        <ChakraProvider theme={theme}>
          <Router>
            <div className="">
              <Header />
              <Box className="flex w-full">
                <Box
                  className="pl-3"
                  h="calc(100vh - 90px)"
                  w="calc(100vw - 60px)"
                  // {...(Component.layoutProps || {})}
                >
                {screenWidth>700? <MainRoute/>:<div className="flex font-semibold  text-[#B7B7B7] justify-center items-center h-full w-full">Our website is not optimized for tablet and mobile for now.</div>  } 
                </Box>
                <Box className="w-[60px]">
                  <Sidebar  />
               </Box>
             </Box>
            </div>
          </Router>
        </ChakraProvider>
      </Provider>
      </QueryClientProvider>
  );
}

export default App;
