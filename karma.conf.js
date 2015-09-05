'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'src/lottery/public/**/*.js',
            'src/specs/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'src/lottery/public/**/*.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        port: 4000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Firefox'],
        singleRun: true,
        coverageReporter: {
            dir: 'reports/coverage/',
            reporters: [
                {type: 'lcov', subdir: '.'}
            ]
        }
    });
};
