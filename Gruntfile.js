/*
 * grunt-compile-i18n
 * https://github.com/tomasruizr/grunt-compile-i18n
 *
 * Copyright (c) 2014 Tomas Ruiz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    compile_i18n: {
      generate : {
        files: {
          './pruebaDest' : ['./pruebaOrig/**/*.js', './pruebaOrig/**/*.html' ]
        },
        options : {
          
          //callbackFunction : function(str, data){console.log(str);}
        }
      }

      
    },
    fetchStrings_i18n: {
      generate : {
        files: {
          './pruebaDest' : ['./pruebaOrig/**/*.js', './pruebaOrig/**/*.html' ]
        },
        options : {
          openLocalizationTag : '<%', 
          closeLocalizationTag : '%>', 
          localizationFunction : '__',
          languages : [
              'en'
            ]
        }
      
      }

      
    },



    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('compile', ['fetchStrings_i18n','compile_i18n']);
  grunt.registerTask('fetch', ['fetchStrings_i18n']);
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'compile_i18n', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};