import { useState, useEffect } from "react";
import { getRefreshToken } from '../queries/services.js'
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
  Box,
  Flex,
  Heading,
  Spacer,
  Select,
  Stack,
  Input,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Button,
  Collapse,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  TableContainer
} from "@chakra-ui/react";


import { Bag } from 'iconsax-react'

const Settings = () => {
  // const navigate = useNavigate();
  // const [apiData, setAPIData] = useState([]);

  const getCookieData = () => {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = decodeURIComponent(value);
      });
    return cookies;
  }

  const getAPIData = () => {

  }
  ////
  // useEffect(() => {
  //   const fetchData = async () => {
  //       let accessToken = getCookieData().token;
  //       let refreshToken = getCookieData().refresh_token;
  //       if (accessToken) {
  //           const response = await getAPIData(getCookieData().token)
  //           console.log(response)
  //           const responseData = response.alerts;
  //           setAPIData(responseData);
  //       }
  //       else {
  //           if (refreshToken) {
  //               console.log('refresh token exists: ', refreshToken)
  //               let refreshTokenObj = {
  //                   refresh: refreshToken
  //               }
  //               // fetch new access token
  //               getRefreshToken(refreshTokenObj)
  //               .then(async data => {
  //                   let cookieValue = data.access;
  //                   document.cookie = "token=" + encodeURIComponent(cookieValue) + "; expires=" + data.access_token_expiration + "; path=/";
  //                   const response = await getAPIData(getCookieData().token)
  //                   console.log(response)
  //                   const responseData = response;
  //                   setAPIData(responseData);
  //               })
  //               .catch(error => {
  //                   console.log('Error: ', error)
  //               })
  //           }
  //           else {
  //               // no token exists, routing back to login
  //               navigate('/auth/login');
  //           }
  //       }
  //     }
  //     fetchData();
  //   }, [fetchNewAPI]);
  
  // const [fetchNewAPI, setfetchNewAPI] = useState(false)

  ////
  const [activeItem, setActiveItem] = useState("Account");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const isActive = (itemName) => {
    return activeItem === itemName;
  };

  const [apiData, setAPIData] = useState({
    binance:[{
      name:"name 1",
      key:"key1"
    }, {
      name: "name2",
      key: "key2"
    }],
    bitmex:[{
      name:"name 2",
      key:"key2"
    }, {
      name: "name3",
      key: "key3"
    }
  ]
  });

  return (
    <Flex
      h="100vh"
      flexDirection="row"
      borderRight="1px"
    >
      <Box p="4" width={"20%"}>
        <Stack spacing="4">
          <SidebarItem
            itemName="Account"
            isActive={isActive("Account")}
            handleItemClick={handleItemClick}
          />
          <SidebarItem
            itemName="Basic info"
            isActive={isActive("Basic info")}
            handleItemClick={handleItemClick}
          />
          <SidebarItem
            itemName="Email"
            isActive={isActive("Email")}
            handleItemClick={handleItemClick}
          />
          <SidebarItem
            itemName="Password"
            isActive={isActive("Password")}
            handleItemClick={handleItemClick}
          />
          <SidebarItem
            itemName="API Keys"
            isActive={isActive("API Keys")}
            handleItemClick={handleItemClick}
            isLastItem={true}
          />
        </Stack>
      </Box>
      {isActive("API Keys") && (
        <Box p="4" m="4" width={"30%"} fontWeight={"light"} fontSize={"14px"} backgroundColor={"black"} borderRadius="md">
          <Heading size="md">Add New</Heading>
          <APIKeysForm apiData={apiData} setAPIData={setAPIData}/>
        </Box>
      )}
      <Box width={"50%"}>
        <APIKeysInfo apiData={apiData} setAPIData={setAPIData} />
      </Box>
    </Flex>
  );
};

