var possibleAnswers = [];
var positions = [];
var questionNumber = 0;
var resetAnswers = [];
var usedAnswers = [];
var correctAnswer = 0;
var points = 0;
var anyChecked = false;
var nextActive = true;
var submitActive = true;

init = function(firstgame){ //initialise all variables
	console.log('init');
	possibleAnswers = ["100hz", "200hz", "300hz", "400hz", "500hz", "600hz", "700hz", "800hz", "900hz", "1khz", "2khz", "4khz", "6khz", "8khz", "10khz", "12khz"];
	positions = [];
	resetAnswers = [];
	questionNumber = 0;
	usedAnswers = [];
	correctAnswer = 0;
	points = 0;
	anyChecked=false;
	submitted=false;
	audioPause(); //stop any audio playing
	document.getElementById('score').innerHTML=points; //update score
	document.getElementById('outof').innerHTML=questionNumber; //update q number
	document.getElementById('continue').style.visibility='hidden'; //show only start new game message
	document.getElementById('submit').style.visibility='hidden';
	if (firstgame){
		document.getElementById('overlay-start').style.opacity='1';
		document.getElementById('overlay-start').innerHTML='Start new game!';
		document.getElementById('overlay-start').onclick=function(){startGame()};
	}
	else{
		document.getElementById('overlay-start').style.opacity='0';
		setTimeout(function(){
			document.getElementById('overlay-start').style.opacity='1';
			document.getElementById('overlay-start').innerHTML='Start new game!';
			document.getElementById('overlay-start').onclick=function(){startGame()};
		}, 2000);
	};
};

startGame = function() {
	document.getElementById('overlay-start').onclick='';
	newQuestion();
	resetOverlay('start');
};

whatNext = function() {
	if (nextActive) { //button only functions if not already clicked
		nextActive = false;
		resetOverlay('correct');
		audioPause();
		if (questionNumber > 9){ //finish after 10 questions
			endGame();
			nextActive=false;
		}
		else{
			newQuestion();
		};
	};
};

newQuestion = function(){ //load a new question
	document.getElementById('continue').style.visibility='hidden'; //show & hide buttons
	document.getElementById('submit').style.visibility='visible';
	document.getElementById('answer-wrapper').style.opacity='1';
	document.getElementById('score-wrapper').style.opacity='1';
	document.getElementById('button-wrapper').style.opacity='1';
	for (i=0; i<4; i++){
		document.getElementById('ans-value' + i).style.color="#666666"; //reset answer colors
		document.getElementById('ans-radio' + i).checked = false; //reset radio buttons
	};
	anyChecked=false; //reset whether radios are unchecked
	for (i=0; i<resetAnswers.length; i++){
		possibleAnswers.push(resetAnswers[i]); //push previous wrong answers into possible 
	};
	resetAnswers = []; //reset reset array
	positions = []; //reset positions array
	for (g=0;g<4;g++){
		positions.push(g); //refill postions array 0-3
	};
	do{
		var indexC = Math.floor(Math.random()*positions.length); //pick random position
		var valueC = Math.floor(Math.random()*possibleAnswers.length); //pick random correct answer
	} while (usedAnswers.indexOf(possibleAnswers[valueC]) > -1); //ensures no repeated questions
	correctAnswer = possibleAnswers[valueC]; //easier & global variables
	correctAnswerNumber = indexC; //ditto
	document.getElementById('ans-radio' + positions[indexC]).value=correctAnswer; //write correct answer to value of position
	document.getElementById('ans-value' + positions[indexC]).innerHTML=correctAnswer; //write correct answer to HTML
	document.getElementById('audio').src="audio/"+correctAnswer+".mp3"; //get the mp3 file
	console.log("correct = " + correctAnswer);
	usedAnswers.push(correctAnswer); //push correct answer to used array
	positions.splice(indexC,1); //cut the position from positions array
	possibleAnswers.splice(valueC,1); //cut the answer from possible answers array
	for (i=0; i<3; i++){ //for three wrong answers
		var index = Math.floor(Math.random()*positions.length); //pick position
		var value = Math.floor(Math.random()*possibleAnswers.length); //pick answer
		document.getElementById('ans-radio' + positions[index]).value=possibleAnswers[value];
		document.getElementById('ans-value' + positions[index]).innerHTML = possibleAnswers[value];
		console.log(positions[index] + " : " + possibleAnswers[value]);
		resetAnswers.push(possibleAnswers[value]); //push answers to a reset array
		positions.splice(index,1); //splice
		possibleAnswers.splice(value,1); //splice
	};
	questionNumber++; //next question number
	setTimeout(function(){nextActive=true;}, 2000); //wait 2s before reactivating the button
};

submit = function(){ //submit answer
	if (submitActive){
		audioPause(); //stop audio
		for (i=0; i<4; i++){ //make sure a radio button is checked
			if (document.getElementById('ans-radio' + i).checked){
				anyChecked=true;
			};
		};
		if (anyChecked){ //if any checked
			for (i=0; i<4; i++){ //for every radio option
				if (document.getElementById('ans-radio' + i).checked){ //but only if checked
					var answerGiven = document.getElementById('ans-radio' + i).value; //easy variable
					if (answerGiven == correctAnswer){ //if correct
						document.getElementById('overlay-correct').innerHTML='CORRECT!'; //overlay message
						points += 1; //add a point
					}
					else {
						document.getElementById('overlay-correct').innerHTML='Incorrect!'; //overlay message
					};
					document.getElementById('continue').style.visibility='visible'; //show continue
					document.getElementById('submit').style.visibility='hidden'; //hide submit
					document.getElementById('score').innerHTML=points; //update score
					document.getElementById('outof').innerHTML=questionNumber; //update q number
				};
				if (i == correctAnswerNumber){
					document.getElementById('ans-value' + i).style.color="#1eff05";
				}
				else{
					document.getElementById('ans-value' + i).style.color="#ff053f";
				};
			};
			document.getElementById('overlay-correct').style.visibility='visible';
			document.getElementById('overlay-correct').style.opacity='1';
			setTimeout(function(){resetOverlay('correct');}, 2000);
		};
	};
};

endGame = function(){
	submitActive=false;
	document.getElementById('overlay-start').onclick=function(){init(false)};
	document.getElementById('overlay-start').innerHTML='Your final score is: ' + points + "/" + questionNumber + ".";
	document.getElementById('overlay-start').style.opacity='1';
	document.getElementById('overlay-start').style.visibility='visible';
	document.getElementById('answer-wrapper').style.opacity='0';
	document.getElementById('button-wrapper').style.opacity='0';
	document.getElementById('score-wrapper').style.opacity='0';
};

audioPlay = function(){
	document.getElementById('audio').play();
	document.getElementById('audio').addEventListener('ended', function(){audioPause();});
	document.getElementById('audiobutton').onclick=function(){audioPause();};
	document.getElementById('audiobutton').src="images/pause.png";
};

audioPause = function(){
	document.getElementById('audio').pause();
	document.getElementById('audio').currentTime=0;
	document.getElementById('audiobutton').onclick=function(){audioPlay();};
	document.getElementById('audiobutton').src="images/play.png";
};

resetOverlay = function(which){
	document.getElementById('overlay-' + which).style.opacity='0';
	setTimeout(function(){
			document.getElementById('overlay-' + which).style.visibility='hidden';
			submitActive = true;
		}, 1500);
};