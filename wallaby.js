/* eslint-disable global-require */
module.exports = function (wallaby) {
    return {
        files: [

            'config/**/*.js',
            'src/**/*',
            'package.json',
            'tsconfig.json',
            'jest.tsc.config.js',
            'test/mocks/*.ts?(x)',
            '!test/**/*.test.ts?(x)'
        ],
        tests: [
            // 'test/**/*.test.js?(x)',
            'test/**/*.test.ts?(x)'
        ],

        compilers: {
            '**/*.ts?(x)': wallaby.compilers.typeScript({})
        },

        // preprocessors: {
        //     '**/*.js?(x)': file => require('@babel/core').transform(
        //         file.content,
        //         {sourceMap: true, filename: file.path, presets: [require('babel-preset-jest')]})
        // },
        env: {
            type: 'node'
        },
        workers: {
            restart: true
        },
        testFramework: 'jest'
    };
};
