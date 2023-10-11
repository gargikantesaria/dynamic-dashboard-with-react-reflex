export const PortfolioColumns = [
  {
    accessorKey: "city",
    header: "Asset",
    size: 100,
  },
  {
    accessorKey: "address",
    header: "Value",
    size: 100,
  },
  {
    accessorKey: "city",
    header: "Price",
    size: 100,
  },
  {
    accessorKey: "state",
    header: "Holdings",
    size: 100,
  },
];

export const PortfolioPieTableColumns = [
  {
    accessorKey: "name",
    header: "Asset",
    size: 100,
  },
  {
    accessorFn: (row) => (
      <div>{`$ ${convertToInternationalCurrencySystem(row.value)}`}</div>
    ),
    header: "Value",
    size: 100,
  },
];
export const TransactionsColumns = [
  {
    accessorKey: "city",
    header: "Time",
    size: 100,
  },
  // {
  //   accessorKey: "address",
  //   header: "Transaction",
  //   size: 100,
  // },
  {
    accessorKey: "address",
    header: "From",
    size: 100,
  },
  {
    accessorKey: "address",
    header: "To",
    size: 100,
  },
  {
    accessorKey: "address",
    header: "Value",
    size: 200,
  },
];
export const TopCounterPartiesColumns = [
  {
    accessorKey: "city",
    header: "Entity",
    size: 100,
  },

  {
    accessorKey: "address",
    header: "TX",
    size: 100,
  },
  {
    accessorKey: "address",
    header: "USD",
    size: 100,
  },
];

export default function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + " B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + " M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + " K"
    : Math.abs(Number(labelValue)).toFixed(2);
}
