import { useQuery } from "react-query";
import {
  getAlerts,
  getAvailableTokens,
  getCounterParties,
  getExchangeUsage,
  getGranularity,
  getInflowTransactions,
  getNeutrinoData,
  getOutflowTransactions,
  getPortfolio,
  getTransactions,
  getAccounts, getAssetsData, getBalanceData, getCommandsData, getConfig, getOpenOrdersData, getPositionData, getTokens 
} from "./services";

export const useMutateConfig = (token, enabled = true) => {
  return useQuery(
    ["", token],
    () => {
      return getConfig(token);
    },
    { enabled }
  );
};

export const usePortfolioData = (address) => {
  return useQuery(["", address], () => {
    return address ? getPortfolio(address) : [];
  });
};
export const useAvailableTokens = () => {
  return useQuery([""], () => {
    return getAvailableTokens();
  });
};

export const useCounterPartiesData = (address) => {
  return useQuery(["", address], () => {
    return address ? getCounterParties(address) : [];
  });
};

export const useExchangeUsageData = (address) => {
  return useQuery(["", address], () => {
    return address ? getExchangeUsage(address) : [];
  });
};

export const useTransactionsData = (address, offset) => {
  return useQuery(["", address, offset], () => {
    return address ? getTransactions(address, offset) : [];
  });
};
export const useInflowTransactionsData = (address, offset) => {
  return useQuery(["", address, offset], () => {
    return address ? getInflowTransactions(address, offset) : [];
  });
};
export const useOutflowTransactionsData = (address, offset) => {
  return useQuery(["", address, offset], () => {
    return address ? getOutflowTransactions(address, offset) : [];
  });
};
export const useNeutrinoData = (address) => {
  return useQuery(["", address], () => {
    return getNeutrinoData(address);
  });
};
// Alerts
export const useAlertsData = (token) => {
  return useQuery(["", token], () => {
    return getAlerts();
  });
};
export const useGranularity = () => {
  return useQuery(["" ], () => {
    return getGranularity();
  });
};

export const useTokens = () => {
  return useQuery([""], () => {
    return getTokens();
  })
}

export const useAccounts = () => {
  return useQuery([""], () => {
    return getAccounts();
  });
};

export const useAssetsData = (stub) => {
  return useQuery(
    ["", stub],
    () => {
      return getAssetsData(stub);
    },
    { enabled: !!stub }
  );
};


export const usePositionData = (stub) => {
  return useQuery(
    ["", stub],
    () => {
      return getPositionData(stub);
    },
    { enabled: !!stub }
  );
};

export const useBalanceData = (stub) => {
  return useQuery(
    ["", stub],
    () => {
      return getBalanceData(stub);
    },
    { enabled: !!stub }
  );
};

export const useOpenOrdersData = (stub, ordersToken) => {
  return useQuery(
    ["", stub, ordersToken],
    () => {
      return getOpenOrdersData(stub, ordersToken);
    },
    { enabled: !!stub && !!ordersToken }
  );
};

export const useCommandsData = () => {
  return useQuery([""], () => {
    return getCommandsData();
  });
};
