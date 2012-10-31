//cycles through each character and tries to make a word with it

//initializes variables
var options = [];
var maxWordLength = 10;
var possibilities = [];
var wordFound = false;
var characters;
var initialCharacters;
var foundWord;
var firstEmptyIndex = 0;
var firstEmptyIndexPrevious;

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
	
	// words array is defined in words.js
	//return $.inArray(guessWord, words);
	
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
	for (var a=0; a<options[startIndex].length; a++){
		for (var b=0; b<options[startIndex+1].length; b++){
			for (var c=0; c<options[startIndex+2].length; c++){
				for (var d=0; d<options[startIndex+3].length; d++){
					for (var e=0; e<options[startIndex+4].length; e++){
						for (var f=0; f<options[startIndex+5].length; f++){
							for (var g=0; g<options[startIndex+6].length; g++){
								for (var h=0; h<options[startIndex+7].length; h++){
									for (var i=0; i<options[startIndex+8].length; i++){
										for (var j=0; j<options[startIndex+9].length; j++){
											possibilities.push ([ options[startIndex][a], options[startIndex+1][b], options[startIndex+2][c], options[startIndex+3][d], options[startIndex+4][e], options[startIndex+5][f], options[startIndex+6][g], options[startIndex+7][h], options[startIndex+8][i], options[startIndex+9][j] ].join(''));
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
		foundWord = checkGuessWord(possibilities[a]);
		
		if (foundWord !== null){
			wordFound = true;
			break;
		}
		
		else {
			//removes last character from possibility
			possibilities[a] = possibilities[a].slice(0, (characters-1));
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
	
	for (var a=startIndex; a<=(startIndex + foundWord.length); a++){
		$('div.character div.letter').eq(a).html(foundWord.charAt(foundWordChar));
		//console.log(foundWord.charAt(foundWordChar));
		foundWordChar++;
		//console.log(foundWordChar);
	}
}

var findStart = function(startIndex){
	
	//if startIndex is not defined, set it to 0	
	if (!startIndex){
		startIndex = 0;
	}
	
	var firstEmptyElement = $('div.letter:empty:eq(0)');
	firstEmptyIndex = firstEmptyElement.index('div.letter');
	
	//console.log(firstEmptyIndex);
	
	//need to extend to allow beginning search at a specified position
	startIndex++;
}

$(document).ready(function() {
	buildOptions();
	
	//begin repeat
	buildPossibilities(firstEmptyIndex);
	for (var a=0; a<initialCharacters; a++){
		checkAndRemove();
		if (wordFound == true){
			break;
		}
	}
	printWord(firstEmptyIndex);
	findStart();
	//end repeat
	
	while (firstEmptyIndexPrevious != firstEmptyIndex){
		firstEmptyIndexPrevious = firstEmptyIndex;
		
		//resetting variables
		possibilities = [];
		wordFound = false;
		
		buildPossibilities(firstEmptyIndex);
		for (var a=0; a<initialCharacters; a++){
			checkAndRemove();
			if (wordFound == true){
				break;
			}
		}
		printWord(firstEmptyIndex);
		findStart();
	}
	
	/*
	//second iteration
		//detecting repeat of same index
		firstEmptyIndexPrevious = firstEmptyIndex;
	
	buildPossibilities(firstEmptyIndex);
	for (var a=0; a<initialCharacters; a++){
		checkAndRemove();
		if (wordFound == true){
			break;
		}
	}
	printWord(firstEmptyIndex);
	findStart();
	*/
	
//debugging
	//console.log(guessWord);
	//console.log(possibilities);
	//console.log(possibilities.length);
	//console.log(possibilities[0]);
	//console.log(possibilities[59048]);
	//console.log(foundWord);
	//alert(checkGuessWord('help'));
	//console.log(firstEmptyIndex);
	//console.log(options);
	//console.log(dict);
});