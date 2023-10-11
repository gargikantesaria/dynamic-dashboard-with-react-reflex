import { useMutation } from "react-query";

import { login, register,passwordReset, resendEmail, getRefreshToken, completeReset, getLayout, postLayout, updateLayout, deleteLayout, getScreener, deleteScreener, postScreener, updateScreener, getMetricOptions, screenerQuery,logout, postAlert, updateAlert,  postShare, getShare,deleteAlert,postSaveCommandData,
  postSendCommandData,
  postDeleteCommandData,
  postSendAllCommandData,
  postCloseAllPositionsData,
  postCloseAllOpenOrdersData,
  deletePosition,
  deleteOpenOrder, } from "./services";


export const useMutateLogin = (options) =>
  useMutation((data) => login(data), { ...options });

export const useMutateLogout = (options) =>
  useMutation((data) => logout(data), { ...options });

export const useMutationRegister = (options) =>
  useMutation((data) => register(data), { ...options });

export const useMutationResend = (options) =>
  useMutation((data) => resendEmail(data), { ...options });

export const useResetPassword = (options) => {
  return useMutation((data) => passwordReset(data), { ...options });
};

export const useRefreshToken = (options) => {
  return useMutation(() => getRefreshToken(), { ...options });
};

export const useCompleteReset = (options) => {
  return useMutation((data) => completeReset(data), { ...options });
};

//custom workbench

export const useGetLayout = (options) => {
  return useMutation((token) => getLayout(token), { ...options });
};

export const usePostLayout = (options) => {
  return useMutation((data) => postLayout(data), { ...options });
};

export const useUpdateLayout = (options) => {
  return useMutation((data) => updateLayout(data), { ...options });
};

export const useDeleteLayout = (options) => {
  return useMutation((data) => deleteLayout(data), { ...options });
}

//custom screener

export const useGetScreener = (options) => {
  return useMutation((token) => getScreener(token), { ...options });
}

export const usePostScreener = (options) => {
  return useMutation((data) => postScreener(data), { ...options });
}

export const useUpdateScreener = (options) => {
  return useMutation((data) => updateScreener(data), { ...options });
}

export const useDeleteScreener = (options) => {
  return useMutation((data) => deleteScreener(data), { ...options });
}


export const useGetMetricOptions = (options) => {
  return useMutation((token) => getMetricOptions(token), { ...options });
}

export const useScreenerQuery = (options) => {
  return useMutation((data) => screenerQuery(data), { ...options });
}

//share
export const usePostShare = (options) => {
  return useMutation((data) => postShare(data), { ...options });
}

export const useGetShare = (options) => {
  return useMutation((data) => getShare(data), { ...options });
}
export const usePostAlerts = (options) => {
  return useMutation((data) => postAlert(data), { ...options });
}
export const useUpdateAlerts = (options) => {
  return useMutation((data) => updateAlert(data), { ...options });
}
export const useDeleteAlerts = (options) => {
  return useMutation((data) => deleteAlert(data), { ...options });
}
// dashboard tables
export const useSaveCommandData = (options) => {
  return useMutation((data) => postSaveCommandData(data), { ...options });
};

export const useSendCommandData = (options) => {
  return useMutation((data) => postSendCommandData(data), { ...options });
};

export const useDeleteCommandData = (options) => {
  return useMutation((data) => postDeleteCommandData(data), { ...options });
};

export const useSendAllCommandData = (options) => {
  return useMutation((data) => postSendAllCommandData(data), { ...options });
};

export const useCloseAllPositionsData = (options) => {
  return useMutation((data) => postCloseAllPositionsData(data), { ...options });
}

export const useCloseAllOpenOrdersData = (options) => {
  return useMutation((data) => postCloseAllOpenOrdersData(data), { ...options });
}

export const useDeletePosition = (options) => {
  return useMutation((data) => deletePosition(data), { ...options });
};

export const useDeleteOpenOrder = (options) => {
  return useMutation((data) => deleteOpenOrder(data), { ...options });
};
