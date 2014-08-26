(function(G){
	console.log('this is going to be the translated string:');
	console.log((function(d){return i18n.p(d,"NUM",0,{"one":"Tu","other":"Tus "+i18n.v(d,"NUM")})+" "+i18n.p(d,"NUM",0,{"one":"mensaje","other":"mensajes"})+" "+i18n.p(d,"NUM",0,{"one":"va","other":"van"})+" aqui."})({'NUM': '1'}));	
	console.log((function(d){return i18n.p(d,"NUM",0,{"one":"Tu","other":"Tus "+i18n.v(d,"NUM")})+" "+i18n.p(d,"NUM",0,{"one":"mensaje","other":"mensajes"})+" "+i18n.p(d,"NUM",0,{"one":"va","other":"van"})+" aqui."})({'NUM': '3'}));	
	console.log((function(d){return i18n.p(d,"NUM",0,{"one":"Tu","other":"Tus "+i18n.v(d,"NUM")})+" "+i18n.p(d,"NUM",0,{"one":"mensaje","other":"mensajes"})+" "+i18n.p(d,"NUM",0,{"one":"va","other":"van"})+" aqui."})({'NUM': '4'}));	
	this.data = (function(d){return i18n.p(d,"NUM",0,{"one":"Tu","other":"Tus "+i18n.v(d,"NUM")})+" "+i18n.p(d,"NUM",0,{"one":"mensaje","other":"mensajes"})+" "+i18n.p(d,"NUM",0,{"one":"va","other":"van"})+" aqui."})({'NUM': '4'});
})(this);
