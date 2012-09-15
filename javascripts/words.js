//list of words to be tried
//var words = [ 'HELLO', 'HELL', 'I', 'SIT', 'REAL', 'REALLY', 'YOU', 'HELP' ];

//http://ejohn.org/blog/dictionary-lookups-in-javascript/
var dict = {};

$.get("dictionary.txt", function( txt ){
	var words = txt.split( "\n");
	
	for (var i=0; i < words.length; i++){
		dict[ words[i] ] = true;
	}
});
/*
if ("HELLO" in dict){
	console.log('HELLO');
}
*/
/*
if (dict['HELLO'] != false){
	console.log('HELLO');
}
*/

//console.log(dict['HELLO']);
console.log(dict.AAH);
console.log(dict);