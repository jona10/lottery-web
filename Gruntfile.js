module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                frameworks: ['mocha', 'chai'],
                reporters: ['progress'],
                port: 4000,
                colors: true,
                logLevel: 'INFO',
                autoWatch: false,
                browsers: ['Chrome'],
                singleRun: true
            },
            all: {
                options: {
                    files: ['src/specs/**/*.spec.js']
                }
            }
        },
        webdriver: {
            options: {
                desiredCapabilities: {
                    browserName: 'chrome'
                }
            },
            all: {
                tests: ['./src/specs/**/*.e2e.js']
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'src/lottery'
                }
            }
        }
    });

    grunt.registerTask('test:unit', ['karma']);
    grunt.registerTask('test:e2e', ['connect', 'webdriver']);
    grunt.registerTask('test', ['test:unit', 'test:e2e']);
    grunt.registerTask('default', ['test']);
};
