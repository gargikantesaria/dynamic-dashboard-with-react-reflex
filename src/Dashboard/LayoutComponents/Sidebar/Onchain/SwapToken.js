import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { Account, AccountBalance } from "../../../../atoms";
import AutoComplete from "./AutoComplete";
import { useToast } from "@chakra-ui/react";
import qs from "qs";
import BigNumber from "bignumber.js";
import Web3 from 'web3';
import swap from "../../../../assets/swap.svg"
import downArrow from "../../../../assets/downArrow.svg"
import { useTokens } from "../../../../queries/hooks";

function SwapToken() {
  const toast = useToast({
    containerStyle: {
      color: "white",
    },
  });
  // toast({
  //       title: "Command",
  //       description: "Number is not supported in Terminal !",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //     });

  const [Connect, setConnect] = useState(false);
  const [amtError, setAmtError] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState({ from: "1", to: "0" });
  const [gasEstimate, setGaseEstimate] = useState("");

  const [token, setToken] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [approve, setApprove] = useState(false);

  const [account, setAccount] = useAtom(Account);
  const [balance, setBalance] = useAtom(AccountBalance);

  // useEffect(() => {
  //   listAvailableTokens();
  // }, []);

  // async function listAvailableTokens() {
  //   let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
  //   let tokenListJSON = await response.json();
  //   setToken(tokenListJSON.tokens);
  // }
  const { data, isSuccess } = useTokens();
 

  const erc20abi = [
    {
      inputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        { internalType: 'string', name: 'symbol', type: 'string' },
        { internalType: 'uint256', name: 'max_supply', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'burnFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
      ],
      name: 'decreaseAllowance',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'addedValue', type: 'uint256' }
      ],
      name: 'increaseAllowance',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'recipient', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'sender', type: 'address' },
        { internalType: 'address', name: 'recipient', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];


  async function getPrice() {
    console.log("Getting Price");

    if (!selectedCoin1 || !selectedCoin2 || !amount.from) return;
    let Totalamount = Number(amount.from * 10 ** selectedCoin1?.decimals);

    const params = {
      sellToken: selectedCoin1.address,
      buyToken: selectedCoin2.address,
      sellAmount: Totalamount,
    };

    // Fetch the swap price.
    const response = await fetch(
      `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`
    );

    let swapPriceJSON = await response.json();
    console.log("Price: ", swapPriceJSON);
    setAmtError(false);
    setAmount({
      from: amount.from,
      to: Number(swapPriceJSON.price).toFixed(5),
      // to: swapPriceJSON.price / 10 ** selectedCoin1.decimals,
    });
    setGaseEstimate(swapPriceJSON.estimatedGas);

    // document.getElementById("Approve_0x_button").disabled = true;
    // document.getElementById("token_selected").innerHTML = currentTrade.from.symbol;
  }
  async function getQuote(account) {
    try {
      console.log("Getting Quote");

      if (!selectedCoin1 || !selectedCoin2 || !amount.from) return;
      let sellAmount = Number(amount.from * 10 ** selectedCoin1.decimals);

      const params = {
        sellToken:selectedCoin1.address,
        buyToken:selectedCoin2.address,
        sellAmount: sellAmount,
        takerAddress: account,
        buyTokenPercentageFee: 0.001,
        feeRecipient: "0xf5488224cf8382A0dffD7bBAB1ef32a9284b67cb",
      };

      console.log("params:", params);
      // Fetch the swap quote.
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
      );
      //  console.log("response:", response);

      console.log("status:", response?.status, response?.type);
      if (response.status == 400) {
        toast({
        title: "Check Price",
        description: "Token Amount is higher than your Tokens !",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
        setAmtError(true);
        setAmount({ from: "", to: "" });
        console.log("error", response.status);
        // document.getElementById("errorarea").innerHTML = "error occured, status"+response.status ;
      }

      let swapQuote = await response.json();
      console.log("Quote: ", swapQuote);

      setAmount({
        from: amount.from,
        to: swapQuote.buyAmount / 10 ** selectedCoin1.decimals,
      });

      // document.getElementById("to_amount").value = swapQuoteJSON.buyAmount / (10 ** currentTrade.to.decimals);
      // document.getElementById("gas_estimate").innerHTML =swapQuoteJSON.estimatedGas ;
      setGaseEstimate(swapQuote.estimatedGas);

      console.log(amtError);
      return swapQuote;
    } catch (error) {
      console.log("error::::::", error);
    }
  }
  async function trySwap() {
    setSwapLoading(true);
    console.log("trying swap");
    // Only work if MetaMask is connect
    // Connecting to Ethereum: Metamask
    const web3 = new Web3(Web3.givenProvider);

    // The address, if any, of the most recently used account that the caller is permitted to access
    let accounts = await window.ethereum.request({ method: "eth_accounts" });
    let takerAddress = accounts[0];
    console.log("takerAddress: ", takerAddress);
    let swapQuoteJSON = await getQuote(takerAddress);
    if (swapQuoteJSON?.gas) {
      console.log("swapQuoteJSON:", swapQuoteJSON);
      // Set Token Allowance
      // Set up approval amount
      const fromTokenAddress = selectedCoin1.address;
      const maxApproval = new BigNumber(2).pow(256).minus(1);
      console.log("approval amount: ", maxApproval);
      const ERC20TokenContract = new web3.eth.Contract(
        erc20abi,
        fromTokenAddress
      );
      console.log("setup ERC20TokenContract: ", ERC20TokenContract);
      console.log(
        "swapQuoteJSON.allowanceTarget:",
        swapQuoteJSON.allowanceTarget,
        maxApproval
      );
      // Grant the allowance target an allowance to spend our tokens.
      //       const tx = await ERC20TokenContract.methods
      //         .approve(swapQuoteJSON.allowanceTarget, maxApproval)
      //         .send({ from: takerAddress,gasLimit: 60000})
      //         .then((tx) => {
      //           console.log("tx: ", tx);
      //         });
      // console.log(tx)

      // Perform the swap
      const receipt = await web3.eth.sendTransaction(swapQuoteJSON, {
        gasLimit: 500000,
      });
      setSwapLoading(false);
      toast({
        title: "Swap done",
        description: "Successfully Swapped !",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log("receipt: ", receipt);
    }
  }
  async function approve0x() {
    try {
      // Only work if MetaMask is connect
      // Connecting to Ethereum: Metamask
      const web3 = new Web3(Web3.givenProvider);

      // The address, if any, of the most recently used account that the caller is permitted to access
      let accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts[0] == null) {
        setApprove(false);
        document.getElementById("Approve_0x_button").disabled = false;
        return;
      }
      let takerAddress = accounts[0];
      if (selectedCoin1) {
        const ERC20TokenContract = new web3.eth.Contract(
          erc20abi,
          selectedCoin1.address
        );
        // // goerli address
        ERC20TokenContract.methods
          .allowance(takerAddress, "0xdef1c0ded9bec7f1a1670819833240f027b25eff")
          .call()
          .then(async function (tx) {
            console.log("txs:", tx);
            if (tx == 0) {
              const maxApproval = new BigNumber(2).pow(256).minus(1);

              // Grant the allowance target an allowance to spend our tokens.
              const _txApp = await ERC20TokenContract.methods
                .approve(
                  "0xdef1c0ded9bec7f1a1670819833240f027b25eff", // goerli address
                  maxApproval
                )
                .send({ from: takerAddress })
                .then((tx) => {
                  console.log("tx: ", tx);                 
                });
            } else {
              setApprove(true)
              document.getElementById("Approve_0x_button").innerHTML =
                "Approved";
            }
          });
      }
    } catch (error) {
      console.log(error);
      document.getElementById("Approve_0x_button").disabled = false;
      return;
    }
  }

  return (
    <>
      <Box position={"relative"} mt={"24px"} mb={"36px"}>
        <Box>
          <Text pb={"4px"} fontSize={"10px"} fontWeight="500">
            You Pay
          </Text>
          <Box
            borderRadius={"6px"}
            px="20px"
            py="12px"
            bg="white.100"
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Flex direction="column">
              <Input
                onChange={(e) => {
                  setGaseEstimate('');
                  setAmount({ from: e.target.value, to: amount.to })
                }}
                fontWeight={"500"}
                w={"100px"}
                borderColor={"transparent"}
                px="0px"
                py="0px"
                border={"none"}
                size={"14px"}
                value={amount.from}
              />
              <Text mt={2} fontSize={"10px"}>
                Balance : {Number(balance).toFixed(6)}
              </Text>
            </Flex>
            <Box>
              {loading1 ? <div className=""> ... </div> : <Flex cursor={"pointer"}  onClick={() => {
                                       setIsOpen1(true);
                      }} align={"center"}>
                <img
                  alt="logo"
                  className="rounded-full"
                  src={
                    selectedCoin1
                      ? selectedCoin1.logoURI
                      : require("../../../../assets/usdt.png")
                  }
                  width={20}
                  height={20}
                />
                <Text
                  cursor={"pointer"}
                 
                  fontSize={"10px"}
                  fontWeight={"500"}
                  mx="8px"
                >
                  {selectedCoin1 ? selectedCoin1.symbol : "USDT"}{" "}
                 
                </Text>
                <img
                alt="downarrow"
                src={downArrow}
                width={10}
                height={5}
              />
              </Flex>} 
              <AutoComplete
                    setIsOpen={setIsOpen1}
                    options={data?.tokens}
                    isOpen={isOpen1}
                    loading={setLoading1}
                    onSelect={setSelectedCoin1}
                  />
            </Box>
          </Box>
        </Box>
        <Box
          pos={"absolute"}
          bottom="-18px"
          left={"48%"}
          w="32px"
          py="4px"
          px={"6px"}
          height={"32px"}
          borderRadius={"8px"}
          borderWidth={"2px"}
          bg="gray.main"
          borderColor="gray.stroke"
        >
          <img alt="swap" src={swap} width={16} height={20} />
        </Box>
      </Box>
      {amtError ? (
        <>
          <span className="text-[10px] text-red-500 pl-2 "> *</span><span className="text-[10px] text-white"> Entered
          Token Amount is higher than your Tokens</span>
        </>
      ) : (
        <></>
      )}
      <Box mt={"24px"} mb={"30px"}>
        <Text pb={"4px"} fontSize={"10px"} fontWeight="500">
          You Recieve
        </Text>
        <Box
          borderRadius={"6px"}
          px="20px"
          py="12px"
          bg="white.100"
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Flex direction="column">
            <Text
              fontWeight={"500"}
              w={"100px"}
              // bg="gray.glass"
              borderColor={"transparent"}
              borderRadius="12px"
              px="10px"
              py="0px"
              border={"none"}
              size={"14px"}
            >
              
             {amount.to}
            </Text>
            {/* <Input
              onChange={() => {}}
             
              value={"141.00"}
            /> */}
            <Text mt={2} ml="4px" fontSize={"10px"}>
              Estimate Gas : {gasEstimate?gasEstimate:"0"}
            </Text>
          </Flex>
          <Box>
            {loading2 ? <div className="dots-flow"></div> : <Flex cursor={"pointer"} onClick={() => {
              // setLoading2(true)
              setIsOpen2(true);              
            }} align={"center"}>
              <img
                alt="logo"
                className="rounded-full"
                src={
                  selectedCoin2
                    ? selectedCoin2.logoURI
                    : require("../../../../assets/usdt.png")
                }
                width={20}
                height={20}
              />
              <Text
                cursor={"pointer"}
               
                fontSize={"10px"}
                fontWeight={"500"}
                mx="8px"
              >
                {selectedCoin2 ? selectedCoin2.symbol : "Select Token"}{" "}
               
              </Text>
              <img
              alt="arrow"
              src={downArrow}
              width={10}
              height={5}
            />
            </Flex>}
            <AutoComplete
                  setIsOpen={setIsOpen2}
                  options={data?.tokens}
                  isOpen={isOpen2}
                  loading={setLoading2}
                  onSelect={setSelectedCoin2}
                />
          </Box>
        </Box>
      </Box>
      <Box w={"100%"}>
        {!gasEstimate ? (
          <Button
            fontWeight={"semibold"}
            borderRadius={"6px"}
            onClick={getPrice}
            w={"100%"}
            bg={"blue"}
          >
            Check
          </Button>
        ) : approve ? (
          <Button
            fontWeight={"semibold"}
            borderRadius={"6px"}
            onClick={trySwap}
            w={"100%"}
            bg={"blue"}
          >
            Swap
          </Button>
        ) : (
          <Button
            fontWeight={"semibold"}
            borderRadius={"6px"}
            w={"100%"}
            onClick={approve0x}
                bg={"blue"}
                id="Approve_0x_button"
          >
            Approve
          </Button>
        )}
      </Box>
    </>
  );
}

export default SwapToken;
