import React, { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

import MaterialReactTable from "material-react-table";

const Data = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
];

const Table = ({
  columns,
  height = "calc(100vh - 175px)",
  data,
  screenerTable,
  type,
  setOffset,
  ...props
}) => {
  const [pagination, setPagination] = useState({

    pageIndex: 0,

    pageSize: 20,

  });
  console.log(pagination);
  useEffect(()=> {
    if(type==='transactions'){
      setOffset(pagination.pageIndex)
    }
    
  },[ pagination.pageIndex, pagination, setOffset, pagination.pageSize ])
  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark", //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: "rgb(255,122,0)", //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === "dark"
                ? "rgb(254,255,244)" //random light yellow color for the background in light mode
                : "#060606", //pure black table in dark mode for fun
          },
        },
        typography: {
          fontFamily: "Ubuntu Mono, monospace !important",
          button: {
            textTransform: "none", //customize typography styles for all buttons in table by default
            fontSize: "14px",
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "14px", //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme]
  );
  return (
    <div style={{ height: "100%" }}>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          enablePagination={type=="transactions"}
          enableGlobalFilter={false}
          enableBottomToolbar={type=="transactions"}
          enableColumnActions={false}
          enableColumnFilters={false}
          enableTopToolbar={false}
          enableStickyHeader={true}
          rowCount={1000}
          
          muiTablePaginationProps={{
            labelRowsPerPage: "",
            rowsPerPageOptions:[20],
            sx: {
              fontWeight: "normal",
              fontSize: "14px",
              // padding: "25px 15px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",

              //   backgroundColor: "#171717",
              background: "rgb(17,17,17)",
            },
            nextIconButtonProps:{
              sx:{
                "background-color": "rgba(255, 255, 255, 0.04)",
                "width": "39px",
                "height": "34px",
                "backdrop-filter": "blur(23px)",
                "border-radius": "6px",
                "color":"#B7B7B7",
                "margin":"3px"
              }
            },
            backIconButtonProps:{
              sx:{
                "background-color": "rgba(255, 255, 255, 0.04)",
                "width": "39px",
                "height": "34px",
                "backdrop-filter": "blur(23px)",
                "border-radius": "6px",
                "color":"#B7B7B7",
                "margin":"3px"
              }
            },  
            showFirstButton:false,
            showLastButton:false,  
          }}
          manualPagination
          onPaginationChange={setPagination}
          muiTableBodyProps={{
            sx: {
              background: "rgb(17,17,17)",
              borderRadius: "8px !important",
            },
          }}
          muiTableContainerProps={{
            sx: {
              //  borderRadius:12,
              //   background:"red",
              marginInline: "auto",
              // height: screenerTable ? "100%" : height,
              // background: "rgba(0, 0, 0, 0.16)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              // background:""
              background: "rgb(17,17,17)",
              // fontFamily: "Ubuntu Mono",
            },
          }}
          muiTableHeadCellProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: "normal",
              fontSize: "14px",
              // padding: "25px 15px",

              color: "#43434A",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",

              //   backgroundColor: "#171717",
              background: "rgb(17,17,17)",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              fontWeight: "normal",
              fontSize: "14px",
              // padding: "7px 8px",
              color: "#B7B7B7",
              background: "rgba(0, 0, 0, 0.16)",
              border: "none",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              // fontFamily: "Ubuntu Mono",
            },
          }}
          initialState={{
            density: "compact",
          }}
          columns={columns}
          data={data ? data : Data}
          muiTableBodyRowProps={({ row }) => ({
            // handle click event on table row
            onClick: () => {
              if (props?.fromTable) {
                props?.onSelectTableRow(props?.fromTable, row.original);
              }
            },
            sx: {
              cursor: "pointer",
            },
          })}
          state={{ showSkeletons: props?.isLoading, pagination }} // for skeleton loading
          muiTableBodyCellSkeletonProps={{
            height: "24px",
            variant: "rounded",
            width: "inherit",
          }}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              width: "100%",
              height: screenerTable ? "100%" : height,
            },
          }}
          // layoutMode="grid"
          // columns={props?.columns}
          // data={props?.data ?? []}
        />
      </ThemeProvider>
    </div>
  );
};

export default Table;
