//cycles through each character and tries to make a word with it

//initializes variables
var options = [];
var guessWord;
var maxWordLength = 10;
var foundWordIndex = -1;

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

//steps through each character to build a guess word
var buildGuessWord = function(letter, number){
	
	var letter = letter || 0;
	var number = number || 0;
	/*
	for (var i=0; i< maxWordLength; i++){
		if (typeof guessWord == "undefined"){
			guessWord = options[i][number];
		}
		else{
			guessWord = (guessWord + options[i][number]);
		}
	}
}

//http://stackoverflow.com/questions/1636355/jquery-javascript-multiple-array-combinations

 text = text || "";
 depth = depth || 0;
*/
	var possibilities = [];
 
	for ( var i = 0; i < maxWordLength; i++ ){
	   // is there one more layer?
	   if ( number +1 < options.length )
	     // yes: iterate the layer
	     buildGuessWord ( letter + ((letter=="") ? "" : " ") + options[number][i] , number +1 );
	   else
	     // no: this is the last layer. we add the result to the array
	     possibilities.push ( letter + options[number][i] );
	 }
}

$(document).ready(function() {
	buildOptions();
	//console.log(options);
	buildGuessWord();
	//console.log(guessWord);
	console.log(possibilities);
});