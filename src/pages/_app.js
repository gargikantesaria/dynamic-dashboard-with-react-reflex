
import QueryClient from "../queries/queryClient";
import { QueryClientProvider } from "react-query";
import { Provider } from "jotai";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../Dashboard/LayoutComponents/Header";
import Sidebar from "../Dashboard/LayoutComponents/Sidebar";
import theme from "../ChakraTheme";
import "react-grid-layout/css/styles.css";
import Head from "next/head";
import "react-reflex/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel="stylesheet" href="/markersSample.css" />
        <link rel="stylesheet" href="/signaliq-maker.css" />
        <link rel="stylesheet" href="/signaliqDialog.css" /> */}
      </Head>
      <QueryClientProvider client={QueryClient}>
        <Provider>
          <ChakraProvider theme={theme}>
            <div className="">
              <Header {...(Component.navbarProps || {})} />
              <Box className="flex w-full">
                <Box
                  className="pl-3"
                  h="calc(100vh - 90px)"
                  w="calc(100vw - 60px)"
                  {...(Component.layoutProps || {})}
                >
                  <Component {...pageProps} />
                </Box>
                <Box className="w-[60px]">
                  <Sidebar {...(Component.sidebarProps || {})} />
                </Box>
              </Box>
            </div>
          </ChakraProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
