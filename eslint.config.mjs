import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["src/**/*.{js,mjs,cjs,jsx}"] },
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
    ignores: ["**/model/*.js", "coverage/*.js"]
  }
];