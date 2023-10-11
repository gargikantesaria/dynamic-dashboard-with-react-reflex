import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    transparent: "transparent",
    blue: "#0057FF",
    red: "#DD0000",
    profit: "#0081F8",
    white: {
      50: "rgba(255, 255, 255, 0.04)",
      100: "rgba(255, 255, 255, 0.06)",
      200: "rgba(255, 255, 255, 0.08)",
      300: "rgba(255, 255, 255, 0.16)",
      400: "rgba(255, 255, 255, 0.24)",
      500: "rgba(255, 255, 255, 0.36)",
      "100%": "#FFFFFF",
    },
    black: {
      50: "rgba(0, 0, 0, 0.04)",
      100: "rgba(0, 0, 0, 0.06)",
      200: "rgba(0, 0, 0, 0.08)",
      300: "rgba(0, 0, 0, 0.16)",
      400: "rgba(0, 0, 0, 0.24)",
      500: "rgba(0, 0, 0, 0.36)",
    },
    gray: {
      100: "#B7B7B7",
      200: "#43434A",
      main: "#1F1F22",
      tabs: "#1A1A1C",
      2: "#2C2C30",
      bar: "#0E0E0F",
      tabB: "#1E1E21",
      background: "#151517",
      stroke: "#27272C",
      glass: "rgba(33, 33, 36, 0.67)",
    },
  },
  breakpoints: {
    sm: "414px",
    md: "584px",
    lg: "1280px",
    xl: "1400px",
  },
  fonts: {
    body: "'Ubuntu Mono', monospace",
  },
});

export default theme;
