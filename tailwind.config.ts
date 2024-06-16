import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "8xl": "88rem",
        "10xl": "106rem", // You can adjust the value as needed
      },
      gridTemplateColumns: {
        "auto-1fr-auto": "auto 1fr auto",
      },
      screens: {
        xs: "450px", // Par exemple, définissez votre breakpoint xs à 320px
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          // light theme layout tokens
          colors: {
            background: {
              100: "#F7F7F7",
              200: "#EEEEEE",
              300: "#E9E9E9",
              400: "#E0E0E0",
              500: "#D4D4D4",
              DEFAULT: "#F7F7F7",
            },
            foreground: {
              100: "#232a2f",
              200: "#2b343a",
              300: "#707070",
              DEFAULT: "#181d20",
            },
            inherit: "#252525",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#538ee0",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#538ee0",
              foreground: "#ffffff",
            },
            focus: "#538ee0",
            default: "#BBBBBB",
            secondary: {
              DEFAULT: "#E0A553",
              foreground: "#ffffff",
            },
            commentary: "#404040",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: {
              100: "#232a2f",
              200: "#232a2f",
              300: "#2b343a",
              500: "#707070",
              DEFAULT: "#181d20",
            },
            foreground: {
              100: "#f5f5f5",
              200: "#e1e1e1",
              300: "#c7c7c7",

              DEFAULT: "#f5f5f5",
            },
            inherit: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#538ee0",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#E0A553",
              foreground: "#ffffff",
            },
            commentary: "#9CA3AF",
            focus: "#538ee0",
          }, // dark theme colors
        },
      },
    }),
  ],
};
export default config;
