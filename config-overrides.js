/* eslint-disable func-names */
/* eslint-disable object-shorthand */

module.exports = {
  jest: function (config) {
    config.testMatch = ['**/__tests__/**/*.test.js'];
    return config;
  },
};
