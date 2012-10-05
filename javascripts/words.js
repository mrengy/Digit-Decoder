//list of words to be tried
//var words = [ 'HELLO', 'HELL', 'I', 'SIT', 'REAL', 'REALLY', 'YOU', 'HELP' ];

//http://ejohn.org/blog/dictionary-lookups-in-javascript/
var dict = {};

/*
//approach using timeout as well as callback, still showing dict.AA as undefined.

$.get("dictionary.txt", function(txt){
	var words = txt.split("\n");
	
	for (var i=0; i<words.length; i++){
		dict[words[i]] = true;
	}
	
	findTimer = setTimeout(function () {
		findWord('AA');
	}, 1000);
});

function findWord(letters){
	word = letters;
	console.log(dict);
	if (dict[word]){
		console.log(word+' is a word');
	}
	else {
		console.log(word+' has no dice');
	}
	console.log(dict);
}
*/

//manual build of dict object

dict['HELLO'] = true;
dict['IS'] = true;
dict['IT'] = true;
dict['REALLY'] = true;
dict['YOU'] = true;
dict['SIT'] = true;


//ajax call to read dictionary.txt file
/*
$.ajax({
	url:'dictionary.txt',
	type:'GET',
	async: false,
	success: parseResults,
	error: function(xhr, status){
		console.log('problem with AJAX request');
	},
});
*/
function parseResults(txt) {
    var words = txt.split( "\n").map($.trim);
	//trimming out carriage return characters

    for (var i=0; i < words.length; i++){
        dict[ words[i] ] = true;
    }
/*
	console.log(dict.AAH);
*/	
	
}

//console.log(dict.AAH);

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