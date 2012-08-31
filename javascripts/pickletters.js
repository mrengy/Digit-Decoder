//cycles through each character and tries to make a word with it
var options = [];
var buildOptions = function(){
	$('.options').each(function(){
		var theseoptions = $.trim($(this).html());
		var theseoptionsArr = theseoptions.split('');
		options.push(theseoptionsArr);
		//console.log(theseoptionsArr);
		/*
		options.push([
			for (var i=0; i<theseoptions.length; i++){
			   return '\".theseoptionsArr[i].\"., ';
			}
		]);
		*/
	});
};

$(document).ready(function() {
    /*
	var options = [
		["G", "H", "I"],
		["D", "E", "F"]
	];
	options.push(["J", "K", "L"]);
	console.log(options[2][1]);
	*/
	buildOptions();
});