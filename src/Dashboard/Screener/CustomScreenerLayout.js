import React from "react";
import ScreenerTable from "../LayoutComponents/ScreenerTable";

export default function CustomScreenerLayout(props) {
  return (
    <div style={{ height: "calc( 100vh - 197px )" }}>
      <ScreenerTable tokenData={props.tokenData} />
    </div>
  );
}
