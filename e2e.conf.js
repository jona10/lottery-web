exports.config = {
    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['**/specs/**/*.e2e.js'],
    capabilities: {
        browserName: 'firefox'
    },
    mochaOpts:{
        timeout: 10000
    }
};
