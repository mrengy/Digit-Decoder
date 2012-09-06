//cycles through each character and tries to make a word with it

//initializes variables
var options = [];
var guessWord;
var maxWordLength = 10;
var foundWordIndex = -1;
var possibilities = [];

//builds nested array with each option defined for each letter
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		options.push(theseoptionsArr);
	});
};

//compares guess word to accepted word list
var checkGuessWord = function(){
	// shows index of words array in which a guessword appears, if any. If no match, foundWordIndex = -1.
	foundWordIndex = $.inArray(guessWord, words);
	/*
	if (foundWordIndex > -1){
		break;
		console.log(guessWord);
		return foundWordIndex;
	}
	*/
}

//retunrs the next letter in the alphabet
var nextLetter = function(letter){
	return String.fromCharCode(letter.charCodeAt(0) + 1);
}

//steps through each character to build a guess word
var buildPossibilities = function(){

/*
// for now stepping through first three digits only
	for (var i=0; i<options[0].length; i++){
		for (var j=0; j<options[1].length; j++){
			for (var k=0; k<options[2].length; k++){
				possibilities.push ([ options[0][i], options[1][j], options[2][k] ].join(''));
			}
		}
	}
*/
	var wordCharacter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
	var increment = wordCharacter[0];
	console.log(increment);
	
	/*for (var [increment]=0; [increment]<options[0].length; [increment]++){
		possibilities.push(options[increment]);
	}*/

}

$(document).ready(function() {
	buildOptions();
	buildPossibilities();
	//console.log(guessWord);
	console.log(possibilities);
});