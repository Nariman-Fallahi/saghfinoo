import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
    "./node_modules/@nextui-org/theme/dist/components/checkbox.js",
    "./node_modules/@nextui-org/theme/dist/components/spinner.js",
  ],
  plugins: [nextui({
    layout: {
      disabledOpacity: "0.3",
    }
  })],
};
export default config;
