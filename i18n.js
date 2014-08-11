module.exports = { //['i18n']
	lc:function(n){
			return n===1?"one":"other"
	},
	c:function(data, varName){
		console.log("llego al validate")
		if(!data) throw new Error("MessageFormat: Data required for '"+varName+"'.")
	},

	n:function(data, varName, offset){
		if(isNaN(data[varName]))throw new Error("MessageFormat: '"+varName+"' isn't a number.");
		return data[varName] - (offset||0)
	}, 
	v:function(data, varName){
		this.c(data, varName);
		return data[varName]
	}, 
	p:function(data, varName, offset, plurals){
		i18n.c(data, varName);
		console.log("llego aqui 1");
		var str = data[varName] in plurals ? plurals[data[varName]] : (varName=lc(data[varName]-offset), varName in plurals?plurals[varName]:plurals.other);
		return str
  }, 
	s:function(data, varName, plurals){
		i18n.c(data,varName);
		return data[varName] in plurals ? plurals[data[varName]] : plurals.other
	}
};