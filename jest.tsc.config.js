const {defaults} = require('jest-config');
module.exports = {
    verbose: false,
    automock: true,
    notify: true,
    runner: 'tsc',
    testEnvironment: 'node',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'ts', 'node'],
    testMatch: ['<rootDir>/test/**/*.test.ts']
};
