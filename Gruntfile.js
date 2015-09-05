'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/lottery',
                    dest: 'dist/lottery',
                    src: ['**/*.js', '**/*.html', '!**/public/**/*.js']
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: ['bin/**']
                }]
            }
        },
        clean: {
            dist: ['dist', '.tmp'],
            server: ['.tmp'],
            reports: ['reports']
        },
        useminPrepare: {
            html: 'src/lottery/public/index.html',
            options: {
                dest: 'dist/lottery/public'
            }
        },
        usemin: {
            html: ['dist/lottery/public/**/*.html'],
            css: ['dist/lottery/public/css/**/*.css'],
            js: ['dist/lottery/public/js/**/*.js'],
            options: {
                assetsDirs: [
                    'dist/lottery/public',
                    'dist/lottery/public/images',
                    'dist/lottery/public/css'
                ],
                patterns: {
                    js: [[/(images\/[^'"]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },
        filerev: {
            dist: {
                src: [
                    'dist/lottery/public/js/**/*.js',
                    'dist/lottery/public/css/**/*.css',
                    'dist/lottery/public/css/fonts/*',
                    'dist/lottery/public/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        karma: {
            options: {
                frameworks: ['mocha', 'chai'],
                reporters: ['progress', 'coverage'],
                preprocessors: {'src/lottery/public/**/*.js': ['coverage']},
                port: 4000,
                colors: true,
                logLevel: 'INFO',
                autoWatch: false,
                browsers: ['Firefox'],
                singleRun: true,
                coverageReporter: {
                    dir: 'reports/coverage/',
                    reporters: [
                        {type: 'lcov', subdir: '.'}
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
                tests: ['src/specs/**/*.e2e.js']
            }
        },
        connect: {
            options: {
                port: 3000,
                base: 'src/lottery/public',
                livereload: 35729
            },
            test: {},
            livereload: {
                options: {
                    open: true
                }
            }
        },
        watch: {
            //bower: {
            //    files: ['bower.json'],
            //    tasks: ['wiredep']
            //},
            js: {
                files: ['src/lottery/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            //compass: {
            //    files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            //    tasks: ['compass:server', 'autoprefixer:server']
            //},
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/lottery/public/**/*.html',
                    '.tmp/styles/**/*.css',
                    'src/lottery/public/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        coveralls: {
            all: {
                src: ['reports/coverage/*.info']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'src/bin/lottery', 'src/**/*.js']
        }
    });

    grunt.registerTask('test', [
        'clean:reports',
        'karma',
        'connect:test',
        'webdriver'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'copy:dist',
        'concat',
        'uglify',
        'cssmin',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('ci', [
        'jshint',
        'test',
        'coveralls',
        'build'
    ]);

    grunt.registerTask('serve', [
        'clean:server',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('default', ['ci']);
};
