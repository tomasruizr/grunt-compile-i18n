/*
 * grunt-compile-i18n
 * https://github.com/tomasruizr/grunt-compile-i18n
 *
 * Copyright (c) 2014 Tomas Ruiz
 * Licensed under the MIT license.
 */

'use strict';
var i18nCompiler = require('./../i18nCompiler.js');
var i18n = require('./../i18n.js');
var path = require('path');
var processor = require('./compilerProcessor.js');
var fs = require('fs-extra');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('compile_i18n', 'Creates folders for scripts/templates for every language supported in the application.', function() {
        console.log('estoy en el compile');
        var p = new processor();
        var options = this.options({
            openLocalizationTag : '<%', 
            closeLocalizationTag : '%>', 
            localizationFunction : '__',
            defaultPlurals : {
                fewLimit : '10',
                manyLimit : '20'
            },
            
            callbackFunction : function(str, data, quote) {
                quote = quote | false;
                var i18n = new i18nCompiler('en');
                //if there is no data to translate.
                var result = '';
                if (!data){
                    result = quote ? '"' + (i18n.compile(str)()) + '"' : (i18n.compile(str)());
                }
                else{
                    result = '(' + i18n.precompile(i18n.parse(str), data) + ')('+ data +')';
                }
                return result;
            }
            
        });  
        var i18n = new i18nCompiler('en');
        var src = new Array();
        //gather all valid src files.
        this.files.forEach(function(f) {
            src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file ' + filepath + ' not found.');
                  return false;
                } else {
                  return true;
                }
            });
        });
        //iterating the folders for each localization           
        var localeFolders = fs.readdirSync(this.files[0].dest);
        // For Each Locale folder in destination.
        for (var lc = 0; lc < localeFolders.length; lc++) {
            var lang = localeFolders[lc];
            var langFolder = path.join(this.files[0].dest, lang);
            var stat = fs.statSync(langFolder);
            if (stat && stat.isDirectory()) {
                var locales = JSON.parse(fs.readFileSync(path.join(langFolder, lang + '.json'), 'utf8'));
                var fileStr = '';
                var fileName = '';
                // var newFile = '';   
                //For each file in the source.
                for (var srcCount = src.length - 1; srcCount >= 0; srcCount--) {
                    fileName = src[srcCount];
                    fileStr = fs.readFileSync(fileName, 'utf8');
                    //get the locals in each files
                    p.getI18nStrings(path.extname(fileName), fileStr, options, function(strArray){
                        //For each local in the source.
                        for (var strArrayCont = strArray.length - 1; strArrayCont >= 0; strArrayCont--) {
                            var rawLocaleArr = strArray[strArrayCont];
                            //key to search in the json file.
                            var localeStr = p.purifyLocal(rawLocaleArr[1]);
                            //Data of the sentence if it exists
                            var localeData = p.purifyData(rawLocaleArr[1]);
                            //translated Value.
                            var tValue = options.callbackFunction(locales[localeStr].translation, localeData, path.extname(fileName) == '.js');
                            fileStr = p.replaceAll(fileStr, rawLocaleArr[0], tValue);
                            
                        }
                    });
                    fs.ensureDirSync(path.dirname(path.join(langFolder, fileName)));
                    fs.writeFileSync(path.join(langFolder, fileName), fileStr);
                    
                }
                // write a custom js for the client in this lang.
                if (options.plurals && options.plurals[lang]){
                    fs.writeFileSync(path.join(langFolder, 'i18n.js'), i18n.functions(options.plurals[lang].fewLimit, options.plurals[lang].manyLimit));
                }
                else{
                    fs.writeFileSync(path.join(langFolder, 'i18n.js'), i18n.functions(options.defaultPlurals.fewLimit, options.defaultPlurals.manyLimit));
                }
            }
        }    
    });

};
