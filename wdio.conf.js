module.exports.config = {
    specs: ['src/specs/**/*.e2e.js'],
    exclude: [],
    capabilities: [{
        browserName: 'firefox'
    }],
    logLevel: 'info',
    coloredLogs: true,
    baseUrl: 'http://localhost:3001',
    waitforTimeout: 1000,
    framework: 'mocha',
    reporter: 'spec',
    mochaOpts: {
        ui: 'bdd'
    }
};
