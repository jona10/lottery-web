'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        selenium_start: 'grunt-selenium-webdriver',
        selenium_stop: 'grunt-selenium-webdriver'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/webapp',
                    dest: 'dist/webapp',
                    src: ['**/*.js', '**/*.html', '!**/public/app/**/*.js']
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
            html: 'src/webapp/public/index.html',
            options: {
                dest: 'dist/webapp/public'
            }
        },
        usemin: {
            html: ['dist/webapp/public/**/*.html'],
            css: ['dist/webapp/public/css/**/*.css'],
            js: ['dist/webapp/public/js/**/*.js'],
            options: {
                assetsDirs: [
                    'dist/webapp/public',
                    'dist/webapp/public/images',
                    'dist/webapp/public/css'
                ],
                patterns: {
                    js: [[/(images\/[^'"]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },
        filerev: {
            dist: {
                src: [
                    'dist/webapp/public/js/**/*.js',
                    'dist/webapp/public/css/**/*.css',
                    'dist/webapp/public/css/fonts/*',
                    'dist/webapp/public/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        karma: {
            all: {
                configFile: 'karma.conf.js'
            }
        },
        wiredep: {
            app: {
                src: ['src/webapp/public/index.html']
            },
            test: {
                devDependencies: true,
                src: '<%= karma.all.configFile %>'
            },
            less: {
                src: ['src/webapp/public/**/*.less']
            }
        },
        webdriver: {
            all: {
                configFile: 'wdio.conf.js'
            }
        },
        connect: {
            options: {
                port: 3000,
                base: 'src/webapp/public',
                livereload: 35729
            },
            test: {
                options: {
                    port: 3001,
                    base: ['.tmp', 'bower_components', 'src/specs', '<%= connect.options.base %>']
                }
            },
            livereload: {
                options: {
                    open: true,
                    base: ['.tmp', 'bower_components', '<%= connect.options.base %>']
                }
            }
        },
        less: {
            server: {
                files: {
                    '.tmp/css/main.css': 'src/less/main.less'
                }
            },
            dist: {
                options: {
                    compress: true
                },
                files: {
                    '.tmp/css/main.css': 'src/less/main.less'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/css',
                    src: '**/*.css',
                    dest: '.tmp/css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css',
                    src: '**/*.css',
                    dest: '.tmp/css'
                }]
            }
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['src/webapp/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:server', 'autoprefixer:server']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/webapp/public/**/*.html',
                    '.tmp/css/**/*.css',
                    'src/webapp/public/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
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
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/webapp/public',
                    src: ['*.html'],
                    dest: 'dist/webapp/public'
                }]
            }
        }
    });

    grunt.registerTask('test', [
        'clean:reports',
        'wiredep:test',
        'karma',
        'connect:test',
        'selenium_start',
        'webdriver',
        'selenium_stop'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'less:dist',
        'autoprefixer:dist',
        'copy:dist',
        'concat',
        'uglify',
        'cssmin',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('ci', [
        'jshint',
        'test',
        'coveralls',
        'build'
    ]);

    grunt.registerTask('serve', [
        'clean:server',
        'wiredep',
        'less:server',
        'autoprefixer:server',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('default', ['ci']);
};
