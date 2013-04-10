module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            uncompressed: {
                src: 'xmlQuery.js',
                options: {
                    specs: 'test/spec/*.spec.js'
                }
            },
            compressed: {
                src: 'xmlQuery.min.js',
                options: {
                    specs: 'test/spec/*.spec.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine:uncompressed', 'uglify', 'jasmine:compressed']);
};