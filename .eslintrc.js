const baseRules = {
  // prettier
  "prettier/prettier": "error",
  "no-extra-semi": "off",
  "no-empty": "off",

  // unused imports and variables
  "no-undef": "off",
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports-ts": "error",
  "unused-imports/no-unused-vars-ts": [
    "error",
    {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_",
    },
  ],

  // related to import sorting and ordering
  "sort-imports": "off",
  "import/order": "off",
  "no-multi-spaces": "error",
  "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
  "simple-import-sort/imports": [
    "error",
    {
      groups: [
        ["^([^st.]|[st][^re]|[st][er][^cs]|src[^/]|tes[^t]|test[^/])"],
        ["^test"],
        ["^src"],
        ["."],
      ],
    },
  ],
  "import/first": "error",
  "import/newline-after-import": "error",
  "import/no-duplicates": ["error", { considerQueryString: true }],
  "no-restricted-imports": ["error", { patterns: ["**/../**", ".."] }],

  // react
  "react/prefer-stateless-function": [0, { ignorePureComponents: false }],

  // misc
  "require-atomic-updates": "off",
  "no-constant-condition": "off",
  "use-isnan": "error",
  "func-style": ["error", "expression"],
  "no-restricted-syntax": [
    "error",
    {
      selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
      message: "setTimeout must always be invoked with two arguments.",
    },
    {
      selector:
        "CallExpression[callee.name='setInterval'][arguments.length!=2]",
      message: "setInterval must always be invoked with two arguments.",
    },
    "ArrowFunctionExpression",
  ],
}

const config = {
  env: { browser: true, node: true },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "simple-import-sort",
    "import",
    "prettier",
    "react",
    "react-hooks",
  ],
  settings: { react: { version: "detect" } },
  rules: baseRules,
}

const typescriptRules = {
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/no-empty-interface": "off",
  "@typescript-eslint/interface-name-prefix": "off",
  "@typescript-eslint/no-inferrable-types": "off",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/strict-boolean-expressions": [
    "error",
    {
      allowString: true,
      allowNullableBoolean: true,
      allowNumber: true,
      allowNullableNumber: true,
      allowNullableString: true,
    },
  ],
  "@typescript-eslint/no-unused-vars": [
    "error",
    { vars: "all", args: "after-used", ignoreRestSiblings: false },
  ],
}

switch (process.env.ESLINT_TARGET) {
  case "SourceCode": {
    config.overrides = [
      {
        files: ["*.{ts,tsx}"],
        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: __dirname,
        },
        rules: { ...baseRules, ...typescriptRules },
      },
    ]
    break
  }
  case "IntegrationTests": {
    config.overrides = [
      {
        files: ["*.{ts,tsx}"],
        parserOptions: {
          project: "./test/e2e/tsconfig.json",
          tsconfigRootDir: __dirname,
        },
        rules: { ...baseRules, ...typescriptRules },
      },
    ]
    break
  }
  default: {
    throw new Error("Unexpected $ESLINT_TARGET")
  }
}

module.exports = config
