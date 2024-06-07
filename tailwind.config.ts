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
        '8xl': '88rem', // You can adjust the value as needed
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({

      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            inherit: "#252525",
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
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
            default: '#404040'
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: {
              100: "#101010",
              200: "#151515",
              DEFAULT: "#101010"
            },
            foreground: "#ffffff",
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
            focus: "#F182F6",
          }, // dark theme colors
        }


      },
    }),
  ],
};
export default config;
