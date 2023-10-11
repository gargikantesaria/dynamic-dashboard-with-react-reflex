import { Box, Flex } from "@chakra-ui/layout";
import { useEffect } from "react";
import {
  Text,
  Button,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { HEADER, SIDEBAR } from "../../atoms";

const CheckEmail = () => {
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
        >
          <Text fontSize="4xl" fontWeight="bold" marginBottom={2}>
          Check your email
          </Text>
          <Text marginBottom={3}>We sent a password reset link to username@gmail.com</Text>
        
        
          <Button onClick={()=>{ window.open('https://mail.google.com/', '_blank');}} mt={4} mb={8} colorScheme="teal" type="submit">
            Open email app
          </Button>
         
          <Text textAlign="center" fontSize="sm">
           Back to  login page
            
          </Text>
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// CheckEmail.navbarProps = { visible: false };
// CheckEmail.sidebarProps = { visible: false };
// CheckEmail.layoutProps = { w: "100%", className: "" };
export default CheckEmail;
