//cycles through each character and tries to make a word with it

//initializes variables
var options = [];
var guessWord;

//builds nested array with each option defined for each letter
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		options.push(theseoptionsArr);
	});
};

//steps through each character to check for defined word
var buildGuessWord = function(){
	options.each(function(){
		//guessWord.= 
	});

};
$(document).ready(function() {
	buildOptions();
});