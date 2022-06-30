module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base',"prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", {"argsIgnorePattern":"next"}],
    "import/prefer-default-export": "off",
    "import/export": "off",
    "no-return-await": "off",
    "array-callback-return": "off",
    "consistent-return": "off",
    "prefer-spread": "off",
    "no-nested-ternary": "off",
    "prefer-destructuring": "off",
    "import/named": "off",
    "no-bitwise": "off",
    "no-plusplus": "off"    
  },
};
