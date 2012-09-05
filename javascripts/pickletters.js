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
var buildGuessWord = function(number, letter){
	
	var number = number || 0;
	var letter = letter || 0;
	for (var i=0; i< maxWordLength; i++){
		if (typeof guessWord == "undefined"){
			guessWord = options[i][letter];
		}
		else{
			guessWord = (guessWord + options[i][letter]);
		}
	}
};

//http://stackoverflow.com/questions/1636355/jquery-javascript-multiple-array-combinations
/*
var possibilities = [];
var recursiveSearch = function (text, depth){

 text = text || "";
 depth = depth || 0;
 	for ( var i = 0; i < options[depth].length; i++ ){
	   // is there one more layer?
	   if ( depth +1 < options.length )
	     // yes: iterate the layer
	     recursiveSearch ( text + ((text=="") ? "" : " ") + options[depth][i] , depth +1 );
	   else
	     // no: this is the last layer. we add the result to the array
	     possibilities.push ( text + options[depth][i] );
	 }
}
*/

$(document).ready(function() {
	buildOptions();
	//console.log(options);
	buildGuessWord();
	console.log(guessWord);
});