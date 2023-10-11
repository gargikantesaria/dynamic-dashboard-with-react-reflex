import React, { useState,useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Link,useNavigate } from "react-router-dom";
import { useMutateLogin } from "../../queries/mutation";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { HEADER, SIDEBAR } from "../../atoms";

const Login = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function checkAuth() {
   
    if (localStorage.getItem('access_token')) {
      navigate('/dashboard');
      return;
    }
   }
  useEffect(() => {
    checkAuth();
  }, [])
  
  const navigate = useNavigate()
  const mutateLogin = useMutateLogin({
    onSuccess: (e) => {
      console.log(e);
      setEmail("");
      setPassword("");
      toast({
        title: "Logged In",
        description: "You're logged in successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('access_token', e?.access_token);
      localStorage.setItem('refresh_token',e?.refresh_token);
    
      navigate("/dashboard")
    },
    onError: (e) => {
      // alert("Something went wrong", e);
      setEmail("");
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
      
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(password)) {
      toast({
        title: "password",
        description: "Enter valid Password !",
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
       return true;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {      
      mutateLogin.mutateAsync({
        email: email,
        password: password,
      });
     
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
          <form onSubmit={handleSubmit}>
          <Text fontSize="4xl" fontWeight="bold" marginBottom={2}>
            Login
          </Text>
          <Text marginBottom={8}>Welcome back! Please enter your details.</Text>
       
          <Box>
            <FormControl isRequired>
                            <FormLabel marginBottom={2}>Email</FormLabel>
              <Input
                marginBottom={6}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormLabel marginBottom={2}>Password</FormLabel>
              <Input
                marginBottom={6}
                placeholder="* * * * * * * *"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Text
                textAlign="right"
                fontSize="sm"
                cursor="pointer"
                textColor="#3182CE"
                onClick={() => navigate("/auth/forgotpassword")}
              >
               Forgot Password
              </Text>
            </FormControl>
          </Box>
          <Button
            mt={4}
            mb={8}
            backgroundColor="#3182CE"
            variant={"solid"}
            color={"white"}
            type="submit"
          >
            Submit
          </Button>
         
          <Text textAlign="center" fontSize="sm">
            Don’t have an account?{" "}
            <span className="text-[#3182CE] cursor-pointer font-medium">
              {/* Sign up */}
                <Box onClick={()=>{navigate("/auth/signup")}}>Sign up</Box>
            </span>
          </Text>
          </form>
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// Login.navbarProps = { visible: false };
// Login.sidebarProps = { visible: false };
// Login.layoutProps = { w: "100%", className: "" };
export default Login;
