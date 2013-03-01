//cycles through each character and tries to make a word with it

//initializes variables
	//global namespace
	var decoder = {};

	decoder.options = [];
	//decoder.maxWordLength = 10;
	decoder.possibilities = [];
	decoder.wordFound = false;
	decoder.characters;
	decoder.initialCharacters;
	decoder.foundWord;
	decoder.firstEmptyIndex = 0;
	decoder.firstEmptyIndexPrevious;

//builds nested array with each option defined for each letter
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		decoder.options.push(theseoptionsArr);
	});
};

//compares guess word to accepted word list
var checkGuessWord = function(word){
	
	// words array is defined in words.js
	
	//returns the word if it is in the dictionary
	if (dict[word] == true){
		return word;
	}
	else {
		return null;
	}	
}

//retunrs the next letter in the alphabet
var nextLetter = function(letter){
	return String.fromCharCode(letter.charCodeAt(0) + 1);
}

//steps through each character to build a guess word
var buildPossibilities = function(startIndex){

//if startIndex is not defined, set it to 0
	if (!startIndex){
		startIndex = 0;
	}

// for now stepping through first ten digits manually
	for (var a=0; a<decoder.options[startIndex].length; a++){
		for (var b=0; b<decoder.options[startIndex+1].length; b++){
			for (var c=0; c<decoder.options[startIndex+2].length; c++){
				for (var d=0; d<decoder.options[startIndex+3].length; d++){
					for (var e=0; e<decoder.options[startIndex+4].length; e++){
						for (var f=0; f<decoder.options[startIndex+5].length; f++){
							for (var g=0; g<decoder.options[startIndex+6].length; g++){
								for (var h=0; h<decoder.options[startIndex+7].length; h++){
									for (var i=0; i<decoder.options[startIndex+8].length; i++){
										for (var j=0; j<decoder.options[startIndex+9].length; j++){
											decoder.possibilities.push ([ decoder.options[startIndex][a], decoder.options[startIndex+1][b], decoder.options[startIndex+2][c], decoder.options[startIndex+3][d], decoder.options[startIndex+4][e], decoder.options[startIndex+5][f], decoder.options[startIndex+6][g], decoder.options[startIndex+7][h], decoder.options[startIndex+8][i], decoder.options[startIndex+9][j] ].join(''));
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

	decoder.initialCharacters = decoder.possibilities[0].length;
/*
	var wordCharacter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
	var increment = wordCharacter[0];
	console.log(increment);
	
	// not working - trying to set a variable name dynamically and step through to change the name alphabetically. http://stackoverflow.com/questions/9870526/jquery-dynamically-increment-variable-name-inside-a-for-loop
	// want to have a parameter (10 for now) for how many letters to gather all options for into possbile words
	// for (var [increment]=0; [increment]<decoder.options[0].length; [increment]++){
	//	decoder.possibilities.push(decoder.options[increment]);
	// }
*/
}

var checkAndRemove = function(){
	// variable to determine length of word checked
	decoder.characters = decoder.possibilities[0].length;
	
	// checks each word in possibilities array
	for (var a=0; a<decoder.possibilities.length; a++){
		//decoder.possibilities[x] = decoder.possibilities[x].slice(0, 5);
		decoder.foundWord = checkGuessWord(decoder.possibilities[a]);
		
		if (decoder.foundWord !== null){
			decoder.wordFound = true;
			break;
		}
		
		else {
			//removes last character from possibility
			decoder.possibilities[a] = decoder.possibilities[a].slice(0, (decoder.characters-1));
		}
		
	}
}

//inserts each character into posiiton, starting at startIndex
var printWord = function(startIndex){

	//if startIndex is not defined, set it to 0	
	if (!startIndex){
		startIndex = 0;
	}
	
	//variable for character of found word to use
	var foundWordChar = 0;
	
	for (var a=startIndex; a<=(startIndex + decoder.foundWord.length); a++){
		$('div.character div.letter input').eq(a).val(decoder.foundWord.charAt(foundWordChar));
		foundWordChar++;
	}
	
	//defining word class elements
	var wordWrapperStart = $('<div class="word">');
	var wordWrapperEnd = $('</div>');
	
	//insert word wrapper div to group words
	//$('div.character').eq(startIndex).parent().prepend(wordWrapperStart);
	//$('div.character').eq(startIndex + decoder.foundWord.length).parent().insertAfter(wordWrapperEnd);
}

var findStart = function(startIndex){
	
	//if startIndex is not defined, set it to 0	
	if (!startIndex){
		startIndex = 0;
	}
	
	//decrease startIndex to use "greater than" selector (only if it's greater than 0 to begin with. otherwise, a value of -1 causes an error)
	if(startIndex > 0) {
		startIndex--;
	}
	
	// http://stackoverflow.com/questions/13159515/jquery-how-to-search-for-an-element-at-a-given-index-or-later
	decoder.firstEmptyIndex = $('div.letter:gt(' + startIndex + ')').children(':input[value=""]:first').index('div.letter :input');
}

$(document).ready(function() {
	buildOptions();
	
	//begin repeat
	buildPossibilities(decoder.firstEmptyIndex);
	for (var a=0; a<decoder.initialCharacters; a++){
		checkAndRemove();
		if (decoder.wordFound == true){
			break;
		}
	}
	printWord(decoder.firstEmptyIndex);
	findStart(decoder.firstEmptyIndex);
	//end repeat
	
	while (decoder.firstEmptyIndexPrevious != decoder.firstEmptyIndex){
		//sets firstEmptyIndexPrevious to the value of firstEmptyIndex the last time findStart() was run. Prevents infinite loop at the end.
		decoder.firstEmptyIndexPrevious = decoder.firstEmptyIndex;
		
		//resetting variables
		decoder.possibilities = [];
		decoder.wordFound = false;
		
		buildPossibilities(decoder.firstEmptyIndex);
		for (var a=0; a<decoder.initialCharacters; a++){
			checkAndRemove();
			if (decoder.wordFound == true){
				break;
			}
		}
		printWord(decoder.firstEmptyIndex);
		findStart(decoder.firstEmptyIndex);
	}
	
//debugging
	//console.log(guessWord);
	//console.log(decoder.possibilities);
	//console.log(decoder.possibilities.length);
	//console.log(decoder.possibilities[0]);
	//console.log(decoder.possibilities[59048]);
	//console.log(decoder.foundWord);
	//alert(checkGuessWord('help'));
	//console.log(decoder.firstEmptyIndex);
	//console.log(decoder.options);
	//console.log(dict);
});