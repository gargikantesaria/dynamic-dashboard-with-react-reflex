import React, { useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

import MaterialReactTable from "material-react-table";
// const MaterialReactTable = dynamic(() => import("material-react-table"), {
//   ssr: false,
// });

// import MaterialReactTable from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
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

const ScreenerTable = (props) => {
  //should be memoized or stable
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: 'name.firstName', //access nested data with dot notation
  //       header: 'First Name',
  //     },
  //     {
  //       accessorKey: 'name.lastName',
  //       header: 'Last Name',
  //     },
  //     {
  //       accessorKey: 'address', //normal accessorKey
  //       header: 'Address',
  //     },
  //     {
  //       accessorKey: 'city',
  //       header: 'City',
  //     },
  //     {
  //       accessorKey: 'state',
  //       header: 'State',
  //     },
  //   ],
  //   [],
  // );

  const globalTheme = useTheme();
  // const defaultColumns = [
  //   {
  //     accessorKey: "name.firstName", //access nested data with dot notation
  //     header: "First Name",
  //   },
  //   {
  //     accessorKey: "name.lastName",
  //     header: "Last Name",
  //   },
  //   {
  //     accessorKey: "address", //normal accessorKey
  //     header: "Address",
  //   },
  //   {
  //     accessorKey: "city",
  //     header: "City",
  //   },
  //   {
  //     accessorKey: "state",
  //     header: "State",
  //   },
  // ];
  const defaultColumns =
    props.tokenData.length == 0
      ? []
      : Object.keys(props.tokenData[0]).map((col_name, i) => {
          return { accessorKey: col_name, header: col_name };
        });
  const [columns, setColumns] = useState(
    props.tokenData.length == 0 ? [] : Object.keys(props.tokenData[0])
  );
  const [columnVisibility, setColumnVisibility] = useState(
    props.tokenData.length == 0 ? [] : new Array(props.tokenData.length).fill(1)
  );
  const [currentColumns, setCurrentColumns] = useState(defaultColumns);

  useEffect(() => {
    let newColumns = defaultColumns.filter((col, i) => {
      return columnVisibility[i];
    }, []);
    setCurrentColumns(newColumns);
  }, [columnVisibility, setColumnVisibility]);

  useEffect(() => {
    setColumns(
      props.tokenData.length == 0 ? [] : Object.keys(props.tokenData[0])
    );
    setCurrentColumns(
      props.tokenData.length == 0
        ? []
        : Object.keys(props.tokenData[0]).map((col_name, i) => {
            return { accessorKey: col_name, header: col_name };
          })
    );
  }, [props.tokenData]);

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
  // console.log(props.tokenData,currentColumns);
  return (
    <>
      <Popover matchWidth>
        <PopoverTrigger>
          <button
            className="m-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              fontSize: "12px",
              color: "#B7B7B7",
              width: "100px",
              height: "24px",
              padding: "0px 8px",
            }}
          >
            Columns
          </button>
        </PopoverTrigger>
        <PopoverContent
          border={"1px solid #27272C"}
          display={"flex"}
          flexDirection={"row"}
          width={"200%"}
          bgColor={"#27272C"}
        >
          <PopoverArrow />
          <PopoverBody>
            {columns.map((col, i) => {
              return (
                <div>
                  <FormControl
                    className="m-2"
                    display="flex"
                    alignItems="center"
                    fontSize={"12px"}
                    justifyContent={"space-between"}
                  >
                    {col}{" "}
                    <Switch
                      className="mr-2 absolute right-[-35px]"
                      id={col}
                      colorScheme={"blue"}
                      isChecked={columnVisibility[i]}
                      onChange={() => {
                        let newData = [...columnVisibility];
                        newData[i] = 1 - newData[i];
                        setColumnVisibility(newData);
                      }}
                    />
                  </FormControl>
                </div>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          enableGlobalFilter={false}
          enableTopToolbar={false}
          // enableGlobalFilter={false}
          enablePagination={false}

          enableBottomToolbar={false}
          enableColumnActions={false}
          enableColumnFilters={false}
          // enableTopToolbar={false}
          enableStickyHeader={true}
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
              height: "100%",
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
          muiTableBodyCellSkeletonProps={{
            height: "24px",
            variant: "rounded",
            width: "inherit",
          }}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              width: "100%",
              height: "100%",
            },
          }}
          initialState={{
            density: "compact",
          }}
          columns={currentColumns}
          data={props.tokenData}
        />
      </ThemeProvider>
    </>
  );
};

export default ScreenerTable;