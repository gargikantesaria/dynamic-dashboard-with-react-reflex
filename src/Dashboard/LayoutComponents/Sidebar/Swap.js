import { Box, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Textarea } from "@chakra-ui/react";

import SwapToken from "./Onchain/SwapToken";
import swapIcon from "../../../assets/swap.svg";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { BuildCommandSwapSidebarData, SelectedSidebarMenu } from "../../../atoms";
import { useForm } from "react-hook-form";
import { useSaveCommandData, useSendCommandData } from "../../../queries/mutation";
import { CustomValidator } from "../../utils/customValidator";

export default function Swap() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [sideBar, setSideBar] = useAtom(SelectedSidebarMenu);
  // for Offchain tab 

  // build command input data
  const [commandData, setCommandData] = useAtom(BuildCommandSwapSidebarData);

  // for form
  const { register, handleSubmit, setValue, formState: { errors } , reset } = useForm();

  const mutationSaveCommand = useSaveCommandData({
    onSuccess: (res) => {
      if(res){
        // reset form & close sidebar if success response
        reset();
        setSideBar({...sideBar, swap: false})
      }
    }
  });

  const mutationSendCommand = useSendCommandData();

  useEffect(() => {
    // will get commandData if it's edit > set form value
    if(commandData !== null){
      setValue("name", commandData.commandname);
      setValue("command", commandData.command);
    }
  },[setValue, commandData]);

  useEffect(()=>{
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandData]);

  // for save command
  const onSaveCommand = (data) => {
    mutationSaveCommand.mutateAsync(data);
  }

  // for send command
  const onSendCommand = (data) => {
    mutationSendCommand.mutateAsync(data);
  }
  
  return (
    <Box>
      <Text fontWeight={"semibold"} size={"14px"} pb={"8px"}>
        Trade
      </Text>
      <Divider mb={'15px'} borderWidth="1px" color={"gray.stroke"} />

      <Tabs defaultIndex={selectedTab}>
        <TabList className="border-0 mb-3 bg-[#2C2C30] rounded-md flex">
          <Tab className="w-3/6 alertStatusTabs">Onchain</Tab>
          <Tab className="w-3/6 alertStatusTabs">Offchain</Tab>
        </TabList>
        {/* Active Alerts */}
        <TabPanel>
          <SwapToken/>
        </TabPanel>
        {/* Inactive Alerts */}
        <TabPanel>
          <Box overflowY={'scroll'} h={'75vh'}>
            <Text mt={6} mb={6} fontSize={"16px"} fontWeight="700">
              Build a Command
            </Text>
            <Box display={"flex"} flexDir="column" mb={6}>
              <Text fontSize={"14px"} fontWeight="700" mb={3}>
                Command Name:
              </Text>
              <Input
                placeholder="save long btc"
                size="sm"
                focusBorderColor="gray.200"
                _hover={"gray.200"}
                {...register("name", { required: true , pattern: /^\S*$/ })}
              />
              {errors?.name && errors?.name.type === 'required' && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
              {errors?.name && errors?.name.type === 'pattern' && (
                <span className="text-red-500 text-sm">
                  Please enter valid name
                </span>
              )}
            </Box>
            <Box display={"flex"} flexDir="column" mb={6}>
              <Text fontSize={"14px"} fontWeight="700" mb={3}>
                Command Name:
              </Text>
              <Textarea
                // placeholder="small size"
                size="sm"
                minH={72}
                resize="none"
                focusBorderColor="gray.200"
                _hover={"gray.200"}
                placeholder="ptbot trade:6:lonq symbol-BTC/IJSDT size=O.2x
                              ptbot trade:1:lonq symbol-BTC/USDT size=O.2x
                              ptbot trade:7:lonq symbol-BTC/IJSDT size=O.2x
                              ptbot trade:2:lonq symbol-BTC/USDT size=O.2x
                              ptbot trade:3:lonq symbol-BTC/IJSDT size=O.2x
                              ptbot trade:4:lonq symbol-BTC/USDT size=O.2x"
                {...register("command", {
                  validate: CustomValidator.commandMessageValidator,
                })}
              />
              {errors?.command && errors.command?.type === "validate" && (
                  <span className="text-red-500 text-sm">
                    Please enter valid command
                  </span>
              )}
            </Box>
            <Box display={"flex"} flexDir="column" mb={6}>
              <Button
                fontWeight={"semibold"}
                borderRadius={"6px"}
                w={"100%"}
                bg={"blue"}
                onClick={handleSubmit(onSendCommand)}
              >
                Send
              </Button>
            </Box>
            <Box display={"flex"} flexDir="column" mb={6}>
              <Button
                fontWeight={"semibold"}
                borderRadius={"6px"}
                w={"100%"}
                bg={"blue"}
                onClick={handleSubmit(onSaveCommand)}
              >
                Save Command
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Tabs>
    </Box>
  );
}
