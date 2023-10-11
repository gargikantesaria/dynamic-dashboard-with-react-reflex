import React, { useMemo } from "react";
import { useGranularity } from "../../queries/hooks";
import { Box, Flex } from "@chakra-ui/layout";
import { useAtom } from "jotai";
import Table from "../ReusableComponents/Table";

// TOKEN

// useGranularity

const GranularityContainer = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "address", header: "Address", size: 100 },
      {
        accessorKey: "netflow",
        header: "Netflow",
        size: 50,
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
      },
    ],
    []
  );

  const Granularitydata = useGranularity();

  const TableData =
    Granularitydata?.isFetched && Granularitydata?.data?.data
      ? Object.entries(Granularitydata?.data?.data)?.map((e) => ({
          address: e?.[1]?.address,
          netflow: e?.[1]?.netflow,
        }))
      : [];
  // console.log(TableData);
  return (
    <div className="rounded-xl p-[1]">
      <Table type={"granularity"} columns={columns} data={TableData} height = "calc(100vh - 160px)" />
    </div>
  );
};

export default GranularityContainer;
