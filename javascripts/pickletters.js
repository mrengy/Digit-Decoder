//cycles through each character and tries to make a word with it

//initializes variables
var options = [];
//var guessWord;
var maxWordLength = 10;
var foundWordIndex = -1;
var possibilities = [];
var wordFound = false;
var characters;
var initialCharacters;
var foundWord;

//builds nested array with each option defined for each letter
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		options.push(theseoptionsArr);
	});
};

//compares guess word to accepted word list
var checkGuessWord = function(word){
	// shows index of words array in which a guessword appears, if any. If no match, foundWordIndex = -1.
	
	// words array is defined in words.js
	//return $.inArray(guessWord, words);
	
	if ($.inArray(word, words)){
		foundWord = word;
	}
	
	return foundWord;
	
	/*
	if ( dict[ word ] ){
		return foundWord;
	}
	*/
	
}

//retunrs the next letter in the alphabet
var nextLetter = function(letter){
	return String.fromCharCode(letter.charCodeAt(0) + 1);
}

//steps through each character to build a guess word
var buildPossibilities = function(){

// for now stepping through first ten digits manually
	for (var a=0; a<options[0].length; a++){
		for (var b=0; b<options[1].length; b++){
			for (var c=0; c<options[2].length; c++){
				for (var d=0; d<options[2].length; d++){
					for (var e=0; e<options[2].length; e++){
						for (var f=0; f<options[2].length; f++){
							for (var g=0; g<options[2].length; g++){
								for (var h=0; h<options[2].length; h++){
									for (var i=0; i<options[2].length; i++){
										for (var j=0; j<options[2].length; j++){
											possibilities.push ([ options[0][a], options[1][b], options[2][c], options[3][d], options[4][e], options[5][f], options[6][g], options[7][h], options[8][i], options[9][j] ].join(''));
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	initialCharacters = possibilities[0].length;
/*
	var wordCharacter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
	var increment = wordCharacter[0];
	console.log(increment);
	
	// not working - trying to set a variable name dynamically and step through to change the name alphabetically. http://stackoverflow.com/questions/9870526/jquery-dynamically-increment-variable-name-inside-a-for-loop
	// want to have a parameter (10 for now) for how many letters to gather all options for into possbile words
	// for (var [increment]=0; [increment]<options[0].length; [increment]++){
	//	possibilities.push(options[increment]);
	// }
*/
}

var checkAndRemove = function(){
	// variable to determine length of word checked
	characters = possibilities[0].length;
	
	// checks each word in possibilities array
	for (var a=0; a<possibilities.length; a++){
		//possibilities[x] = possibilities[x].slice(0, 5);
		foundWordIndex = checkGuessWord(possibilities[a]);
		
		if (foundWordIndex > -1){
			wordFound = true;
			//console.log(foundWordIndex);
			break;
		}
		
		else {
			//removes last character from possibility
			possibilities[a] = possibilities[a].slice(0, (characters-1));
		}
		
	}
}

//inserts each character into posiiton
var printWord = function(){
	for (var a=0; a<foundWord.length; a++){
		//$('div.character div.letter').eq(a).html(words[foundWordIndex].charAt(a));
		$('div.character div.letter').eq(a).html(foundWord.charAt(a));
	}
}

$(document).ready(function() {
	console.log(words);
	buildOptions();
	buildPossibilities();
	for (var a=0; a<initialCharacters; a++){
		checkAndRemove();
		if (wordFound == true){
			break;
		}
	}
	printWord();
	//console.log(guessWord);
	//console.log(possibilities);
	//console.log(possibilities.length);
	//console.log(words[foundWordIndex]);
	//console.log(possibilities[0]);
	//console.log(possibilities[59048]);
	//alert(checkGuessWord('help'));
	//console.log(options);
});