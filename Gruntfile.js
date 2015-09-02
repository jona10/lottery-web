module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

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
                browsers: ['Firefox'],
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
                    browserName: 'firefox'
                }
            },
            all: {
                tests: ['./src/specs/**/*.e2e.js']
            }
        },
        connect: {
            options: {
                port: 3000,
                base: 'src/lottery/public'
            },
            test: {},
            serve: {
                options: {
                    open: true,
                    livereload: true,
                    keepalive: true
                }
            }
        }
    });

    grunt.registerTask('test:unit', ['karma']);
    grunt.registerTask('test:e2e', ['connect:test', 'webdriver']);
    grunt.registerTask('test', ['test:unit', 'test:e2e']);
    grunt.registerTask('serve', ['connect:serve']);
    grunt.registerTask('default', ['test']);
};
