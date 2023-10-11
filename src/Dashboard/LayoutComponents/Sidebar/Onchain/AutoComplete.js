import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Input,
  List,
  ListItem,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  Flex,
} from "@chakra-ui/react";

export default function AutoComplete({ options,onSelect,setIsOpen,isOpen,loading }) {

  const [allData, setAllData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  // useEffect(() => {
   
  //   fetchData();
  // }, []);
  // async function fetchData() {
  //   const response = await fetch();
  //   const data = await response.json();
  //   setoptions(data.tokens);
  //   setLoadingData(false);
  // }
  const handleInputChange = (event) => {
    const inputValue = event;
    setInputValue(inputValue);

    const filteredOptions = options?.filter((option) =>
      option.symbol.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    onSelect(option);
    loading(false)
    setInputValue("");
    setFilteredOptions(options);
    setIsOpen(false)
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={() => { setIsOpen(false); loading(false)}}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent
        maxWidth={700}
        maxHeight={400}
        minHeight={400}
        color={"white"}
        backgroundColor={"gray.glass"}
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody className="  mt-1 mb-10">
          <Input
            fontSize={"14px"}
            value={inputValue}
            onChange={(e)=>handleInputChange(e.target.value)}
            variant={"unstyled"}
            placeholder="Enter Name..."
          />
          {loadingData ? (
            <div>Loading data...</div>
          ) : (
            <List
              className="swap-list"
              w={"92%"}
              maxH={230}
              overflowY={"scroll"}
              top={20}
              position={"absolute"}
            >
              {inputValue === "" ? options?.slice(0,100)?.map((option) => (
                <ListItem
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  px="15px"
                  py="6px"
                  my="2px"
                  _hover={{
                    bg: "gray.200",
                    cursor: "pointer",
                    borderRadius: "12px",
                    px: "15px",
                  }}
                >
                  <Flex alignItems={"center"}>
                    <img
                      className="rounded-full w-6 h-6 mr-4"
                      src={option.logoURI}
                      alt=""
                    />
                    <Flex direction={"column"}>
                      <Text fontSize={"12px"}>{option.name}</Text>
                      <Text color={"gray.100"} mt="2px" fontSize={"10px"}>
                        {option.symbol}
                      </Text>
                    </Flex>
                  </Flex>
                </ListItem>
              )
              ) : filteredOptions?.map((option) => (
                <ListItem
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  px="15px"
                  py="6px"
                  my="2px"
                  _hover={{
                    bg: "gray.200",
                    cursor: "pointer",
                    borderRadius: "12px",
                    px: "15px",
                  }}
                >
                
                  <Flex alignItems={"center"}>
                    <img
                      className="rounded-full w-6 h-6 mr-4"
                      src={option.logoURI}
                      alt=""
                    />
                    <Flex direction={"column"}>
                      <Text fontSize={"12px"}>{option.name}</Text>
                      <Text color={"gray.100"} mt="2px" fontSize={"10px"}>
                        {option.symbol}
                      </Text>
                    </Flex>
                  </Flex>
                </ListItem>
              )
              )}
            </List>)}
        </ModalBody>

        <ModalFooter backgroundColor={"gray.stroke"} className="p-4 rounded">
          {/* <Share color="#f5f5f5" className="" /> */}
          <Flex color={"gray.100"} className="absolute  left-6">
            Select Token *
          </Flex>
          <Button
            fontWeight={"light"}
            fontSize={"14px"}
            backgroundColor={"blue"}
            mr={3}
            ml={1}
            //   onClick={!create?onSaveAndClose:addLayout}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
 
  );
}
