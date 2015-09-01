exports.config = {
    framework: 'mocha',
    seleniumAddress: 'http://localhost:6000/',
    specs: ['lottery.e2e.spec.js'],
    capabilities: {
        browserName: 'firefox'
    }
};
