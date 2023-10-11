import { use } from "echarts";
import { atom } from "jotai";

function getFromLS(key, val) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {}
  }
  return ls[val];
}

function getLayoutStyleFromLS() {
  if (global.localStorage) {
    try {
      return global.localStorage.getItem("layoutStyle") || "";
    } catch (e) {}
  }
}
// to get screener (custom created by user) from local storage
function getItemFromLS(key) {
  let dataItem = {};
  if (global.localStorage) {
    try {
      dataItem = JSON.parse(global.localStorage.getItem("screener")) || {};
    } catch (e) {}
  }

  return dataItem[key];
}

export const GlobalSize = atom({width:null,height:null})

//auth
export const SIDEBAR = atom(true);
export const HEADER = atom(true);
export const MAIL = atom("");

//header
export const displayDropdown = atom(false);
export const LayoutStructure = atom("layout_1_1");
export const layoutStyle = atom(getLayoutStyleFromLS() || "");
export const layoutToggle = atom(false);
export const ConfigData = atom({});

// for dashboard
export const selectedMetricInfo = atom({});
export const GlobalLayout = atom([]);
export const ActiveDbTab = atom(null);
export const SelectedView = atom(null);
export const GlobalLoading = atom(true);
//workbench
export const InitialHeight = atom(
  typeof window !== "undefined" ? window.screen.height - 280 : 0
);
export const GlobalScreener = atom(
  getItemFromLS("screener") || [
    {
      id: 0,
      name: "New Screener",
      type: "screener",
      config: {},
    },
  ]
);

//swap
export const AccountBalance = atom(null);
export const Account = atom (null);
//explorer
export const Address = atom("");

//granularity
// export const Granularity = atom(false);
export const Granularity = atom(false);

// sidebar
export const SelectedSidebarMenu = atom({
  alert: false,
  swap: false,
  watchlist: false,
  news:false
});

// for dashboard tables
export const STUB = atom("");
export const OPENORDERSTOKEN = atom("");
export const BuildCommandSwapSidebarData = atom(null);

//shar
export const SharePrivacy = atom("private");
