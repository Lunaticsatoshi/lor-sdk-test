/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  // transform: {
  //   "node_modules/node-fetch/.+\\.(j|t)sx?$": "ts-jest"
  // },
  // transformIgnorePatterns: ['node_modules/(?!(node-fetch)/)'],
};
