module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    semi: 0,
  },
}
