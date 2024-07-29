import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/prop-types": "off"
    }
  },
  {
    ignores: ["**/model/*.js"]
  }
];