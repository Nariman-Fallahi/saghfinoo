const { nextui } = require("@nextui-org/theme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
    "./node_modules/@nextui-org/theme/dist/components/checkbox.js",
    "./node_modules/@nextui-org/theme/dist/components/spinner.js",
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
  ],
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3",
      },
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CB1B1B",
      },
    },
  },
};
