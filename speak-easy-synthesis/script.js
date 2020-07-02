/*jshint esversion: 6 */

var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
  var foundVoice = voices.find(searchNederlands);
  return foundVoice;
}

function searchNederlands(voice){
  return voice.lang === "nl-NL";
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  //for chrome this is asynchronous
  speechSynthesis.onvoiceschanged = populateVoiceList;
} else {
  populateVoiceList();
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    var utterThis = new SpeechSynthesisUtterance("Praat een beetje Nederlands alsjeblieft");
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    };
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    };
    utterThis.voice = populateVoiceList();
    console.log(utterThis.voice);
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}

inputForm.onsubmit = function(event) {
  event.preventDefault();
  speak();
};
