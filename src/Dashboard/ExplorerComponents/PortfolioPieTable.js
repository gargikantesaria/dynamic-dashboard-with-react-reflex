import { Box } from "@chakra-ui/react";
import React from "react";
import Table from "../ReusableComponents/Table";
import { PortfolioPieTableColumns } from "../utils/utils";

const PortfolioPieTable = ({ data, height }) => {
  return (
    <Box pr={4}>
      {/* PortfolioPieTable */}
      <Table columns={PortfolioPieTableColumns} height={height} data={data} />
    </Box>
  );
};

export default PortfolioPieTable;
