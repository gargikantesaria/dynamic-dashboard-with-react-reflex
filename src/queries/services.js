import axios, { getAuthorizationToken, oemsAxiosInstance,refreshInstance } from "./axios";
//  axios.defaults.baseURL = "http://13.235.62.48:8000";

//auth
export async function login(userData) {
  const res = await axios.post(`/auth/login/`, {
    email: userData.email,
    password: userData.password,
  });
  return res.data;
}
export async function register(userData) {
  const res = await axios.post(``, {
    username: userData.username,
    email: userData.email,
    password1: userData.password1,
    password2: userData.password2,
  });
  // console.log(res)
  return res.data;
}

//log out
export async function logout() {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const res = await axios.post(``);
  return res.data;
}

//refresh token
export async function getRefreshToken(data) {
  const res = await refreshInstance.post(``, data);
  return res.data;
}

//resend email -on registration
export async function resendEmail(data) {
  const res = await axios.post(``, data);
  return res.data;
}

//forgot password
export async function passwordReset(data) {
  const res = await axios.post(``, data);
  return res.data;
}
export async function completeReset(data) {
  const res = await axios.patch(``, data);
  return res.data;
}

//custom layout
export async function getLayout(token) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const res = await axios.get("");
  return res.data;
}

export async function postLayout(data) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${data.token}`,
  //   },
  // };
  // console.log("post",data.token)
  const res = await axios.post("", data);
  return res.data;
}

export async function updateLayout(data) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${data.token}`,
  //   },
  // };
  // console.log("patch",data.token)
  const res = await axios.patch("", data);
  // if(res.data===)
  return res.data;
}
export async function deleteLayout(layout_id) {
  const options = {
    // headers: {
    //   Authorization: `Bearer ${data.token}`,
    // },
    data: { layout_id: layout_id },
  };
  const res = await axios.delete("", options);
  return res.data;
}

export async function getConfig(data) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${data}`,
  //   },
  // };
  // console.log("post",data)
  const res = await axios.get("");
  //  console.log(res,data)
  return res.data;
}

// explorer section querries
export async function getPortfolio(address) {
  const res = await axios.get(``);
  return res.data;
}
export async function getAvailableTokens() {
  const res = await axios.get(`/`);
  return res.data;
}
export async function getCounterParties(address) {
  const res = await axios.get(``);
  return res.data;
}
export async function getExchangeUsage(address) {
  const res = await axios.get(``);
  return res.data;
}
export async function getTransactions(address, offset = 0) {
  const res = await axios.get(
    ``
  );
  return res.data;
}
export async function getInflowTransactions(address, offset = 0) {
  const res = await axios.get(
    ``
  );
  return res.data;
}
export async function getOutflowTransactions(address, offset = 0) {
  const res = await axios.get(
    ``
  );
  return res.data;
}
export async function getNeutrinoData(address) {
  const res = address
    ? await axios.get(``)
    : "";
  // console.log(res.data);
  return res.data;
}

//custom screeners
export async function getScreener(token) {
 const res = await axios.get("");
  return res.data.Screeners;
}

export async function postScreener(data) {
  const res = await axios.post("", data);
  return res.data;
}

export async function updateScreener(data) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${data.token}`,
  //   },
  // };
  console.log("patch", data);
  const res = await axios.patch("", data);
  return res.data;
}
export async function deleteScreener(layout_id) {
  const options = {
    // headers: {
    //   Authorization: `Bearer ${data.token}`,
    // },
    data: { layout_id: layout_id },
  };
  const res = await axios.delete("", options);
  return res.data;
}

export async function getMetricOptions(token) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const res = await axios.get("");

  return res.data;
}

export async function screenerQuery(data) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${data.token}`,
  //   },
  // };
  const res = await axios.post("", data);
  return res.data;
}

// alerts
export async function getAlerts(token) {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const res = await axios.get("");
  return res.data;
}
export async function postAlert(data) {
  console.log("post", data);
  const res = await axios.post("", data);

  return res.data;
}
export async function updateAlert(data) {
  const res = await axios.patch("", data);
  return res.data;
}
export async function deleteAlert(alert_id) {
  const options = {
    data: { alert_id: alert_id },
  };
  const res = await axios.delete("", options);
  return res.data;
}

//share section
export async function postShare(data) {
  const res = await axios.post("", data);
  return res.data;
}

export async function getShare(id) {
  const options = {
    params: {
      unique_id: id,
    },
  };

  const res = await axios.get("", options);
  return res.data;
}
//Granularity
export async function getGranularity(data) {
  const res = await axios.get(
    ""
  );
  return res.data;
}

export async function getTokens() {
  const res = await axios.get('');
  return res.data;
}

// oems instance endpoints

export async function getAssetsData(stub) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res.data.data;
}

export async function getAccounts() {
  const res = await oemsAxiosInstance.post("", {
    command: "",
  });
  return res.data.data;
}

export async function getPositionData(stub) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res.data.data.data;
}

export async function getBalanceData(stub) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res.data.data.data;
}

export async function getOpenOrdersData(stub, ordersToken) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res.data.data.data;
}

// get commands data
export async function getCommandsData() {
  const res = await oemsAxiosInstance.post("", {
    command: "",
  });
  return res.data.data;
}

export async function deletePosition(data) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res.data.data;
}

export async function deleteOpenOrder(data) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res.data.data;
}

export async function postSaveCommandData(data) {
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res;
}

// send command
export async function postSendCommandData(data) {
  const res = await oemsAxiosInstance.post("", {
    command: `${data.command}`,
  });
  return res;
}

// send all command
export async function postSendAllCommandData(data) {
  const res = await oemsAxiosInstance.post("", {
    command: `[${data.sendAllCommand}]`,
  });
  return res;
}

export async function postCloseAllPositionsData(data) {
  const res = await oemsAxiosInstance.post("", {
    command: `${data.closeAllPositions}`,
  });
  return res;
}

export async function postCloseAllOpenOrdersData(data) {
  const res = await oemsAxiosInstance.post("", {
    command: `${data.closeAllOpenOrders}`,
  });
  return res;
}

// delete command
export async function postDeleteCommandData(data) {
  console.log(data);
  const res = await oemsAxiosInstance.post("", {
    command: ``,
  });
  return res;
}
