/*
 * grunt-gjslint
 * https://github.com/jmendiara/grunt-gjslint
 *
 * Copyright (c) 2013 Javier Mendiara Cañardo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    i18n: {
      all: {
        src: ['example/pruebaOrig/**'],
        dest: 'example/pruebaDest',
        options: {
          languages: ['en', 'es'],
          localesFolder: 'example/locales'
        }
      }
    },
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['i18n']);

};
