import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Text,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import {useNavigate} from  "react-router-dom";
import {  MAIL } from "../../atoms";
import { useMutationResend } from "../../queries/mutation";
import { HEADER, SIDEBAR } from "../../atoms";

const VerificationMail = () => {
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  let SetConfig = () => {
    setSideBar(false);
    setHeader(false);
  }
useEffect(() => {
  SetConfig()
}, []);
  
  const navigate = useNavigate();;
  const [mail, setMail] = useAtom(MAIL);
  const toast = useToast({
    containerStyle: {
      color: "white",
    },
  });
  const mutateResetMail = useMutationResend({
    onSuccess: (e) => {    
      toast({
        title: "Resend mail",
        description: "We re-sent a Verification link.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (e) => {
       toast({
        title: "Something went wrong!",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

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
                  <Text marginBottom={3}>We sent a Verification link to { mail}</Text>
        
        
          <Button onClick={()=>{ window.open('https://mail.google.com/', '_blank');}} mt={4} mb={8} colorScheme="teal" type="submit">
            Open email app
          </Button>
          <Text>Didn’t receive the email? <span onClick={()=>{mutateResetMail.mutateAsync({"email":mail});}} style={{ color: "blue", cursor:"pointer"}}>Click to resend</span> </Text>
         
          <Text textAlign="center" fontSize="sm">
           Back to login page
            
          </Text>
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// VerificationMail.navbarProps = { visible: false };
// VerificationMail.sidebarProps = { visible: false };
// VerificationMail.layoutProps = { w: "100%", className: "" };
export default VerificationMail;
