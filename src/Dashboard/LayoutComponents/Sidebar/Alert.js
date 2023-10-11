import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  Add,
  CloseSquare,
  Copy,
  CopySuccess,
  Setting3,
  TimerPause,
} from "iconsax-react";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAlertsData } from "../../../queries/hooks";
import { useAtom } from "jotai";
import {
  useDeleteAlerts,
  usePostAlerts,
  useUpdateAlerts,
} from "../../../queries/mutation";
import moment from "moment";

const Alert = () => {
  const format = (val) => val;
  const parse = (val) => val.replace(/^\$/, "");
  const [activeAlertID, setActiveAlertID] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const [alertData, setAlertData] = useState([]);
  const [fetchNewAlerts, setFetchNewAlerts] = useState(false);
  const [isOpenAddAlert, setIsOpenAddAlert] = useState(false);
  const [newAlertName, setNewAlertName] = useState("");
  const [AlertConfirmation, setAlertConfirmation] = useState(false);
  const [ActiveConfirmation, setActiveConfirmation] = useState(false);
  const [editAlertState, setEditAlertState] = useState(false);
  const [activeAlertObject, setActiveAlertObject] = useState({});
  const [tokenAddress, setTokenAddress] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [threshold, setThreshold] = useState("0.0");
  const [endpoint, setEndpoint] = useState("");
  const [endpointURL, setEndpointURL] = useState("");
  const [AlertEditName, setAlertEditName] = useState("");
  const TokenAddressRegex = /^0x[a-fA-F0-9]{40}$/g,
    WalletAddressRegex = /^0x[a-fA-F0-9]{40}$/g;

  const { data, isLoading } = useAlertsData();
  //   console.log(AlertsData, "alerts");
  // if(AlertsData?.isFetched)
  useEffect(() => {
    const setFetchedAlerts = () => {
      setAlertData(data?.alerts);
    };
    setFetchedAlerts();
  }, [data]);
  const mutateAddAlerts = usePostAlerts({
    onSuccess: (data) => {
      //   console.log(data, "sas");
      setAlertData([...alertData, data.Alert]);
    },
    onError: (e) => {},
  });
  const mutateDeleteAlerts = useDeleteAlerts({
    onSuccess: (data) => {},
    onError: (e) => {},
  });
  const mutateEditAlerts = useUpdateAlerts({
    onSuccess: (data) => {},
    onError: (e) => {},
  });
  //   console.log(AlertsData);
  const onCloseAddAlertConfirmation = () => {
    setAlertConfirmation(false);
  };

  const onCloseAddActiveConfirmation = () => {
    // console.log("Active/Inactive");
    setActiveConfirmation(false);
  };
  const editAlert = (alertID) => {
    // console.log(alertID);
    const alert = alertData.find((item) => item.id === alertID);
    // setNewAlertName(alert.name)
    setAlertEditName(alert.name);
    setActiveAlertObject(alert);
    setTokenAddress(alert.token_address);
    alert.alert_id = alertID;
    setWalletAddress(alert.address);
    setThreshold(alert.threshold);
    setEndpoint(alert.endpoint);
    setEndpointURL(alert.endpoint_url);

    // console.log(alert);
    setEditAlertState(true);
  };

  const handleRemoveAlertConfirm = async () => {
    mutateDeleteAlerts.mutateAsync(activeAlertID);
    setAlertConfirmation(false);
    setAlertData(alertData?.filter((alert) => alert.id !== activeAlertID));
  };
  const handleRemoveActiveConfirm = async () => {
    // console.log(activeAlertID)

    let updatedAlertData;
    alertData.map((alert) => {
      if (alert.id === activeAlertID) {
        alert.is_active = alert.is_active ? false : true;
        alert.alert_id = alert.id;
        updatedAlertData = alert;
      }
    });
    const { alert_id, is_active, token_address } = updatedAlertData;
    const newAlert = {
      alert_id,
      is_active,
      token_address,
    };

    if (newAlert) {
      
      mutateEditAlerts.mutateAsync( newAlert);
      setActiveConfirmation(false);
    }
  };

  // remove alert
  const handleRemoveAlert = (alertID) => {
    setAlertConfirmation(true);
  };
  const onCloseEditAlert = () => {
    setNewAlertName("");
    setTokenAddress("");
    setWalletAddress("");
    setThreshold(0);
    setEndpointURL("");
    setEditAlertState(false);
  };
  const changeAlertState = (alertID) => {
    // console.log(alertID);
    setActiveConfirmation(true);
  };
  // copy text to clipboard
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
    return;
  }

  // oprn add alert modal
  const onOpenAddAlert = async () => {
    setIsOpenAddAlert(true);
  };

  // close add alert modal
  const onCloseAddAlert = () => {
    setNewAlertName("");
    setTokenAddress("");
    setWalletAddress("");
    setThreshold(0);
    setEndpointURL("");
    setIsOpenAddAlert(false);
  };

  const onSaveAndCloseEditAlert = async () => {
    // console.log(activeAlertObject);

    activeAlertObject.name = AlertEditName;
    activeAlertObject.token_address = tokenAddress;
    activeAlertObject.alert_id = activeAlertID;
    activeAlertObject.threshold = threshold;
    activeAlertObject.address = walletAddress;
    activeAlertObject.endpoint = endpoint;
    activeAlertObject.endpoint_url = endpointURL;
    // console.log(activeAlertObject);

    mutateEditAlerts.mutateAsync(activeAlertObject);

    setEditAlertState(false);
  };

  // save and close add alert modal
  const onSaveAndCloseAddAlert = async () => {
    const date = new Date();
    const newAlertObj = {
      //   id: alertData[alertData.length - 1].id + 1,
      name: newAlertName,
      token: "BTC USD",
      status: "Active",
      created_at: `${date.toLocaleString([], { month: "short" })} ${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      } ${date.toTimeString().split(" ")[0]}`,
    };
    newAlertObj.token_address = tokenAddress;
    newAlertObj.address = walletAddress;
    newAlertObj.threshold = threshold;
    newAlertObj.endpoint = endpoint;
    newAlertObj.endpoint_url = endpointURL;

    if (
      TokenAddressRegex.test(tokenAddress) &&
      WalletAddressRegex.test(walletAddress)
    ) {
      setAlertData([...alertData, newAlertObj]);
      if (
        newAlertObj.name &&
        newAlertObj.token_address &&
        newAlertObj.address &&
        newAlertObj.threshold &&
        newAlertObj.endpoint &&
        newAlertObj.endpoint_url
      ) {
        // make a call here to add a new alert
        // console.log("heyhey");

        // if (accessToken) {
        mutateAddAlerts.mutateAsync(newAlertObj);
        setFetchNewAlerts(true);
        // }

        setNewAlertName("");
        setIsOpenAddAlert(false);
      }
    } else {
      setNewAlertName("");
      setTokenAddress("");
      setWalletAddress("");
      setThreshold(0);
      setEndpointURL("");
      console.error("The token address or the wallet address is invalid!");
      setIsOpenAddAlert(false);
    }
  };
  const handleOptionChange = (event) => {
    setEndpoint(event.target.value);
  };
  return (
    <Box h={"100%"}>
      <Flex my="2px" align={"center"} justify={"space-between"}>
        <Text fontWeight={"semibold"} fontSize={"14px"}>
          Alerts
        </Text>
        <Add
          cursor={"pointer"}
          className=""
          variant="Linear"
          size={24}
          onClick={async () => onOpenAddAlert()}
        />
      </Flex>

      <Box h={"100%"} overflow={"hidden"}>
        <Box overflowY={"scroll"} fontSize={"12px"} h={"94%"} my={"14px"}>
          <Tabs>
            <TabList className="border-0 mb-3 bg-[#2C2C30] rounded-md flex">
              <Tab className="w-3/6 alertStatusTabs">Active</Tab>
              <Tab className="w-3/6 alertStatusTabs">Inactive</Tab>
            </TabList>
            {/* Active Alerts */}
            <TabPanel>
              {alertData
                ?.filter((alert) => alert.is_active === true)
                ?.map((alert, i) => (
                  <Flex
                    key={`alert-${i}`}
                    cursor={"pointer"}
                    mb={"12px"}
                    py={"8px"}
                    borderRadius={"6px"}
                    px={"16px"}
                    justify={"space-between"}
                    align="center"
                    className="!block py-3"
                    onClick={() => setActiveAlertID(alert.id)}
                    bg={`${
                      activeAlertID === alert.id ? "white.300" : "white.100"
                    }`}
                  >
                    <Flex>
                      <div className="w-[70%]">
                        <Text fontWeight={"semibold"} fontSize={"14px"}>
                          {alert.name}
                        </Text>
                        <Box
                          align={"center"}
                          display={"flex"}
                          fontSize={"10px"}
                        >
                          <Text pr={"10px"} color={"#1464FF"}>
                            {alert.is_active ? "Active" : "Inactive"}
                          </Text>
                          <Text>
                            {moment(alert?.created_at)?.format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Text>
                        </Box>
                      </div>
                      <div
                        className={`iconsDiv w-[30%] ${
                          activeAlertID === alert.id
                            ? "flex justify-center items-center"
                            : "hidden"
                        }`}
                      >
                        <TimerPause
                          cursor={"pointer"}
                          className="icon mr-2"
                          variant="Linear"
                          size={24}
                          onClick={() => {
                            changeAlertState(alert.id);
                          }}
                        />
                        <Setting3
                          cursor={"pointer"}
                          className="icon mr-2"
                          variant="Linear"
                          size={24}
                          onClick={() => {
                            editAlert(alert.id);
                          }}
                        />
                        <CloseSquare
                          cursor={"pointer"}
                          className="icon"
                          variant="Linear"
                          size={24}
                          onClick={() => {
                            handleRemoveAlert(alert.id);
                          }}
                        />
                      </div>
                    </Flex>
                  </Flex>
                ))}
            </TabPanel>
            {/* Inactive Alerts */}
            <TabPanel>
              {alertData
                ?.filter((alert) => alert.is_active === false)
                ?.map((alert, i) => (
                  <Flex
                    key={`alert-${i}`}
                    cursor={"pointer"}
                    mb={"12px"}
                    py={"8px"}
                    borderRadius={"6px"}
                    px={"16px"}
                    justify={"space-between"}
                    align="center"
                    className="!block py-3"
                    onClick={() => setActiveAlertID(alert.id)}
                    bg={`${
                      activeAlertID === alert.id ? "white.300" : "white.100"
                    }`}
                  >
                    <Flex>
                      <div className="w-[70%]">
                        <Text fontWeight={"semibold"} fontSize={"14px"}>
                          {alert.name}
                        </Text>
                        <Box
                          align={"center"}
                          display={"flex"}
                          fontSize={"10px"}
                        >
                          <Text pr={"10px"} color={"#1464FF"}>
                            {alert.is_active ? "Active" : "Inactive"}
                          </Text>
                          <Text>
                            {moment(alert?.created_at)?.format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Text>
                        </Box>
                      </div>
                      <div
                        className={`iconsDiv w-[30%] ${
                          activeAlertID === alert.id
                            ? "flex justify-center items-center"
                            : "hidden"
                        }`}
                      >
                        <TimerPause
                          cursor={"pointer"}
                          className="icon mr-2"
                          variant="Linear"
                          size={24}
                          onClick={() => {
                            changeAlertState(alert.id);
                          }}
                        />
                        <Setting3
                          cursor={"pointer"}
                          className="icon mr-2"
                          variant="Linear"
                          size={24}
                          onClick={() => {
                            editAlert(alert.id);
                          }}
                        />
                        <CloseSquare
                          cursor={"pointer"}
                          className="icon"
                          variant="Linear"
                          size={24}
                          onClick={() => {
                            handleRemoveAlert(alert.id);
                          }}
                        />
                      </div>
                    </Flex>
                  </Flex>
                ))}
            </TabPanel>
          </Tabs>
        </Box>
      </Box>

      {/* Model for confirming on close alert */}
      <Modal
        isCentered
        isOpen={AlertConfirmation}
        onClose={onCloseAddAlertConfirmation}
      >
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          maxWidth={700}
          color={"white"}
          backgroundColor={"gray.glass"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mt-1 mb-10">
            <div style={{ color: "#B7B7B7", fontSize: "12px" }}>
              Are you sure you want to delete this alert?
            </div>
          </ModalBody>
          <ModalFooter backgroundColor={"gray.main"} className="p-4 rounded">
            <Button
              color={"gray.200"}
              fontSize={"14px"}
              variant="ghost"
              fontWeight={"light"}
              onClick={() => {
                onCloseAddAlertConfirmation();
              }}
            >
              No
            </Button>
            <Button
              fontWeight={"light"}
              fontSize={"14px"}
              backgroundColor={"blue"}
              mr={3}
              ml={1}
              onClick={() => {
                handleRemoveAlertConfirm();
              }}
              disabled={newAlertName === "" ? true : false}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Model for confirming on timer being inactive from active */}
      <Modal
        isCentered
        isOpen={ActiveConfirmation}
        onClose={onCloseAddActiveConfirmation}
      >
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          maxWidth={700}
          color={"white"}
          backgroundColor={"gray.glass"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mt-1 mb-10">
            <div style={{ color: "#B7B7B7", fontSize: "12px" }}>
              Are you sure you want to pause/resume this alert?
            </div>
          </ModalBody>
          <ModalFooter backgroundColor={"gray.main"} className="p-4 rounded">
            <Button
              color={"gray.200"}
              fontSize={"14px"}
              variant="ghost"
              fontWeight={"light"}
              onClick={() => {
                onCloseAddActiveConfirmation();
              }}
            >
              No
            </Button>
            <Button
              fontWeight={"light"}
              fontSize={"14px"}
              backgroundColor={"blue"}
              mr={3}
              ml={1}
              onClick={() => {
                handleRemoveActiveConfirm();
              }}
              disabled={newAlertName === "" ? true : false}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for editing the alert field */}
      <Modal isCentered isOpen={editAlertState} onClose={onCloseEditAlert}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          maxWidth={700}
          color={"white"}
          backgroundColor={"gray.glass"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mt-1 mb-10">
            <Input
              className="mb-10"
              fontSize={"16px"}
              onChange={(e) => {
                setAlertEditName(e.target.value);
              }}
              value={AlertEditName}
              variant={"unstyled"}
              placeholder="Update Alert Name"
            />

            <div style={{ color: "#B7B7B7", fontSize: "12px" }}>
              Token Address:
              <Input
                width={"100%"}
                size={"12px"}
                lineHeight={"250%"}
                bg="rgba(255, 255, 255, 0.04)"
                borderColor="rgba(255, 255, 255, 0.04)"
                color="white"
                variant="filled"
                onChange={(e) => {
                  setTokenAddress(e.target.value);
                }}
                className="mt-1 mb-3 pl-2"
                value={tokenAddress}
              ></Input>
              Address:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <Input
                  width={"100%"}
                  size={"12px"}
                  lineHeight={"250%"}
                  bg="rgba(255, 255, 255, 0.04)"
                  borderColor="rgba(255, 255, 255, 0.04)"
                  color="white"
                  variant="filled"
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                  }}
                  className="mt-1 mb-3 pl-2"
                  value={walletAddress}
                ></Input>
              </div>
              Threshold:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                  fontSize: "10px",
                }}
              >
                <NumberInput
                  onChange={(valueString) => setThreshold(parse(valueString))}
                  fontSize={"10px"}
                  value={format(threshold)}
                  style={{ width: "100%" }}
                  className="mt-1 mb-3"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper color={"white"} />
                    <NumberDecrementStepper color={"white"} />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              Endpoint:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <Select
                  width={"100%"}
                  size={"12px"}
                  lineHeight={"250%"}
                  bg="rgba(255, 255, 255, 0.04)"
                  borderColor="rgba(255, 255, 255, 0.04)"
                  color="white"
                  variant="filled"
                  className="mt-1 mb-3 pl-2"
                  onChange={handleOptionChange}
                  value={endpoint}
                >
                  <option
                    style={{
                      color: "#B7B7B7",
                      fontSize: "12px",
                      background: "rgba(33, 33, 36, 0.67)",
                    }}
                    value="discord"
                  >
                    Discord
                  </option>
                  <option
                    style={{
                      color: "#B7B7B7",
                      fontSize: "12px",
                      background: "rgba(33, 33, 36, 0.67)",
                    }}
                    value="telegram"
                  >
                    Telegram
                  </option>
                </Select>
              </div>
              Endpoint URL:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <Input
                  fontSize={"12px"}
                  onChange={(e) => {
                    setEndpointURL(e.target.value);
                  }}
                  value={endpointURL}
                  variant={"outline"}
                  placeholder="Endpoint URL"
                  className="mt-1 mb-3 pl-2"
                  _placeholder={{
                    color: "gray.200",
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "24px",
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter backgroundColor={"gray.main"} className="p-4 rounded">
            <Button
              color={"gray.200"}
              fontSize={"14px"}
              variant="ghost"
              fontWeight={"light"}
              onClick={() => {
                onCloseEditAlert();
              }}
            >
              Discard
            </Button>
            <Button
              fontWeight={"light"}
              fontSize={"14px"}
              backgroundColor={"blue"}
              mr={3}
              ml={1}
              onClick={() => {
                onSaveAndCloseEditAlert();
              }}
              disabled={newAlertName === "" ? true : false}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for add new alert */}
      <Modal isCentered isOpen={isOpenAddAlert} onClose={onCloseAddAlert}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          maxWidth={700}
          color={"white"}
          backgroundColor={"gray.glass"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mt-1 mb-10">
            <Input
              className="mb-10"
              fontSize={"16px"}
              onChange={(e) => {
                setNewAlertName(e.target.value);
              }}
              value={newAlertName}
              variant={"unstyled"}
              placeholder="Name New Alert"
            />

            <div style={{ color: "#B7B7B7", fontSize: "12px" }}>
              Token Address:
              <Input
                width={"100%"}
                size={"12px"}
                lineHeight={"250%"}
                bg="rgba(255, 255, 255, 0.04)"
                borderColor="rgba(255, 255, 255, 0.04)"
                color="white"
                variant="filled"
                onChange={(e) => {
                  setTokenAddress(e.target.value);
                }}
                className="mt-1 mb-3 pl-2"
                value={tokenAddress}
              ></Input>
              Address:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <Input
                  width={"100%"}
                  size={"12px"}
                  lineHeight={"250%"}
                  bg="rgba(255, 255, 255, 0.04)"
                  borderColor="rgba(255, 255, 255, 0.04)"
                  color="white"
                  variant="filled"
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                  }}
                  className="mt-1 mb-3 pl-2"
                  value={walletAddress}
                ></Input>
              </div>
              Threshold:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                  fontSize: "10px",
                }}
              >
                <NumberInput
                  onChange={(valueString) => setThreshold(parse(valueString))}
                  fontSize={"10px"}
                  value={format(threshold)}
                  style={{ width: "100%" }}
                  className="mt-1 mb-3"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper color={"white"} />
                    <NumberDecrementStepper color={"white"} />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              Endpoint:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <Select
                  width={"100%"}
                  size={"12px"}
                  lineHeight={"250%"}
                  bg="rgba(255, 255, 255, 0.04)"
                  borderColor="rgba(255, 255, 255, 0.04)"
                  color="white"
                  variant="filled"
                  className="mt-1 mb-3 pl-2"
                  onChange={handleOptionChange}
                  value={endpoint}
                >
                  <option
                    style={{
                      color: "#B7B7B7",
                      fontSize: "12px",
                      background: "rgba(33, 33, 36, 0.67)",
                    }}
                    value="discord"
                  >
                    Discord
                  </option>
                  <option
                    style={{
                      color: "#B7B7B7",
                      fontSize: "12px",
                      background: "rgba(33, 33, 36, 0.67)",
                    }}
                    value="telegram"
                  >
                    Telegram
                  </option>
                </Select>
              </div>
              Endpoint URL:
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <Input
                  fontSize={"12px"}
                  onChange={(e) => {
                    setEndpointURL(e.target.value);
                  }}
                  value={endpointURL}
                  variant={"outline"}
                  placeholder="Endpoint URL"
                  className="mt-1 mb-3 pl-2"
                  _placeholder={{
                    color: "gray.200",
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "24px",
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter backgroundColor={"gray.main"} className="p-4 rounded">
            <Button
              color={"gray.200"}
              fontSize={"14px"}
              variant="ghost"
              fontWeight={"light"}
              onClick={() => {
                onCloseAddAlert();
              }}
            >
              Discard
            </Button>
            <Button
              fontWeight={"light"}
              fontSize={"14px"}
              backgroundColor={"blue"}
              mr={3}
              ml={1}
              onClick={() => {
                onSaveAndCloseAddAlert();
              }}
              disabled={newAlertName === "" ? true : false}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Alert;
