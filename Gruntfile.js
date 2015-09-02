module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-webdriver');

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
                    files: ['src/lottery/public/specs/**/*.spec.js']
                }
            }
        },
        express: {
            options: {
                port: 3000
            },
            all: {
                options: {
                    script: 'src/bin/lottery'
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
        }
    });

    grunt.registerTask('test:frontend', ['karma']);
    grunt.registerTask('test:backend', ['mochaTest']);
    grunt.registerTask('test:e2e', ['express', 'webdriver']);
    grunt.registerTask('test', ['test:backend', 'test:frontend', 'test:e2e']);
    grunt.registerTask('default', ['test']);
};
