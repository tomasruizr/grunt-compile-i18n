/*
 * grunt-gjslint
 * https://github.com/jmendiara/grunt-gjslint
 *
 * Copyright (c) 2013 Javier Mendiara Cañardo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Project configuration.
  grunt.initConfig({
    clean: {
      dist: ['example/dist'],
      locales: ['example/locales']
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['example/pruebaOrig/**'], dest: 'example/dist/'},
        ],
      },
    },
    'i18n': {
      fetch: {
        src: ['example/pruebaOrig/**'],
        options: {
          compile: false,
          languages: ['en', 'es'],
          localesFolder: 'example/locales'
        }
      },
      compile: {
        src: ['example/dist/**'],
        options: {
          languages: ['en', 'es'],
          localesFolder: 'example/locales'
        }
      }
    },
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['clean:dist', 'copy', 'i18n:compile']);
  grunt.registerTask('fetch', ['clean','i18n:fetch']);
};
