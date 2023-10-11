import React, { useState ,useEffect} from "react";
import { Box, Flex } from "@chakra-ui/layout";
import {Link} from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useMutationRegister } from "../../queries/mutation";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import {useNavigate} from  "react-router-dom";
import { useAtom } from "jotai";
import {  MAIL } from "../../atoms";
import { HEADER, SIDEBAR } from "../../atoms";


const Signup = () => {
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
  const toast = useToast({
    containerStyle: {
      color: "white",
    },
  });
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [mail, setMail] = useAtom(MAIL);


  const mutationRegister = useMutationRegister({
    onSuccess: (e) => {
      console.log(e);
      setEmail("");
      setUserName("");
      setPassword1("");
      setPassword2("");
      toast({
        title: "Verify",
        description: "Verification e-mail sent.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setMail(email);
      navigate("/auth/verification");
    },
    onError: (e) => {
      setMail(email);
      navigate("/auth/verification");
    },
  });

    // Check if the password contains the username as a substring
  function isPassAndUsername(password, username) {
    const passwordLowerCase = password.toLowerCase();
    const usernameLowerCase = username.toLowerCase(); 
  
    return passwordLowerCase.includes(usernameLowerCase);
  }
  function validateForm() {
    if (userName.length <3 ) {
      toast({
        title: "Username",
        description: "Username is too small!",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    } else if (userName.length > 16) {
      toast({
        title: "Username",
        description: "Username is too long!",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
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
   
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(password1)) {
      toast({
        title: "password",
        description: "Password must have atlest Upper,Lower case,number and special charater !",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    } else if (password1.length < 8) {
      toast({
        title: "password",
        description: "Password length must be at least 8 charactes!",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    else if (password1 !== password2) {
      toast({
        title: "password",
        description: "Password do not match !",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    else if (isPassAndUsername(password1,userName)) {
      toast({
        title: "Password",
        description: "Password is too similar to the username.",
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
        mutationRegister.mutateAsync({
          username: userName,
          email: email,
          password1: password1,
          password2: password2,
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
        > <form onSubmit={handleSubmit}>
          <Text fontSize="4xl" fontWeight="bold" marginBottom={2}>
            Create your account
          </Text>
          <Text marginBottom={8}>Welcome back! Please enter your details.</Text>
          <Box>
            <FormControl isRequired>
              <FormLabel marginBottom={2}>Username</FormLabel>
              <Input
                marginBottom={6}
                placeholder="Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
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
                placeholder="Password"
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
              />
              <FormLabel marginBottom={2}>Re-enter your Password</FormLabel>
              <Input
                marginBottom={6}
                placeholder="Password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
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
            Already have an account?{" "}
            <span className="text-[#3182CE] cursor-pointer font-medium">
              {/* Sign in */}
              <Link href="/auth/login">Sign in</Link>
            </span>
            </Text>
            </form>
        </Box>
        
        <Box w="50%"></Box>
      </Flex>
    </Box>
  );
};
// Signup.navbarProps = { visible: false };
// Signup.sidebarProps = { visible: false };
// Signup.layoutProps = { w: "100%", className: "" };
export default Signup;
