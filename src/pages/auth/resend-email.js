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
import { useToast } from "@chakra-ui/react";
import { useResetPassword } from "../../queries/mutation";
import { useAtom } from "jotai";
import { HEADER, SIDEBAR } from "../../atoms";


const ResendEmail = () => {
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  let SetConfig = () => {
    setSideBar(false);
    setHeader(false);
  }
useEffect(() => {
  SetConfig()
}, []);
  
    const toast = useToast({
        containerStyle: {
          color: "white",
        },
      });
  const [email, setEmail] = useState({"email":"", "redirect_url": `${process.env.REACT_APP_FRONTEND_URI}/auth/reset-password/`})
  const mutationResetPassword = useResetPassword({
    onSuccess: (e) => {
        if (e) {
        
            console.log(e)
            console.log("sucessfully send")
        } else {            
         
          console.log("you are not regisrered");
        }
      },
      onError: () => {
        console.log("Something went wrong");
      },
})
  function validateForm() {

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Email",
        description: "Enter Valid Email!",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    return true
  }
const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
        mutationResetPassword.mutateAsync(email)
    }
}

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
           Forgot Password
          </Text>
          <Text marginBottom={8}>No worries, we’ll send you reset instructions</Text>
          <form  onSubmit={handleSubmit} >
          <Box>
            <FormControl isRequired>
              <FormLabel marginBottom={2}>Email</FormLabel>
              <Input value={email.email} onChange={(e)=> setEmail({...email,"email": e.target.value })} name="email" marginBottom={6} placeholder="Enter your email" />
            
            </FormControl>
          </Box>
          <Button mt={4} mb={8} colorScheme="teal" type="submit">
            Send
          </Button>
          </form>
          <Text textAlign="center" fontSize="sm">
           Back to login page
            
          </Text>
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// ResendEmail.navbarProps = { visible: false };
// ResendEmail.sidebarProps = { visible: false };
// ResendEmail.layoutProps = { w: "100%", className: "" };
export default ResendEmail;
