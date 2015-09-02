module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["reports"],
        karma: {
            options: {
                frameworks: ['mocha', 'chai'],
                reporters: ['progress', 'coverage'],
                preprocessors: { 'src/lottery/public/**/*.js': ['coverage'] },
                port: 4000,
                colors: true,
                logLevel: 'INFO',
                autoWatch: false,
                browsers: ['Firefox'],
                singleRun: true,
                coverageReporter: {
                    dir : 'reports/coverage/',
                    reporters: [
                        { type: 'lcov', subdir: '.' }
                    ]
                }
            },
            all: {
                options: {
                    files: ['src/lottery/public/**/*.js', 'src/specs/**/*.spec.js']
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
        },
        coveralls: {
            all: {
                src: ['reports/coverage/*.info']
            }
        }
    });

    grunt.registerTask('test:unit', ['karma']);
    grunt.registerTask('test:e2e', ['connect:test', 'webdriver']);
    grunt.registerTask('test', ['clean', 'test:unit', 'test:e2e']);

    grunt.registerTask('serve', ['connect:serve']);
    grunt.registerTask('ci', ['test', 'coveralls']);
    grunt.registerTask('default', ['test']);
};
