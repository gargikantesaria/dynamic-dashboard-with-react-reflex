import { useState, useRef, useEffect } from "react";
import { Input } from "@chakra-ui/input";
import { useAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import { useToast } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import DropdownMenu from "./DropdownMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import {
  ElementEqual,
  AlignVertically,
  Refresh,
  Share,
  EmptyWallet,
  Setting2,
  User,
} from "iconsax-react";
import {
  Account,
  AccountBalance,
  ActiveDbTab,
  ConfigData,
  GlobalLayout,
  HEADER,
  LayoutStructure,
  layoutToggle,
  Address,
  displayDropdown,
} from "../../atoms/index";
import { Link } from "react-router-dom";
// import { useMutateConfig } from "../../queries/mutation";
import { useMutateLogout, usePostShare, useUpdateLayout } from "../../queries/mutation";
import { useMutateConfig } from "../../queries/hooks";
import Web3 from "web3";
import ShareModal from "./Share/ShareModal";

export default function Header({ visible = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [layoutChange, setLayoutChange] = useAtom(layoutToggle);
  const [LayoutStruct, setLayoutStruct] = useAtom(LayoutStructure);
  const [walletAddress, setWalletAddress] = useAtom(Address);
  const [cmd, setCmd] = useState("");
  const [layouts, setLayouts] = useAtom(GlobalLayout);
  const [tabId, setTabId] = useAtom(ActiveDbTab);
  const [configData, setConfigData] = useAtom(ConfigData);
  const [header, setHeader] = useAtom(HEADER);
  const [updatedView, setUpdatedView] = useState({});
  //swap
  const [account, setActiveAddress] = useAtom(Account);
  const [balance, setBalance] = useAtom(AccountBalance);
  //share
  const [share, setShare] = useState({});
  const [isOpen,setIsOpen] = useState(false)

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toast = useToast({
    containerStyle: {
      color: "white",
    },
  });
  const dataConfig = useMutateConfig();
  const AccountMenu = [
    { name: "Accounts", href: "my-account" },
    { name: "Basic Info", href: "basic-info" },
    { name: "Email", href: "email" },
    { name: "Password", href: "password" },
    { name: "Refer a Friend", href: "invite" },
    { name: "Logout", href: "logout" },
  ];
  const ShareMenu = [
    {
      name: "Public",
      description: "Share Your Idea with Everyone",
      href: "public",
    },
    {
      name: "Private",
      description: "Share with other Users",
      href: "private",
    },
    // { name: "Screenshot", description: "Download a picture", href: "/" },
  ];
  const handleShare = (option) => {
    let active = layouts.find((item) => item?.id === tabId);
    let config = {
          "type":option,
          "config":{
              "view":active
                  }
      }
    mutateShare.mutateAsync(config)
  }
  const mutateLogout = useMutateLogout({
    onSuccess: (data) => {
      console.log("mutate", data);
      localStorage.removeItem('access_token');
      navigate("/auth/login");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const mutateShare = usePostShare({
    onSuccess: (data) => {
      setShare(data.message);
      setIsOpen(true);
     console.log("Ddddsafafd",data.message)
    },
    onError: (e) => {
      console.log(e);
    },
  });

  let handleMenuClick = (e) => {
    if (e === "logout") {
      mutateLogout.mutateAsync();
    }
  };

  //Explorer


  // console.log(configData, "configData");
  let handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let command = cmd.trim().toLowerCase();

      // setInputCommand(command);
      // if (command.match(/\d+/)) {
      //   toast({
      //     title: "Command",
      //     description: "Number is not supported in Terminal !",
      //     status: "warning",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      //   return;
      // }

      let splittedCmd = command.split(" ");
      if (splittedCmd.length === 1) {
        if (command === "wb" || command === "workbench") {
          navigate("/workbench");
          return;
        } else if (command === "sc" || command === "screener") {
          navigate("/screener");
          return;
        } else if (command === "db" || command === "dashboard") {
          navigate("/dashboard");
          return;
        } else {
          toast({
            title: "Command",
            description: "Command not found !",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      } else if (splittedCmd.length === 4) {
        //   for adding wb and sc
        const [_, type, category, name] = splittedCmd;
        if (type === "add") {
          if (category === "wb") {
            const filteredConfig = dataConfig?.data?.Workbenches?.filter(
              (data) => data.name === "workbench_" + name
            );
            if (filteredConfig?.[0] !== undefined) {
              setConfigData({
                id: tabId,
                data: { ...filteredConfig?.[0], uuid: uuidV4() },
              });
            }
            setCmd("");
            return;
          } else if (category === "sc") {
            const filteredConfig = dataConfig?.data?.Screeners?.filter(
              (data) => data.name === name
            );
            if (filteredConfig?.[0] !== undefined) {
              setConfigData({
                id: tabId,
                data: { ...filteredConfig?.[0], uuid: uuidV4() },
              });
            }
            setCmd("");
            return;
          } else if (category === "oems") {
            let active = layouts.find((item) => item?.id === tabId);
            let isOems = active?.layout_config.find(
              (item) => item?.type === "oems"
            );
            if (isOems === undefined) {
              setConfigData({
                id: tabId,
                data: {
                  name: "oems table",
                  type: "oems",
                  config: { placeholder: "PlaceHolder" },
                  uuid: uuidV4(),
                },
              });
              setCmd("");
              return;
            }
            setCmd("");
            return;
          }
        }
      } else if (splittedCmd.length === 3) {
        //   for wallet explorer
        const [_, wallet, address] = splittedCmd;
        if (wallet === "wallet") {
          if (location.pathname === "/workbench") {
            const regex = new RegExp("^0x[0-9a-fA-F]{40}$");
            var result = regex.test(address);
            if (result) {
              setWalletAddress(address);
              setCmd("");
            } else {
              toast({
                title: "Invalid Address",
                description: "Invalid wallet address",
                status: "warning",
                duration: 5000,
                isClosable: true,
              });
              setCmd("");
            }
          } else {
            toast({
              title: "Invalid Route",
              description: "Navigate to workbench for wallet activity.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
            setCmd("");
          }
        }
      }
    }
  };

  let updateView = () => {
    if (updatedView?.data?.length > 0) {
      if (updatedView.id === tabId) {
        console.log("Sss", updatedView);
        const patchData = {
          layout_id: tabId,
          layout: LayoutStruct,
          layout_config: updatedView.data,
        };
        // setLayouts(
        //   layouts.map((obj) =>
        //     obj.id === tabId
        //       ? { ...obj, layout: LayoutStruct, layout_config: updatedView.data }
        //       : obj
        //   )
        // );
        console.log("state Changed");
        mutatePatchLayout.mutateAsync( patchData);
      }
    }
  };

  useEffect(() => {
    updateView();
  }, [updatedView]);

  const mutatePatchLayout = useUpdateLayout({
    onSuccess: (data) => {
      setLayouts(
        layouts.map((obj) => (obj.id === tabId ? data["layout Updated"] : obj))
      );
      console.log("patch", data["layout Updated"]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  let MakeCopy = (n, arr, id) => {
    console.log("arr", arr);
    let myArray = [...arr];
    let myObj = arr[arr.length - 1];
    console.log("last", myObj.type);
    if (myObj.type === "oems") {
      if (arr.length === 1) {
        toast({
          title: "Command",
          description: "Add commands to add Layout !",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else {
        myObj = arr[arr.length - 2];
        for (let i = 0; i < n - arr.length; i++) {
          myArray.push({ ...myObj, uuid: uuidV4() });
        }
        setUpdatedView({ id: id, data: myArray });
      }
    } else {
      for (let i = 0; i < n - arr.length; i++) {
        myArray.push({ ...myObj, uuid: uuidV4() });
      }
      setUpdatedView({ id: id, data: myArray });
    }
  };
  let DeleteExtra = (n, arr, id) => {
    setUpdatedView({ id: id, data: arr.slice(0, n) });
  };

  const onLayoutClick = () => {
    if (tabId) {
      console.warn("clicked ✨");
      let activeLayoutData = layouts.find((item) => item.id === tabId);
      let layoutNum = LayoutStruct.slice(-3, -2);
      if (activeLayoutData?.layout_config.length < layoutNum) {
        console.log("less than");
        MakeCopy(layoutNum, activeLayoutData.layout_config, tabId);
      } else if (activeLayoutData?.layout_config.length > layoutNum) {
        console.log("greater than");
        console.log(layoutNum);
        DeleteExtra(layoutNum, activeLayoutData.layout_config, tabId);
      } else if ((activeLayoutData?.layout_config.length == layoutNum, tabId)) {
        console.log("equal to");
        setUpdatedView({ id: tabId, data: activeLayoutData?.layout_config });
      }
    }
  };

  useEffect(() => {
    onLayoutClick();
  }, [LayoutStruct]);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("connecting");
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("a", accounts[0]);
        const web3 = new Web3(window.ethereum);
       setActiveAddress(accounts)
        // get the balance of the connected account in Ether
        const balanceInWei = await web3.eth.getBalance(accounts[0]);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
        console.log("bal",balanceInEther)
        setBalance(balanceInEther)
        // setConnect(account.length ? true : false);
      } catch (error) {
        console.log(error);
      }
      // setConnect(true)
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      // document.getElementById("Approve_0x_button").disabled = false;
      // document.getElementById("swap_button").disabled = false;
    } else {
      document.getElementById("login_button").innerHTML =
        "Please install MetaMask";
    }
  }

  // to handle entered command
  const handleEnteredCommand = (command) => {
    const validCommandArr = ['db add wb' , 'db add sc'];
    const isValidCommand = validCommandArr.some(el => command.replace(/ /g,'').toLowerCase().includes(el.replace(/ /g,'').toLowerCase()));
    // if command is valid then open dropdown menu
    ((isValidCommand) ? setIsDropDownOpen(true) : setIsDropDownOpen(false));
  }

  const handleSelectedCommandOptionValue = (value) => {
    setIsDropDownOpen(false);
    const commandStr = cmd.replace(/ /g,'').toLowerCase();
    if(commandStr.includes('dbaddwb')){
      setCmd(`db add wb ${value}`);
    }
    if(commandStr.includes('dbaddsc')){
      setCmd(`db add sc ${value}`);
    }
  }

  if (!header) return null;
  return (
    <Box paddingTop={4} paddingBottom={3} w={"100%"}>
      <Flex align={"center"}>
        <Box position={"relative"} w="calc(100vw - 10px)">
          <Flex w="100%" align={"center"}>
            <Box
              bgColor={"gray.main"}
              border="1px"
              borderColor={" gray.stroke"}
              className=" mx-2 w-full rounded-lg  px-4"
            >
              <Flex align={"center"} justify="center">
                
                <Box className="z-10" w={"100%"}>
                  <Input
                    border={"none"}
                    className="border-none  "
                    placeholder="Search for Metrics"
                    value={cmd}
                    onChange={(e) => { setCmd(e.target.value); (location.pathname === '/dashboard' && handleEnteredCommand(e.target.value)); }}
                    onKeyPress={handleKeyPress}
                  />
                  {isDropDownOpen && (<DropdownMenu dataConfig={dataConfig} command={cmd} handleSelectedCommandOptionValue={handleSelectedCommandOptionValue}/>)}
                </Box>

                <Box w={"auto"}>
                  <Flex>
                    <Box
                      borderBottomColor={"gray.100"}
                      className="border-b  rotate-90 w-7"
                    ></Box>
                    {location.pathname === "/dashboard" ? (
                      <Menu position="relative">
                        <MenuButton
                          as={Button}
                          className="!bg-transparent !p-0"
                        >
                          <ElementEqual
                            className=" icon mx-2 w-[27px]"
                            variant="Linear"
                            size={24}
                          />
                        </MenuButton>
                        <MenuList
                          zIndex={50}
                          className=" backdrop-blur-[23px]"
                          bg="gray.glass"
                          py="4px"
                          borderRadius={"6px"}
                          border="1px"
                          borderColor="gray.stroke"
                          minW={0}
                          h="auto"
                          w="188px"
                          position={"absolute"}
                          top="13px"
                          left={"2px"}
                          p="0px"
                        >
                          <Box py="8px" mx="8px" px={"12px"}>
                            <Flex pb={"4px"} align="center">
                              <img
                                alt="layout"
                                width={20}
                                className="cursor-pointer ml-0.5 opacity-80"
                                src={require("../../assets/layout_icons/layout_1.png")}
                                onClick={() => {
                                    setLayoutChange(!layoutChange);
                                    setLayoutStruct("layout_1_1");
                                }}
                              />
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_2_1.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_2_1");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_2_2.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_2_2");
                                }}
                              />
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_3_1.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_3_1");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_3_2.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_3_2");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_3_3.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_3_3");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_3_4.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_3_4");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_3_5.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_3_5");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_3_6.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_3_6");
                                }}
                              />{" "}
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_4_1.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_4_1");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_4_2.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_4_2");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_4_3.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_4_3");
                                }}
                              />{" "}
                              {/* <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_4_4.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_4_4");
                                }}
                              />{" "} */}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_4_5.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_4_5");
                                }}
                              />{" "}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_4_6.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_4_6");
                                }}
                              />{" "}
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              {/* <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_5_1.png")}
                                onClick={() => {
                                  n "layout_5_1";
                                  });
                                  setLayoutStruct("layout_5_1");
                                }}
                              />
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_5_2.png")}
                                onClick={() => {
                                  n "layout_5_2";
                                  });
                                  setLayoutStruct("layout_5_2");
                                }}
                              />
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_5_3.png")}
                                onClick={() => {
                                  n "layout_5_3";
                                  });
                                  setLayoutStruct("layout_5_3");
                                }}
                              />
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_5_4.png")}
                                onClick={() => {
                                  n "layout_5_4";
                                  });
                                  setLayoutStruct("layout_5_4");
                                }}
                              /> */}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_5_5.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_5_5");
                                }}
                              />
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_6_1.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_6_1");
                                }}
                              />
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_6_2.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_6_2");
                                }}
                              />
                              {/* <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_6_3.png")}
                                onClick={() => {
                                  n "layout_6_3";
                                  });
                                  setLayoutStruct("layout_6_3");
                                }}
                              /> */}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_6_4.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_6_4");
                                }}
                              />
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              {/* <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_7_1.png")}
                                onClick={() => {
                                  n "layout_7_1";
                                  });
                                  setLayoutStruct("layout_7_1");
                                }}
                              /> */}
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_7_2.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_7_2");
                                }}
                              />
                            </Flex>
                            <Flex pb={"4px"} align="center">
                              <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_8_1.png")}
                                onClick={() => {
                                  setLayoutChange(!layoutChange);
                                  setLayoutStruct("layout_8_1");
                                }}
                              />
                              {/* <img
                                alt="layout"
                                width={24}
                                className="cursor-pointer"
                                src={require("../../assets/layout_icons/layout_8_2.png")}
                                onClick={() => {
                                  n "layout_8_2";
                                  });
                                  setLayoutStruct("layout_8_2");
                                }}
                              /> */}
                            </Flex>
                          </Box>
                        </MenuList>
                      </Menu>
                    ) : (
                      <></>
                    )}

                    <AlignVertically
                      className=" icon mx-2 w-[27px] my-auto"
                      variant="Linear"
                      size={24}
                    />
                    <Refresh
                      className=" icon mx-2 w-[27px] my-auto"
                      variant="Linear"
                      size={24}
                    />
                    {location.pathname === "/dashboard" ? (<Menu position="relative">
                      <MenuButton as={Button} className="!bg-transparent !p-0">
                        <Share
                          className=" icon mx-2 w-[27px] "
                          variant="Linear"
                          size={24}
                        />
                      </MenuButton>
                      <MenuList
                        className=" backdrop-blur-[23px]"
                        bg="gray.glass"
                        py="4px"
                        zIndex={"20"}
                        borderRadius={"6px"}
                        border="1px"
                        borderColor="gray.stroke"
                        minW={0}
                        w="240px"
                        position={"absolute"}
                        top="4px"
                        right={"-58px"}
                        p="0px"
                      >
                        <Box my="8px">
                          {ShareMenu.map((ele, i) => (
                            <Box
                             
                              borderRadius={"6px"}
                              w="93%"
                              color={"gray.100"}
                              py="8px"
                              mx="8px"
                              px={"12px"}
                              key={i}
                              onClick={() => { handleShare(ele.href) }}
                              _hover={{ bg: "white.200", color: "white" }}
                            >
                              <Box>
                                <MenuItem
                                  px="0px"
                                  py="0px"
                                  fontSize={12}
                                  bg="transparent"
                                >
                                  {ele.name}
                                </MenuItem>
                                <Text
                                  fontSize={"8px"}
                                  _hover={{ color: "gray.100" }}
                                  color={"gray.100"}
                                >
                                  {ele.description}
                                </Text>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} share={share} />
                      </MenuList>
                    </Menu>) : <></>}
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box
          border={"2px"}
          borderColor="gray.stroke"
          bg="gray.main"
          className="  ml-1 mr-2 rounded-lg "
        >
          <Flex className="px-4" justify={"space-between"} align={"center"}>
            <Menu position="relative">
              <MenuButton as={Button} className="!bg-transparent !p-0">
                <EmptyWallet className="mx-2 icon" variant="Linear" size={24} />
              </MenuButton>
              <MenuList
                className=" backdrop-blur-[23px]"
                bg="gray.glass"
                py="4px"
                borderRadius={"6px"}
                border="1px"
                borderColor="gray.stroke"
                minW={0}
                w="240px"
                position={"absolute"}
                top="6px"
                zIndex={20}
                right={"-42px"}
                p="0px"
              >
                <Box my="8px">
                  <Box py="8px" mx="8px" px={"12px"}>
                    {!account ? (<Box
                      bg={"blue"}
                      onClick={() => connect()}
                      className="py-2 px-4 rounded-md cursor-pointer  "
                    >
                      Connect
                    </Box>) :
                      (<Box>
                        <Flex pb={"8px"} align="center">
                          <img
                            alt="layout"
                            src={require("../../assets/bluedot.png")}
                            width={24}
                            height={24}
                          />
                          <Text px="8px" fontSize={12}>
                            {/* 0xd2...2z80 */}
                            {(account[0])?.slice(0, 5)}...{account[0].substring(account[0].length - 6)}
                          </Text>
                        </Flex>
                        <Text color="gray.100" fontSize={8}>
                          Balance
                        </Text>
                        <Text fontSize={12} color="white">
                          $ {Number(balance)?.toFixed(4)} ETH
                        </Text>
                      </Box>)}
                  </Box>
                </Box>
              </MenuList>
            </Menu>
            <Setting2 onClick={()=> {
              navigate("/settings");
              }} 
              className="mx-2 icon" variant="Linear" size={24} />
            <Menu position="relative">
              <MenuButton as={Button} className="!bg-transparent !p-0">
                <User className="mx-2 icon" variant="Linear" size={24} />
              </MenuButton>
              <MenuList
                className=" backdrop-blur-[23px]"
                bg="gray.glass"
                py="4px"
                borderRadius={"6px"}
                border="1px"
                borderColor="gray.stroke"
                minW={0}
                w="203px"
                position={"absolute"}
                top="4px"
                zIndex={10}
                right={"-58px"}
                p="0px"
              >
                <Box my="8px">
                  {AccountMenu.map((ele, i) => (
                    // <Link key={i} to={ele.href}>
                    <MenuItem
                      borderRadius={"6px"}
                      w="90%"
                      _hover={{ bg: "white.200", color: "white" }}
                      mx="8px"
                      px={"12px"}
                      color={"gray.100"}
                      fontSize={12}
                      py="8px"
                      bg="transparent"
                      onClick={() => handleMenuClick(ele.href)}
                      name={ele.name}
                    >
                      {ele.name}
                    </MenuItem>
                    // </Link>
                  ))}
                </Box>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// save selected layout style to local storage
// function setLayoutStruct(value) {
//
//if(global.localStorage){
//     global.localStorage.setItem("layoutStyle" , value);
//   }
// }
