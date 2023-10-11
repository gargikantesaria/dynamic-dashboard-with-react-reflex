import React, { useState,useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useCompleteReset } from "../../queries/mutation";
import {useNavigate,useParams} from  "react-router-dom";
import { useAtom } from "jotai";
import { HEADER, SIDEBAR } from "../../atoms";


const ResetPassword = () => {
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  let SetConfig = () => {
    setSideBar(false);
    setHeader(false);
  }
  const { uidb64,token } = useParams();

useEffect(() => {
  SetConfig()
}, []);
  
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("")
  const navigate = useNavigate();

  // const { uidb64, token } = router.query
  const toast = useToast({
    containerStyle: {
      color: "white",
    },
  });
  const mutateReset = useCompleteReset({
    onSuccess: (e) => {
      console.log(e);
      setPassword("");
      toast({
        title: "reset password",
        description: "your password changed sucesfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/auth/back-to-login")
    },
    onError: (e) => {
      // alert("Something went wrong", e);
     
      setPassword("");
      toast({
        title: "Something went wrong!",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const validateForm = ()=>{
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(password)) {
      toast({
        title: "password",
        description: "Password must have atlest Upper,Lower case,number and special charater !",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    } else if (password.length < 8) {
      toast({
        title: "password",
        description: "Password length must be at least 8 charactes!",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    else if (password !== password2) {
      toast({
        title: "password",
        description: "Password do not match !",
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
      mutateReset.mutateAsync({
        "uidb64": uidb64,
        "token": token,
        "password": password
      })
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
          <form onSubmit={handleSubmit} > 
          <Text fontSize="4xl" fontWeight="bold" marginBottom={2}>
           Create new password
          </Text>
          <Text marginBottom={8}>Your new password must be different<br/> from previously used passwords .</Text>
          <Box>
            <FormControl >
              <FormLabel marginBottom={2}>New Password</FormLabel>
                          <Input onChange={(e) => setPassword(e.target.value)} marginBottom={6} placeholder="• • • • • • • • " />
              <FormLabel marginBottom={2}>Confirm Password</FormLabel>
              <Input onChange={(e) => setPassword2(e.target.value)} marginBottom={6} placeholder="• • • • • • • • " />
              <Text
                textAlign="right"
                fontSize="sm"
                cursor="pointer"
                textColor="teal"
              >
                Forgot Password
              </Text>
            </FormControl>
          </Box>
                  <Button  mt={4} mb={8} colorScheme="teal" type="submit">
            Reset password
          </Button> 
          </form>
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// ResetPassword.navbarProps = { visible: false };
// ResetPassword.sidebarProps = { visible: false };
// ResetPassword.layoutProps = { w: "100%", className: "" };
export default ResetPassword
