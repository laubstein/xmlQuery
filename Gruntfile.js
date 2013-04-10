/*global module:false*/
module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options : {
                jshintrc : '.jshintrc'
            },
            all : ['xmlQuery.js', 'Gruntfile.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>.js <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            options: {
                specs: 'test/spec/*.spec.js'
            },
            uncompressed: {
                src: 'xmlQuery.js'
            },
            coverage: {
                src: 'xmlQuery.js',
                options: {
                    template : require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'reports/coverage.json',
                        report: {
                            type: 'text',
                            options: {
                                dir: 'reports/coverage'
                            }
                        }
                    }
                }
            },
            compressed: {
                src: 'xmlQuery.min.js'
            }
        },
        clean : {
            reports : ['reports'],
            minified: ['<%= pkg.name %>.min.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['clean', 'uglify', 'jshint', 'jasmine:uncompressed', 'jasmine:compressed', 'jasmine:coverage']);
    grunt.registerTask('default', ['test']);
};