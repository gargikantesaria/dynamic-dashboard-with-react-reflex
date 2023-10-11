import React,{useState,useEffect} from "react";
import { Box, Flex } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import { useAtom } from "jotai";
import { HEADER, SIDEBAR } from "../../atoms";

const BackToLogin = () => {
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  let SetConfig = () => {
    setSideBar(false);
    setHeader(false);
  }
useEffect(() => {
  SetConfig()
}, []);
  
  return (
    <Box w="100%" color="white">
      <Flex>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          backgroundColor="white"
          h="100vh"
          color="black"
          w="50%"
                  padding="150px"
                  textAlign="center"
        >
          <Text fontSize="4xl" fontWeight="bold" marginBottom={2}>
           Password reset
          </Text>
          <Text marginBottom={8}>Your password has been successfully reset. <br/> Click below to login.</Text>
        
          <Button mt={4} mb={8} colorScheme="teal" type="submit">
            <Link href={"/auth/login"} >Login</Link>
          </Button>
         
        
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// BackToLogin.navbarProps = { visible: false };
// BackToLogin.sidebarProps = { visible: false };
// BackToLogin.layoutProps = { w: "100%", className: "" };
export default BackToLogin;
