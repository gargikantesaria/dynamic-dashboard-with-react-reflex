import React, { useEffect, useMemo, useState } from "react";
import { TradePanelTabs , Tab } from "./TradePanelTabs";
import "./TradePanel.css";
import { useBalanceData, useCommandsData, useOpenOrdersData, usePositionData } from "../../../queries/hooks";
import { useAtom } from "jotai";
import { useCloseAllOpenOrdersData, useCloseAllPositionsData, useDeleteOpenOrder, useDeletePosition, useDeleteCommandData, useSendCommandData } from "../../../queries/mutation";
import Table from "../../ReusableComponents/Table";
import { BuildCommandSwapSidebarData, OPENORDERSTOKEN, SelectedSidebarMenu, STUB } from "../../../atoms";
import { Box } from "@chakra-ui/layout";
import { Button, CircularProgress, Spinner } from "@chakra-ui/react";

export const DashboardTables = {
  positions: 'positions',
  openOrders: 'open orders',
  balance: 'balance',
  commands: 'commands'
};

function TradePanel() {
  const [stub, setStub] = useAtom(STUB);

  const mutateDeletePosition = useDeletePosition({
    onSuccess: (res) => {
      if (res) {
        PositionsData.refetch();
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const mutateDeleteOpenOrder = useDeleteOpenOrder({
    onSuccess: (res) => {
      if (res) {
        OpenOrders.refetch();
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleDeletePositionData = (item,index) => {
    document.getElementById(`close-position-${index}`).classList.add("invisible");
    document.getElementById(`close-position-loader-${index}`).classList.remove("invisible");
    mutateDeletePosition.mutateAsync({
      stub: stub,
      symbol: item?.symbol,
    }).finally(()=>{
      document.getElementById(`close-position-${index}`).classList.remove("invisible");
      document.getElementById(`close-position-loader-${index}`).classList.add("invisible");
    });
  }

  const handleDeleteOpenOrder = (item,index) => {
    document.getElementById(`cancel-open-order-${index}`).classList.add("invisible");
    document.getElementById(`cancel-open-order-loader-${index}`).classList.remove("invisible");
    mutateDeleteOpenOrder.mutateAsync({
      stub: stub,
      id: item?.id,
      symbol: item?.symbol,
    }).finally(()=>{
      document.getElementById(`cancel-open-order-${index}`).classList.remove("invisible");
      document.getElementById(`cancel-open-order-loader-${index}`).classList.add("invisible");
    });
  }

  const PositionColumns = useMemo(
    () => [
      {
        accessorKey: "symbol",
        size: 100,
        header: "Symbol",
        muiTableBodyCellProps:{
          sx:{
            color: "#1464FF !important",
            fontWeight: "normal",
            fontSize: "12px",
            padding: "7px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.16)",
            border: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }
        }
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "direction",
        header: "Direction",
        size: 100,
        accessorFn: (item) => (
          <p className={`uppercase ${item?.direction === 'long' ? 'text-[#68AEA2]' : 'text-[#AE6868]'}`}>{item?.direction}</p>
        )
      },
      {
        accessorKey: "entry_price",
        accessorFn: (item) => <div>{item.entry_price?.toFixed(2)}</div>,
        header: "Entry Price",
        size: 105,
      },
      {
        // accessorKey: "entry_value",
        accessorFn: (item) => <div>{item.entry_value?.toFixed(2)}</div>,
        header: "Entry Value",
        size: 100,
      },
      {
        // accessorKey: "current_value",
        accessorFn: (item) => <div>{item.current_value?.toFixed(2)}</div>,
        header: "Current Value",
        size: 100,
      },
      {
        // accessorKey: "base_size",
        accessorFn: (item) => <div>{item.base_size?.toFixed(2)}</div>,
        header: "Base Size",
        size: 100,
      },
      {
        // accessorKey: "quote_size",
        accessorFn: (item) => <div>{item.quote_size?.toFixed(2)}</div>,
        header: "Quote Size",
        size: 100,
      },
      {
        // accessorKey: "usd_size",
        accessorFn: (item) => <div>{item.usd_size?.toFixed(2)}</div>,
        header: "USD Size",
        size: 100,
      },
      {
        // accessorKey: "liquidation_price",
        accessorFn: (item) => <div>{item.liquidation_price?.toFixed(2)}</div>,
        header: "Liquidation Price",
        size: 140,
      },
      {
        // accessorKey: "pnl",
        accessorFn: (item) => (
          <p className={`${item?.direction === 'long' ? 'text-[#68AEA2]' : 'text-[#AE6868]'}`}>{item.pnl?.toFixed(2)}</p>
        ),
        header: "PnL",
        size: 80,
      },
      {
        accessorKey: "delete",
        header: "Close",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps:{
          align: "center"
        },
        accessorFn: (item,i) => (
          <Box position='relative'>
          <Button
              fontWeight={"normal"}
              borderRadius={"6px"}
              w={"82px"}
              bg={"#1464FF"}
              className="py-1"
              id={`close-position-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePositionData(item,i);
              }}
            >
              Close
          </Button>
          {(
            <CircularProgress
              isIndeterminate
              id={`close-position-loader-${i}`}
              className="invisible"
              size={'20px'}
              color='#FFFFFF'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-10px',
                marginLeft: '-10px',
              }}
            />
          )}
          </Box>
        ),
        size: 80,
      },
    ],
    []
  );

  const OpenOrdersCols = useMemo(
    () => [
      {
        accessorKey: "symbol",
        header: "Symbol",
        size: 100,
        muiTableBodyCellProps:{
          sx:{
            color: "#1464FF !important",
            fontWeight: "normal",
            fontSize: "12px",
            padding: "7px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.16)",
            border: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }
        }
      },

      {
        accessorKey: "type",
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "direction",
        header: "Direction",
        size: 100,
        // size: 80,
      },
      {
        // accessorKey: "price",
        accessorFn: (item) => <div>{item.price?.toFixed(2)}</div>,
        header: "Price",
        size: 100,
      },
      {
        accessorKey: "trigger",
        size: 130,
        header: "Trigger",
        size: 90,
      },
      {
        // accessorKey: "size_base",
        accessorFn: (item) => <div>{item.size_base?.toFixed(2)}</div>,
        size: 130,
        header: "Base Size",
        size: 100,
      },
      {
        // accessorKey: "size_quote",
        accessorFn: (item) => <div>{item.size_quote?.toFixed(2)}</div>,
        size: 130,
        header: "Quote Size",
        size: 100,
      },
      {
        // accessorKey: "filled_quote",
        accessorFn: (item) => <div>{item.filled_quote?.toFixed(2)}</div>,
        size: 130,
        header: "Filled",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 85,
      },
      {
        // accessorKey: "timestamp",
        accessorFn: (item) => (
          <div>
            {/* {new Date(item.timestamp).toUTCString()} */}
            {new Date(parseInt(item?.timestamp)).toUTCString().slice(0, -4)}
          </div>
        ),
        size: 170,
        header: "Timestamp",
      },
      {
        accessorKey: "cancel",
        header: "Cancel",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps:{
          align: "center"
        },
        accessorFn: (item,i) => (
          <Box position='relative'>
          <Button
              fontWeight={"normal"}
              borderRadius={"6px"}
              w={"82px"}
              bg={"#1464FF"}
              className="py-1"
              id={`cancel-open-order-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteOpenOrder(item,i);
              }}
            >
              Cancel
          </Button>
          {(
            <CircularProgress
              isIndeterminate
              id={`cancel-open-order-loader-${i}`}
              className="invisible"
              size={'20px'}
              color='#FFFFFF'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-10px',
                marginLeft: '-10px',
              }}
            />
          )}
          </Box>
        ),
        size: 80,
      },
    ], [stub]
  );

  const BalanceColumns = [
    {
      accessorKey: "currency",
      header: "Currency",
      size: 100,
      muiTableBodyCellProps:{
        sx:{
          color: "#1464FF !important",
          fontWeight: "normal",
          fontSize: "12px",
          padding: "7px 8px",
          backgroundColor: "rgba(0, 0, 0, 0.16)",
          border: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        }
      }
    },
    {
      // accessorKey: "base.free",
      accessorFn: (item) => <div>{item.base.free?.toFixed(2)}</div>,
      header: "Base Free",
      size: 100,
    },
    {
      // accessorKey: "base.used",
      accessorFn: (item) => <div>{item.base.used?.toFixed(2)}</div>,
      header: "Base Used",
      size: 100,
    },
    {
      // accessorKey: "base.total",
      accessorFn: (item) => <div>{item.base.total?.toFixed(2)}</div>,
      header: "Base Total",
      size: 100,
    },
    {
      // accessorKey: "usd.free",
      accessorFn: (item) => <div>{item.usd.free?.toFixed(2)}</div>,
      header: "USD Free",
      size: 100,
    },
    {
      // accessorKey: "usd.used",
      accessorFn: (item) => <div>{item.usd.used?.toFixed(2)}</div>,
      header: "USD Used",
      size: 100,
    },
    {
      // accessorKey: "usd.total",
      accessorFn: (item) => <div>{item.usd.total?.toFixed(2)}</div>,
      header: "USD Total",
      size: 100,
    },
  ];

  const [sideBar, setSideBar] = useAtom(SelectedSidebarMenu);
  const [buildCommandSideBarData, setBuildCommandSideBarData] = useAtom(BuildCommandSwapSidebarData);
  const [ordersToken, setOrdersToken] = useAtom(OPENORDERSTOKEN);

  const PositionCols = useMemo(() => PositionColumns, []);
  const orderCols = useMemo(() => OpenOrdersCols, [OpenOrdersCols]);
  const BalanceCols = useMemo(() => BalanceColumns, []);

  const PositionsData = usePositionData(stub);
  const BalanceData = useBalanceData(stub);
  const OpenOrders = useOpenOrdersData(stub, ordersToken);
  const { data: CommandsData, refetch } = useCommandsData();
  
  // for data loading
  const [positionDataLoading, setPositionDataLoading] = useState(false);
  const [openOrderDataLoading, setOpenOrderDataLoading] = useState(false);
  const [balanceDataLoading, setBalanceDataLoading] = useState(false);
  const [commandsDataLoading, setCommandsDataLoading] = useState(false);

  const positionsLength = PositionsData?.data?.length;
  const balancesLength = BalanceData?.data?.length;
  const orderssLength = OpenOrders?.data?.length;
  const commandsLength = CommandsData?.data?.length;

  const [isLoadingCloseAll , setIsLoadingCloseAll] = useState(false);

  // handle on select row
  const onSelectTableRow = (tableName, data) => {
    switch (tableName) {
      // when click on row from commands table , open sidebar & pass data
      case DashboardTables.commands:
        setBuildCommandSideBarData(data);
        setSideBar({...sideBar, swap: true})
        return;
      default:
        return;
    }
  };

  // command table : for delete command
  const mutationDeleteCommand = useDeleteCommandData({
    onSuccess: (res) => {
      if (res) {
        refetch();
      }
    },
  });

  // command table : for send command
  const mutationSendCommand = useSendCommandData();

  const handleSendCommandData = (item) => {
    document.getElementById(`send-${item?.uid}`).classList.add("invisible");
    document.getElementById(`send-loader-${item?.uid}`).classList.remove("invisible");
    mutationSendCommand.mutateAsync({
      command: item.command
    }).finally(()=>{
      document.getElementById(`send-${item?.uid}`).classList.remove("invisible");
      document.getElementById(`send-loader-${item?.uid}`).classList.add("invisible");
    });
  }

  const handleDeleteCommandData = (item) => {
    document.getElementById(`delete-${item?.uid}`).classList.add("invisible");
    document.getElementById(`delete-loader-${item?.uid}`).classList.remove("invisible");
    mutationDeleteCommand.mutateAsync({
      name: item.commandname
    }).finally(()=>{
      document.getElementById(`delete-${item?.uid}`).classList.remove("invisible");
      document.getElementById(`delete-loader-${item?.uid}`).classList.add("invisible");
    });
  }

  // command table columns
  const CommandsCols = useMemo(
    () => [
      {
        accessorKey: "commandname",
        size: 100,
        header: "Name",
      },
      {
        accessorKey: "stub",
        size: 100,
        header: "Stub",
      },
      {
        accessorKey: "exchange",
        header: "Exchange",
        size: 100,
      },
      {
        accessorKey: "symbol",
        header: "Symbol",
        size: 80,
        muiTableBodyCellProps:{
          sx:{
            color: "#1464FF !important",
            fontWeight: "normal",
            fontSize: "12px",
            padding: "7px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.16)",
            border: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }
        }
      },
      {
        accessorKey: "command",
        size: 350,
        header: "Command",
      },
      {
        accessorKey: "timestamp",
        header: "Last Executed",
      },
      {
        accessorKey: "action",
        header: "Action",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps:{
          align: "center"
        },
        accessorFn: (item) => (
          <Box position='relative'>
            <Button
                fontWeight={"normal"}
                borderRadius={"6px"}
                w={"82px"}
                bg={"#1464FF"}
                className="py-1"
                id={`send-${item?.uid}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSendCommandData(item);
                }}
              >
                Send
            </Button>
            {(
                <CircularProgress
                  isIndeterminate
                  id={`send-loader-${item?.uid}`}
                  className="invisible"
                  size={'20px'}
                  color='#FFFFFF'
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-10px',
                    marginLeft: '-10px',
                  }}
                />
              )}
          </Box>
        ),
        size: 80,
      },
      {
        accessorKey: "delete",
        header: "Delete",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps:{
          align: "center"
        },
        accessorFn: (item) => (
          <Box position='relative'>
          <Button
              fontWeight={"normal"}
              borderRadius={"6px"}
              w={"82px"}
              bg={"#1464FF"}
              className="py-1"
              id={`delete-${item?.uid}`}
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteCommandData(item);
              }}
            >
              Delete
          </Button>
          {(
            <CircularProgress
              isIndeterminate
              id={`delete-loader-${item?.uid}`}
              className="invisible"
              size={'20px'}
              color='#FFFFFF'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-10px',
                marginLeft: '-10px',
              }}
            />
          )}
          </Box>
        ),
        size: 80,
      },
    ],
    []
  );

  const mutationCloseAllPositions = useCloseAllPositionsData({
    onSuccess: (res) => {
      if (res) {
        PositionsData.refetch();
        setIsLoadingCloseAll(false);
      }
    },
    onError: () => {
      setIsLoadingCloseAll(false);
    }
  });
  const mutationCloseAllOpenOrders = useCloseAllOpenOrdersData({
    onSuccess: (res) => {
      if (res) {
        OpenOrders.refetch();
        setIsLoadingCloseAll(false);
      }
    },
    onError: () => {
      setIsLoadingCloseAll(false);
    },
  });

  // refetch data based on active tab
  const handleRefreshData = (activeTab) => {
    switch (activeTab) {
      case 0:
        setPositionDataLoading(true);
        stub && PositionsData.refetch().then(() => setPositionDataLoading(false)).catch(() => setPositionDataLoading(false));
        return;
      case 1:
        setOpenOrderDataLoading(true);
        stub && ordersToken && OpenOrders.refetch().then(() => setOpenOrderDataLoading(false)).catch(() => setOpenOrderDataLoading(false));
        return;
      case 2:
        setBalanceDataLoading(true);
        stub && BalanceData.refetch().then(() => setBalanceDataLoading(false)).catch(() => setBalanceDataLoading(false));
        return;
      case 3:
        setCommandsDataLoading(true);
        refetch().then(() => setCommandsDataLoading(false)).catch(() => setCommandsDataLoading(false));
        return;
      default:
        return;
    }
  }

  // for auto-refresh data for selected tab
  const [currentActiveTab,setCurrentActiveTab] = useState(0);
  const handleChangeActiveTab = (activeTab) => {
    setCurrentActiveTab(activeTab);
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      switch (currentActiveTab) {
        case 0:
          stub && PositionsData.refetch();
          return;
        case 1:
          stub && ordersToken && OpenOrders.refetch();
          return;
        case 2:
          stub && BalanceData.refetch();
          return;
        case 3:
          refetch();
          return;
        default:
          return;
      }
    },30000);

    return () => clearInterval(interval);
  }, [currentActiveTab,handleChangeActiveTab]);

  const onCloseAllPositions = () => {
    if(PositionsData && PositionsData?.data && Object.keys(PositionsData?.data)?.length !== 0){
      let closeAllData = [];
      closeAllData = PositionsData?.data?.map((el) => `ptbot trade:close stub=${stub} symbol=${el?.symbol}`).join("\n");
      console.log(closeAllData);
      setIsLoadingCloseAll(true);
      mutationCloseAllPositions.mutateAsync({
        closeAllPositions: closeAllData
      });
    }
  }

  const onCloseAllOrders = () => {
    if(OpenOrders && OpenOrders?.data && Object.keys(OpenOrders?.data)?.length !== 0){
      const closeAllData = `ptbot trade:cancelall stub=${stub} symbol=${ordersToken}`;
      setIsLoadingCloseAll(true);
      mutationCloseAllOpenOrders.mutateAsync({
        closeAllOpenOrders: closeAllData
      });
    }
  }

  return (
    <Box
      overflow="hidden"
      // mt={2}
      borderRadius={6}
      borderWidth={1}
      border={"gray.tabB"}
      h={"100%"}
      minH="40px"
      bg={"gray.glass"}
    >
    <div className="h-[100%]">
      <div className="bg-primary px-2 pb-2 fontCourierPrime rounded-md  h-[100%] TradePanelContainer">
        <TradePanelTabs 
          handleRefreshData={handleRefreshData}
          onCloseAllPositions={onCloseAllPositions}
          onCloseAllOrders={onCloseAllOrders}
          handleChangeActiveTab={handleChangeActiveTab}
          positionDataLoading={positionDataLoading}
          openOrderDataLoading={openOrderDataLoading}
          balanceDataLoading={balanceDataLoading}
          commandsDataLoading={commandsDataLoading}
          isLoadingCloseAll={isLoadingCloseAll}
        >
          <Tab
            component={
              <div className="h-[100%] w-full block">
                {stub ? (
                  <Table
                    height={"100%"}
                    data={PositionsData?.data}
                    columns={PositionCols}
                    isLoading={PositionsData?.isLoading || positionDataLoading}
                  />
                ) : (
                  <p className="text-center	pt-[68px]">Add and select stub for positions.</p>
                )}
              </div>
            }
          >
            <span>
              {" "}
              Positions ({positionsLength})
            </span>
          </Tab>

          <Tab
            component={
              <div className="h-[100%]  w-full block">
                {stub && ordersToken ? (
                  <Table
                    height={"100%"}
                    data={OpenOrders?.data}
                    columns={orderCols}
                    isLoading={OpenOrders?.isLoading || openOrderDataLoading}
                  />
                ) : (
                  <p className="text-center	pt-[68px]">Select stub and asset for Open orders.</p>
                )}
              </div>
            }
          >
            <span>
              {" "}
              Open Orders ({orderssLength})
            </span>
          </Tab>
          <Tab
            component={
              <div className="h-[100%]  w-full block">
                {stub ? (
                  <Table
                    height={"100%"}
                    data={BalanceData?.data}
                    columns={BalanceCols}
                    isLoading={BalanceData?.isLoading || balanceDataLoading}
                  />
                ) : (
                  <p className="text-center	pt-[68px]">Add and select stub for Balances.</p>
                )}
              </div>
            }
          >
            <span>
              {" "}
              Balance ({balancesLength})
            </span>
          </Tab>
          <Tab
            component={
              <div className="command-table w-[100%] h-[100%]">
                <Table
                  height={"100%"}
                  data={CommandsData?.data}
                  columns={CommandsCols}
                  fromTable={DashboardTables.commands}
                  onSelectTableRow={onSelectTableRow}
                  isLoading={CommandsData?.isLoading || commandsDataLoading}
                />
              </div>
            }
          >
            Commands ({commandsLength})
          </Tab>
        </TradePanelTabs>
      </div>
    </div>
    </Box>
  );
}

export default TradePanel