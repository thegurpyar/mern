import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { 
      globals: globals.node  // Only Node.js globals including 'process'
    }
  },
  pluginJs.configs.recommended,
];