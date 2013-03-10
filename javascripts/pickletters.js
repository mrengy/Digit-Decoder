//cycles through each character and tries to make a word with it

//initializes variables
	//global namespace
	var decoder = {};

	decoder.letterOptions = [];
	decoder.possibilities = [];
	decoder.wordPossibilities = [];
	decoder.wordOptions =[];
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
		decoder.letterOptions.push(theseoptionsArr);
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
	for (var a=0; a<decoder.letterOptions[startIndex].length; a++){
		for (var b=0; b<decoder.letterOptions[startIndex+1].length; b++){
			for (var c=0; c<decoder.letterOptions[startIndex+2].length; c++){
				for (var d=0; d<decoder.letterOptions[startIndex+3].length; d++){
					for (var e=0; e<decoder.letterOptions[startIndex+4].length; e++){
						for (var f=0; f<decoder.letterOptions[startIndex+5].length; f++){
							for (var g=0; g<decoder.letterOptions[startIndex+6].length; g++){
								for (var h=0; h<decoder.letterOptions[startIndex+7].length; h++){
									for (var i=0; i<decoder.letterOptions[startIndex+8].length; i++){
										for (var j=0; j<decoder.letterOptions[startIndex+9].length; j++){
											decoder.possibilities.push ([ decoder.letterOptions[startIndex][a], decoder.letterOptions[startIndex+1][b], decoder.letterOptions[startIndex+2][c], decoder.letterOptions[startIndex+3][d], decoder.letterOptions[startIndex+4][e], decoder.letterOptions[startIndex+5][f], decoder.letterOptions[startIndex+6][g], decoder.letterOptions[startIndex+7][h], decoder.letterOptions[startIndex+8][i], decoder.letterOptions[startIndex+9][j] ].join(''));
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
	// for (var [increment]=0; [increment]<decoder.letterOptions[0].length; [increment]++){
	//	decoder.possibilities.push(decoder.letterOptions[increment]);
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

var buildWordOptions = function (){
	//run once for each character in first possibility
	for (var b=decoder.possibilities[0].length; b>0; b--){
	
		//checks each word in possibilities array and adds matched words to the wordOptions array
		for (var a=0; a<decoder.possibilities.length; a++){
			//interstitial step of adding to the wordPossibilities array. can remove this if below approach works
			decoder.wordPossibilities.push(checkGuessWord(decoder.possibilities[a]));
		
			if (checkGuessWord(decoder.possibilities[a])){
				//adds only valid words options to the wordOptions array
				decoder.wordOptions.push(checkGuessWord(decoder.possibilities[a]));
			}
			
			//removes last character from possibility
			decoder.possibilities[a] = decoder.possibilities[a].slice(0, (b-1));
		}
	}
	
	/*
	for (var b=0; b<decoder.wordPossibilities.length; b++){
		if(decoder.wordPossibilities[b]){
			decoder.wordOptions.push(decoder.wordPossibilities[b]);
		}
	}
	*/
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
		// needs to be adjusted if using this function - to target the correct element after manually removing input element
		$('div.character div.letter input').eq(a).val(decoder.foundWord.charAt(foundWordChar));
		foundWordChar++;
	}
	
	//insert word wrapper div to group words
	$('div.character').slice(startIndex, startIndex + decoder.foundWord.length).wrapAll('<div class="word"></div>');
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
	// needs to be adjusted if using this function - to target the correct element after manually removing input element
	decoder.firstEmptyIndex = $('div.letter:gt(' + startIndex + ')').children(':input[value=""]:first').index('div.letter :input');
}

//initial run of functions
$(document).ready(function() {

/*	buildOptions();
	
	//begin first run
	buildPossibilities(decoder.firstEmptyIndex);
	for (var a=0; a<decoder.initialCharacters; a++){
		checkAndRemove();
		if (decoder.wordFound == true){
			break;
		}
	}
	printWord(decoder.firstEmptyIndex);
	findStart(decoder.firstEmptyIndex);
	//end first run
	
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
*/
	buildOptions();
	
	//begin first run mabnual selection
	buildPossibilities(decoder.firstEmptyIndex);
	
	buildWordOptions();
	
	//end first run manual selection
	
//debugging
	//console.log(decoder.wordPossibilities);
	console.log(decoder.wordOptions);
	//console.log(decoder.possibilities);
	//console.log(decoder.possibilities.length);
	//console.log(decoder.possibilities[0]);
	//console.log(decoder.possibilities[59048]);
	//console.log(decoder.foundWord);
	//alert(checkGuessWord('help'));
	//console.log(decoder.firstEmptyIndex);
	//console.log(decoder.letterOptions);
	//console.log(dict);
});