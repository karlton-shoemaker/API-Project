let test = document.getElementById("test");
test.style.color = "brown";

fetch("https://lingua-robot.p.rapidapi.com/language/v1/entries/en/link", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "5528b23ad4msha4ad47087d0d6e0p1bd980jsn5eefe831977c",
		"x-rapidapi-host": "lingua-robot.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
	console.log(data);
    //console.log(data.entries[0].pronunciations[0].transcriptions[0]);
    let word = data.entries[0].entry;
    let definition = data.entries[0].lexemes[0].senses[0].definition;
    let pronunciation = data.entries[0].pronunciations[0].audio.url;
    let partOfSpeech = data.entries[0].lexemes[0].partOfSpeech;
    let profanityCheck = data.entries[0].lexemes[0].senses[0].labels;
    let transcription = data.entries[0].pronunciations[0].transcriptions[0].transcription;
    let alphabet = data.entries[0].pronunciations[0].transcriptions[0].notation;
    let wordCharacteristics = [word, definition, pronunciation, partOfSpeech, profanityCheck, transcription, alphabet];
    test.innerText = wordCharacteristics;
})
.catch(err => {
	console.error(err);
});