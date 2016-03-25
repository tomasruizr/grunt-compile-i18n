'use strict';
var I18nCompiler = require('i18nCompiler');
/*
 * grunt-gjslint
 * https://github.com/jmendiara/grunt-gjslint
 *
 * Copyright (c) 2013 Javier Mendiara Cañardo
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('i18n', 'Fetch and Compile i18n from the src files',
    function () {
      var opts = this.options({
        compile: true,
        fetch: true,
        languages: [],
        separateFolders: true,
        spaVarName:'_la',
        openLocalizationTag: '{{',
        closeLocalizationTag: '}}',
        localizationFunction: '__',
        markedOnly: false,
        localesFolder: './locales',
        devLang: 'en',
        defaultPlurals: {
          fewLimit: '10',
          manyLimit: '20'
        }
      });
      var compiler = new I18nCompiler(opts);
      this.files.forEach(function(file) {
        if (opts.fetch) {
          compiler.fetch(file.src, opts);
        }
        if (opts.compile) {
          compiler.compile(file.src);
        }
      });
    }
  );
};
