var possibleAnswers = [];
var positions = [];
var questionNumber = 0;
var usedAnswers = [];
var correctAnswer = 0;
var points = 0;
var anyChecked = false;

init = function(){
questionNumber = 0; //define question number
usedAnswers = [];
points = 0;
anyChecked=false;
audioPause();
document.getElementById('continue').style.visibility='hidden';
document.getElementById('submit').style.visibility='hidden';
document.getElementById('overlay-message').onclick=function(){nextQuestion()};
document.getElementById('overlay-message').innerHTML='Start new game!';
};

nextQuestion = function(){
audioPause();
if (questionNumber > 9){ //finish after 10 questions
document.getElementById('overlay-message').innerHTML='Your final score is: ' + points + "/" + questionNumber + ".";
document.getElementById('overlay-wrapper').style.visibility='visible';
document.getElementById('overlay-message').onclick=function(){init()};
document.getElementById('overlay-message').style.opacity='1';
document.getElementById('answer-wrapper').style.opacity='0';
document.getElementById('button-wrapper').style.opacity='0';
document.getElementById('score-wrapper').style.opacity='0';
}
else{
document.getElementById('continue').style.visibility='hidden';
document.getElementById('submit').style.visibility='visible';
document.getElementById('answer-wrapper').style.opacity='1';
document.getElementById('score-wrapper').style.opacity='1';
document.getElementById('button-wrapper').style.opacity='1';
resetOverlay();
for (i=0; i<4; i++){
document.getElementById('ans-value' + i).style.color="#666666";
document.getElementById('ans-radio' + i).checked = false;
};
anyChecked=false;
possibleAnswers = ["100hz", "200hz", "300hz", "400hz", "500hz", "600hz", "700hz", "800hz", "900hz", "1khz", "2khz", "4khz", "6khz", "8khz", "10khz", "12khz"];
positions = [];
for (g=0;g<4;g++){
positions.push(g);
};
do
{
var indexC = Math.floor(Math.random()*positions.length);
var valueC = Math.floor(Math.random()*possibleAnswers.length);
} while (usedAnswers.indexOf(possibleAnswers[valueC]) > -1); //ensures no repeated questions
document.getElementById('ans-radio' + positions[indexC]).value=possibleAnswers[valueC];
document.getElementById('ans-value' + positions[indexC]).innerHTML = possibleAnswers[valueC];
correctAnswer = possibleAnswers[valueC];
correctAnswerNumber = indexC;
document.getElementById('audio').src="audio/"+correctAnswer+".mp3"; //get the mp3 file
console.log("correct = " + correctAnswer);
usedAnswers.push(possibleAnswers[valueC]);
positions.splice(indexC,1);
possibleAnswers.splice(valueC,1);
for (i=0; i<3; i++){
var index = Math.floor(Math.random()*positions.length);
var value = Math.floor(Math.random()*possibleAnswers.length);
document.getElementById('ans-radio' + positions[index]).value=possibleAnswers[value];
document.getElementById('ans-value' + positions[index]).innerHTML = possibleAnswers[value];
console.log(positions[index] + " : " + possibleAnswers[value]);
positions.splice(index,1);
possibleAnswers.splice(value,1);
};
console.log("---");
questionNumber++;
};
};

submit = function(){
audioPause();
for (i=0; i<4; i++){
if (document.getElementById('ans-radio' + i).checked){
anyChecked=true;
};
};
if (anyChecked){
for (i=0; i<4; i++){
if (document.getElementById('ans-radio' + i).checked){
	var answerGiven = document.getElementById('ans-radio' + i).value;
		if (answerGiven == correctAnswer){
			document.getElementById('overlay-message').innerHTML='CORRECT!';
			points += 1;
			}
		else {
			document.getElementById('overlay-message').innerHTML='Incorrect!';
			};
		document.getElementById('continue').style.visibility='visible';
		document.getElementById('submit').style.visibility='hidden';
		document.getElementById('score').innerHTML=points;
		document.getElementById('outof').innerHTML=questionNumber;
		};
	if (i == correctAnswerNumber){
		document.getElementById('ans-value' + i).style.color="#1eff05";
		}
	else{
		document.getElementById('ans-value' + i).style.color="#ff053f";
		};
	document.getElementById('overlay-message').onclick=function(){resetOverlay()};
	document.getElementById('overlay-wrapper').style.visibility='visible';
	document.getElementById('overlay-message').style.opacity='1';
	setTimeout(resetOverlay, 2000);
};
};
};

audioPlay = function(){
document.getElementById('audio').play();
document.getElementById('audio').addEventListener('ended', function(){audioPause();});
document.getElementById('audiobutton').onclick=function(){audioPause();};
document.getElementById('audiobutton').src="images/pause.png";
}

audioPause = function(){
document.getElementById('audio').pause();
document.getElementById('audio').currentTime=0;
document.getElementById('audiobutton').onclick=function(){audioPlay();};
document.getElementById('audiobutton').src="images/play.png";
};

resetOverlay = function(){
document.getElementById('overlay-message').style.opacity='0';
setTimeout(function(){document.getElementById('overlay-wrapper').style.visibility='hidden';}, 1500);
};