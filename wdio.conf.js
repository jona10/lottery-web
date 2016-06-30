module.exports.config = {
    specs: ['src/specs/**/*.e2e.js'],
    exclude: [],
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    coloredLogs: true,
    baseUrl: 'http://localhost:3001',
    waitforTimeout: 1000,
    framework: 'mocha',
    reporter: 'spec',
	sync: false,
    mochaOpts: {
        ui: 'bdd'
    }
};
