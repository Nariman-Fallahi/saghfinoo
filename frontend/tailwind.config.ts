const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/button.js",
    "./node_modules/@heroui/theme/dist/components/modal.js",
    "./node_modules/@heroui/theme/dist/components/checkbox.js",
    "./node_modules/@heroui/theme/dist/components/spinner.js",
    "./node_modules/@heroui/theme/dist/components/pagination.js",
    "./node_modules/@heroui/theme/dist/components/autocomplete.js",
    "./node_modules/@heroui/theme/dist/components/select.js",
  ],
  plugins: [
    heroui({
      layout: {
        disabledOpacity: "0.3",
      },
    }),
    require("tailwind-scrollbar"),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CB1B1B",
      },
    },
  },
};
