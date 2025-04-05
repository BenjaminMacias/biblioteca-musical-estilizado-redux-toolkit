module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transformIgnorePatterns: ['/node_modules/(?!axios|@?react|@?redux)/'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  };
  