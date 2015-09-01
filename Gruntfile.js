module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            all: {
                options: {
                    reporter: 'spec'
                },
                src: ['src/specs/**/*.spec.js']
            }
        },
        protractor: {
            options: {
                configFile: "e2e.conf.js",
                webdriverManagerUpdate: true
            },
            all: {}
        },
        protractor_webdriver: {
            options: {},
            all: {}
        },
        karma: {
            all: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.registerTask('test:frontend', ['karma']);
    grunt.registerTask('test:backend', ['mochaTest']);
    grunt.registerTask('test:e2e', ['protractor_webdriver', 'protractor']);
    grunt.registerTask('test', ['test:backend', 'test:frontend', 'test:e2e']);
    grunt.registerTask('default', ['test']);
};
