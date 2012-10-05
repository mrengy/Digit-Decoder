//http://ejohn.org/blog/dictionary-lookups-in-javascript/
var dict = {};

//manual build of dict object
/*
dict['HELLO'] = true;
dict['HELL'] = true;
dict['HELP'] = true;
dict['I'] = true;
dict['IS'] = true;
dict['IT'] = true;
dict['REAL'] = true;
dict['REALLY'] = true;
dict['YOU'] = true;
dict['SIT'] = true;
*/

//ajax call to read dictionary.txt file

$.ajax({
	url:'dictionary.txt',
	type:'GET',
	async: false,
	success: parseResults,
	error: function(xhr, status){
		console.log('problem with AJAX request');
	},
});

function parseResults(txt) {
    var words = txt.split( "\n").map($.trim);
	//trimming out carriage return characters

    for (var i=0; i < words.length; i++){
        dict[ words[i] ] = true;
    }
}
/*
	console.log(dict.AAH);
*/