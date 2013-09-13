//cycles through each character and tries to make a word with it

//initializes variables
	//global namespace
	var decoder = {};
	
	decoder.cursorIndex = 0;
	decoder.letterOptions = [];
	decoder.possibilities = [];
	decoder.wordPossibilities = [];
	decoder.wordOptions =[];
	decoder.wordFound = false;
	decoder.characters;
	decoder.foundWord;
	decoder.firstEmptyIndex = 0;
	decoder.currentWordIndex = -1;
	decoder.currentCharacterIndex = -1;
	decoder.firstLetterPreviousWord = -1;
	decoder.selectContainerClass = 'select';
	decoder.selectClass = 'word-options';
	decoder.selectContainerHTML = '<div class="'+decoder.selectContainerClass+'"><select class="'+decoder.selectClass+'"/></div>';
	decoder.lastSelectedWordLength;
	decoder.prevButtonHTML = '<button type="submit" name="previous">&larr;</button>';
	decoder.nextButtonHTML = '<button type="submit" name="next">&rarr;</button>';

//moves the cursor and sets the decoder.cursorIndex variable
var moveCursor = function(startIndex){
	//if startIndex is not defined, log this as an error
	if (startIndex === undefined){
		console.log('startIndex not defined for moveCursor function');
		return false;
	}
	
	//set the javascript variable for the cursor position
	decoder.cursorIndex = startIndex;
	
	//indicate the cursor position in the UI
	$('div.character').removeClass('cursor');
	$('div.character').eq(decoder.cursorIndex).addClass('cursor');
	
}

//builds nested array with each option defined for each letter
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		
		//only add options to array if options are not empty. Options should be emptty for punctuation
		if(theseoptionsArr.length > 0){
			decoder.letterOptions.push(theseoptionsArr);
		}
		//otherwise add the punctuation to the array
		else{
			decoder.letterOptions.push($.trim($(this).siblings('.number').html()));
		}
		
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
	
	//empty the array of anything left over
	decoder.possibilities = [];

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

//builds an array of each word option, from length 10 to 1
var buildWordOptions = function (){
	
	//empty array of anything left over
	decoder.wordOptions = [];
	
	//run once for each character in first possibility
	for (var b=decoder.possibilities[0].length; b>0; b--){
	
		//checks each word in possibilities array and adds matched words to the wordOptions array
		//http://browserdiet.com/#cache-array-lengths - length cached for performance
		for (var a=0, len=decoder.possibilities.length; a<len; a++){
		
			var thisGuessWord = checkGuessWord(decoder.possibilities[a]);
			
			if (thisGuessWord){
				//filters to only valid word options - checkGuessWord function returns null for non-word options
				
				//if the item is not already in the wordOptions array, add it
				if($.inArray(thisGuessWord, decoder.wordOptions) == -1){
					decoder.wordOptions.push(thisGuessWord);
				}
			}
			
			//removes last character from possibility - to run loop next with one fewer character
			decoder.possibilities[a] = decoder.possibilities[a].slice(0, (b-1));
		}
	}
}

//adds each word option as an option in a select element
var createControls = function(startIndex){
	
	//insert select element inside letter div
	$('div.letter:eq('+startIndex+')').after(decoder.selectContainerHTML);
	
	//first empty option
	$('select.'+decoder.selectClass)
		.append($('<option></option>')
		.attr('value','0')
		.text('select a word'));
	
	//add all options from decoder.wordOptions array
	//http://stackoverflow.com/questions/170986/what-is-the-best-way-to-add-options-to-a-select-from-an-array-with-jquery
	$.each(decoder.wordOptions, function(key, value){
		$('select.'+decoder.selectClass)
			.append($('<option></option>')
			.attr('value',value)
			.text(value));
	});
	
	//focus on select element
	$('select.'+decoder.selectClass).focus();
	
	//add next button
	//need conditional logic to not show it if is at the end
	$('select.'+decoder.selectClass).after(decoder.nextButtonHTML);
	
	//add previous button
		//only if it is not at the beginning
		/*
		if (startIndex > 0){
			$('select.'+decoder.selectClass).before(decoder.prevButtonHTML);
		}
		*/
}

//removes placeholder text from select element
var removeDefault = function(selectedValue){
	if (selectedValue != "0"){
		$('select.'+decoder.selectClass+' option[value=0]').remove();
	}
}

var removeControls = function(){
	//remove select element
	$('select.'+decoder.selectClass).remove();
	
	//remove buttons
	$('button[name="previous"]').remove();
	$('button[name="next"]').remove();
}

//inserts each character into posiiton, starting at startIndex
var printWord = function(selectedWord, startIndex){
	//if startIndex is not defined, set it to 0	
	if (!startIndex){
		startIndex = 0;
	}
	
	//initial variable for character of selected word to use
	var selectedWordChar = 0;
	
	//clear pre-existing word if there is one
	if ($('div.character').eq(startIndex).parent('div.word').length != 0){
		
		//remove pre-existing letters
		for (var w=startIndex; w<=(startIndex + decoder.lastSelectedWordLength); w++){
			$('div.character div.letter').eq(w).html('');
		}

		//remove pre-existing word wrapper
		$('div.character').eq(startIndex).unwrap();
	}
	
	//insert appropriate character of selected word
	
	for (var a=startIndex; a<(startIndex + selectedWord.length); a++){
		$('div.character div.letter').eq(a).html(selectedWord.charAt(selectedWordChar));
		selectedWordChar++;
	}
	
	//insert word wrapper div to group words
	$('div.character').slice(startIndex, startIndex + selectedWord.length).wrapAll('<div class="word"></div>');
	
	//set var for previously selected word length - for use in next run
	decoder.lastSelectedWordLength = selectedWord.length;
	
	//focus on next button
	$('button[name="next"]').focus();
}

