//list of words to be tried
//var words = [ 'HELLO', 'HELL', 'I', 'SIT', 'REAL', 'REALLY', 'YOU', 'HELP' ];

//http://ejohn.org/blog/dictionary-lookups-in-javascript/
var dict = {};

/*
//ajax call to read dictionary.txt file
$.get("dictionary.txt", function( txt ){
    var words = txt.split( "\n");

    for (var i=0; i < words.length; i++){
        dict[ words[i] ] = true;
    }

    //Now inside these console.log will run once you DO have the data
    console.log(dict.AAH);
    console.log(dict);
});
*/
/*
function getDictionary(){
	return $.ajax("dictionary.txt");
}

$.when(getDictionary()).then(function(txt){
	var words = txt.split( "\n");
	
	for (var i=0; i < words.length; i++){
		dict[ words[i] ] = true;
	}
	
	console.log(dict.AAH);
	console.log(dict);
});
*/

/*
//ajax call to read dictionary.txt file
$.get("dictionary.txt", function( txt ){
    var words = txt.split( "\n");

    for (var i=0; i < words.length; i++){
        dict[ words[i] ] = true;
    }

    console.log(dict.AAH);
    console.log(dict);
});

if (dict.AAH == true) {
    console.log('dict.AAH is true!');
}
*/