const SidebarItem = ({ itemName, isActive, handleItemClick, isLastItem }) => {
  const itemColor = isActive ? "blue.500" : "white";
  return (
    <Box
      px="4"
      py="2"
      bg={isActive ? "blue" : "transparent"}
      borderRadius="md"
      cursor="pointer"
      onClick={() => handleItemClick(itemName)}
      _hover={{ bg:"blue" }}
    >
      <Text color={itemColor} fontWeight={isActive ? "semibold" : "normal"}>
        {itemName}
      </Text>
    </Box>
  );
};

const APIKeysInfo = ({ apiData, setAPIData }) => {
  return (
    <Box m="4" fontWeight={"light"} fontSize={"14px"} backgroundColor={"black"} borderRadius="md" p="4">
      <Heading size="md">Installed Keys</Heading>
        <Table variant="unstyled" fontWeight={"light"} fontSize={"14px"} mt="4">
        <Thead>
          <Tr>
            <Th>Exchange</Th>
            <Th>Name</Th>
            <Th>Key</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(apiData).map(([exchange, keys]) =>
            keys.map(({ name, key }) => (
              <Tr key={key}>
                <Td>{exchange}</Td>
                <Td>{name}</Td>
                <Td>{key}</Td>
                <Td>
                      <IconButton
                        size="sm"
                        icon={<Bag />}
                        aria-label="Delete"
                        onClick={() => {
                          const newData = { ...apiData };
                          newData[exchange] = newData[exchange].filter(
                            (k) => k.key !== key
                          );
                          setAPIData(newData)
                          console.log(newData);
                        }}
                      />
                    </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  )
}

const APIKeysForm = ({ apiData, setAPIData }) => {
  const [selectedExchange, setSelectedExchange] = useState("");
  const [keyName, setKeyName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const saveAPIKeys = () => {
    if (keyName && apiKey && apiSecret) {
      console.log("Submit API keys:");

      const apiDataObj = 
      {
        exchange: selectedExchange,
        name: keyName,
        key: apiKey,
        secret: apiSecret,
      }
      console.log(apiData, apiDataObj);

      if (selectedExchange === 'binance') {
        const updatedAPIData = {
          ...apiData,
          binance: [
            ...apiData.binance,
            apiDataObj
          ]
        };
        setAPIData(updatedAPIData);

        setSelectedExchange("");
        setKeyName("");
        setApiKey("");
        setApiSecret("");
      } else {
        const updatedAPIData = {
          ...apiData,
          bitmex: [
            ...apiData.bitmex,
            apiDataObj
          ]
        };
        setAPIData(updatedAPIData);

        setSelectedExchange("");
        setKeyName("");
        setApiKey("");
        setApiSecret("");
      }
    }
  };

  return (
    <Box as="form" mt="4" fontWeight={"light"} fontSize={"14px"}>
      <Stack spacing="4">
        <Select
          placeholder="Select exchange"
          value={selectedExchange}
          onChange={(event) => setSelectedExchange(event.target.value)}
        >
          <option value="binance">Binance</option>
          <option value="bitmex">Bitmex</option>
    </Select>
    <FormControl id="keyName">
      <FormLabel>Name</FormLabel>
      <Input
        type="text"
        value={keyName}
        onChange={(event) => setKeyName(event.target.value)}
        placeholder="Enter key name"
      />
    </FormControl>
    <FormControl id="apiKey">
      <FormLabel>API key</FormLabel>
      <Input
        type="text"
        value={apiKey}
        onChange={(event) => setApiKey(event.target.value)}
        placeholder="Enter API key"
      />
    </FormControl>
    <FormControl id="apiSecret">
      <FormLabel>API secret</FormLabel>
      <Input
        type="text"
        value={apiSecret}
        onChange={(event) => setApiSecret(event.target.value)}
        placeholder="Enter API secret"
      />
    </FormControl>
    <Button 
    onClick={()=>{saveAPIKeys()}}
    fontWeight={"light"} fontSize={"14px"} backgroundColor={"blue"}>Save</Button>
  </Stack>
</Box>
);
};

export default Settings;