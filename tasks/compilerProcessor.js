
var fs = require('fs-extra');
var path = require('path');
module.exports = compilerProcessor;
	function compilerProcessor() {
	};
  	

	compilerProcessor.prototype.replaceLocal = function(locale, file){
		if (file){
		  //in the file specified.
		}
		else{
		  //replace locale in all files
		}
	};

	compilerProcessor.prototype.getI18nStrings = function(fileExt, fileStr, options, callback){
		if (fileExt === '.js') {
			//	__\s*\(([^\)]*)\)
	  		var reStr = options.localizationFunction + '\\s*\\(([^\\)]*)\\)';
		} 
		else{
			//	__\s*\((.*)\)
	  		var reStr = options.openLocalizationTag +
		    	options.localizationFunction + "\\s*\\((.*)\\)" +
		    	options.closeLocalizationTag;
		}
		callback(this.searchRegExp(reStr, fileStr));
	};
	/*
	this method returns the local as it will appear in the json files of locals.
	 */
	compilerProcessor.prototype.purifyLocal = function(rawLocal, callback){
		var locales = [];
		//(?!'|\")(.*)(?=['|\"](?=[,]|$))
		var reStr= '(?!\'|\\")(.*)(?=[\'|\\"](?=[,]|$))';
  		return this.searchRegExp(reStr, rawLocal)[0][0];	
	};
	
	compilerProcessor.prototype.purifyData = function(rawLocal, callback){
		var locales = [];
		//(?!['|\"]).*'\s*,\s*(.*)
		var reStr= '(?![\'|\\"]).*\'\\s*,\\s*(.*)';
		var result = this.searchRegExp(reStr, rawLocal);

		if (result[0]){
			return result[0][1];	
		}
		else{
			return null;
		}
	};

	compilerProcessor.prototype.searchRegExp = function(reStr, str){		
		var re = new RegExp(reStr, 'g');
		var regex = new Array();
		var result = new Array();
		do{
			regex = re.exec(str);
			if (regex)
				result.push(regex);
		} while (regex);
		return result;
	};
	
	compilerProcessor.prototype.markDeletedLocales = function(locals, ndLocals){
		for (var l in locals)
		{
			if (ndLocals.indexOf(l) == -1)
			{
				locals[l].deleted = 1;
			}
		}
		return locals;
	};

	compilerProcessor.prototype.escapeRegExp = function (string) {
    	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	compilerProcessor.prototype.countReplaces = function(string, find, replace){
		var res = string.match(new RegExp(this.escapeRegExp(find), 'g'));
		if (res) {
			return res.length;
		}
		else {
			return 0;
		}
	}
	compilerProcessor.prototype.replaceAll = function (string, find, replace) {
  		return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
	}


