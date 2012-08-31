//cycles through each character and tries to make a word with it

//initializes array
var options = [];

//builds nested array with each option defined for each letter
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		options.push(theseoptionsArr);
	});
};

$(document).ready(function() {
	buildOptions();
});