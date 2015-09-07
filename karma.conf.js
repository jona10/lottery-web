'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            // bower:js
            // endbower
            'src/webapp/public/**/*.js',
            'src/specs/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'src/lottery/public/**/*.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        port: 3001,
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
