module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["scripts/**"],
  rules: {
    "require-atomic-updates": "off",
    "react/prefer-stateless-function": [
      0,
      {
        ignorePureComponents: false,
      },
    ],
    "use-isnan": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
        message: "setTimeout must always be invoked with two arguments.",
      },
      {
        selector:
          "CallExpression[callee.name='setInterval'][arguments.length!=2]",
        message: "setInterval must always be invoked with two arguments.",
      },
    ],

    // handled by ts-eslint, so no need for eslint's rules
    "no-undef": "off",
    "no-unused-vars": "off",

    // used for doing template substitution through "string-template-js"
    "no-template-curly-in-string": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md#configuring-in-a-mixed-jsts-codebase
    "@typescript-eslint/explicit-function-return-type": "off",

    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
  },
  overrides: [
    {
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md#configuring-in-a-mixed-jsts-codebase
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["error"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "sonarjs", "react", "react-hooks"],
}