//moves focus to next word
var nextWord = function(){
	//stop if nothing is selected in the select element
	if( $('select.'+decoder.selectClass).val() == '0' ){
		console.log('nothing selected');
		return false;
	}
	
	removeControls();
	
	//add elements at next word	
		findNextStart(decoder.cursorIndex);
		buildPossibilities(decoder.cursorIndex);
		buildWordOptions();
		createControls(decoder.cursorIndex);
		
}

var findNextStart = function(startIndex){
	
	//if startIndex is not defined, set it to 0	
	if (!startIndex){
		startIndex = 0;
	}
	
	//decrease startIndex to use "greater than" selector (only if it's greater than 0 to begin with. otherwise, a value of -1 causes an error)
	if(startIndex > 0) {
		startIndex--;
	}
	
	// http://stackoverflow.com/questions/13159515/jquery-how-to-search-for-an-element-at-a-given-index-or-later
	//excludes punctuation characters
	decoder.firstEmptyIndex = $('div.letter:gt(' + startIndex + '):empty').not('div.punctuation div.letter').first().index('div.letter');
	
	//decrement firstEmptyIndex if it's 1 (clean this up later). should return 0. without this, it returned 1 when run from 0
	if(decoder.firstEmptyIndex == 1){
		decoder.firstEmptyIndex --;
	}
	
	moveCursor(decoder.firstEmptyIndex);
}

var prevWord = function(){
	
	//set current indices
	findCurrentWordIndex();
	findCurrentCharacterIndex();
	
	//if there is a current word, clear it
	/*
	if (decoder.currentWordIndex != -1){
		clearCurrentWord(decoder.currentWordIndex);
	}
	*/
	
	removeControls();
	
	//remove elements at current position, and place them at the previous position
		findPrevStart();
		buildPossibilities(decoder.cursorIndex);
		buildWordOptions();
		createControls(decoder.cursorIndex);
}

var findCurrentWordIndex = function(){
	decoder.currentWordIndex = $('select.word-options').parents('div.word').index('div.word');
}

var findCurrentCharacterIndex = function(){
	decoder.currentCharacterIndex = $('select.word-options').parents('div.character').index('div.character');
}

var clearCurrentWord = function(startIndex){
	//if startIndex is not defined, throw an error
	if (!startIndex){
		console.log('index not defined for clearCurrentWord');
	}
	
	//clear letters in the current word
	$('div.word').eq(startIndex).children('div.character').children('div.letter').html('');
	
	//unwrap word div
	$('div.word').eq(startIndex).children('div.character').unwrap();
	
}

var findPrevStart = function(startIndex){
	
	//set index of first character of previous word the hard way - by finding the last word before the select element
	decoder.firstLetterPreviousWord = $('div.word div.character:lt(' + decoder.currentCharacterIndex + ')').last().siblings('div.word div.character').first().index('div.character');
	
	moveCursor(decoder.firstLetterPreviousWord);
	
}

var saveContents = function(){
	var html = $('div#message').clone();
	var htmlString = html.html();
	var datauri = window.btoa(unescape(encodeURIComponent(htmlString)));
	$.post('insert.php', {username: 'mrengy', message: datauri},
		function(data){
			console.log(data);
		}
	);
}

////initial run of functions
$(document).ready(function() {

	buildOptions();
	
	//begin first run manual selection only if there is not already a cursor position set
		if ($('div.cursor').length === 0){
			moveCursor(0);
		
			buildPossibilities(decoder.cursorIndex);
	
			buildWordOptions();
		
			createControls(decoder.cursorIndex);
		} else {
			//if there is a cursor position, set the javascript variable startIndex appropriately
			moveCursor($('div.cursor').index('div.character'));
		}
	//end first run manual selection
	
	//begin event delegation
		//moving cursor and creating select element
		
		$('div.character').on('click', function(event){
			//only continue if the target clicked is not a button - prevents duplication of events bound to button elements
			if(!$(event.target).is('select, button')){
				removeControls();
				moveCursor($(this).index('div.character'));
				buildPossibilities(decoder.cursorIndex);
				buildWordOptions();
				createControls(decoder.cursorIndex);
			}
			//doesn't do the above if the target was a button - since other event handlers do that business
			//console.log('click event stopped');
		});
		
		//removing the placeholder text on the select elemeent
		$('div#message').on('change', 'select.'+decoder.selectClass, function(event){
			removeDefault(this.value);
		});
	
		//binding print function to select elements
		$('div#message').on('change', 'select.'+decoder.selectClass, function(event){
			printWord(this.value, decoder.cursorIndex);
		});
		
		//next button
		$('div#message').on('click', 'button[name="next"]', function(event){
			nextWord();
		});
		
		//previous button
		$('div#message').on('click', 'button[name="previous"]', function(event){
			prevWord();
		});
		
		//save button
		$('div#title-row').on('click', 'button[name="save"]', function(event){
			event.preventDefault();
			saveContents();
		});
		
	//end event delegation
	
//debugging
	//console.log(decoder.selectContainerHTML);
	//console.log(decoder.wordPossibilities);
	//console.log(decoder.wordOptions);
	//console.log(decoder.possibilities.length);
	//console.log(decoder.possibilities[0]);
	//console.log(decoder.possibilities[59048]);
	//console.log(decoder.foundWord);
	//alert(checkGuessWord('help'));
	//console.log(decoder.letterOptions);
	//console.log(dict);
});