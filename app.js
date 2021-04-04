let dataOutput;
let example = "example";
let search = "search";
let searchInput = document.getElementById('searchTerm');

function dataFromAPI(data){
    let word = data.entries[0].entry;
    let definition = data.entries[0].lexemes[0].senses[0].definition;
    let pronunciation;
    if(data.entries[0].pronunciations[0].audio == null){
        pronunciation = "No pronunciation found."
    }
    else{
        pronunciation = data.entries[0].pronunciations[0].audio.url;
    }
    let partOfSpeech = data.entries[0].lexemes[0].partOfSpeech;
    let profanityCheck = data.entries[0].lexemes[0].senses[0].labels;
    let transcription = data.entries[0].pronunciations[0].transcriptions[0].transcription;
    let alphabet = data.entries[0].pronunciations[0].transcriptions[0].notation;
    let wordCharacteristics = [word, definition, pronunciation, partOfSpeech, profanityCheck, transcription, alphabet];
    return wordCharacteristics;
}

//To Do:
//When creating the search ids, put the word 'search' in front of all names
//so that I can string interpolate the names 
function displayData(dataOutput, id){
    let displayWord = document.getElementById(`${id}Word`);
    displayWord.innerText = dataOutput[0];
    let displayDefinition = document.getElementById(`${id}Definition`);
    displayDefinition.innerText = dataOutput[1];
    let displayPartOfSpeech = document.getElementById(`${id}PartOfSpeech`);
    displayPartOfSpeech.innerText = dataOutput[3];
    let displayTranscription = document.getElementById(`${id}Transcription`);
    displayTranscription.innerText = dataOutput[5];
    let displayAlphabet = document.getElementById(`${id}Alphabet`);
    displayAlphabet.innerText = dataOutput[6];
    let displayPronunciation = document.getElementById(`${id}Pronunciation`);
    let pronunciationLink = document.getElementById(`${id}PronunciationLink`);
    if(dataOutput[2] == "No pronunciation found."){
        displayPronunciation.innerText = "No pronunciation found."
    }
    else{
        displayPronunciation.innerText = "Pronunciation";
        pronunciationLink.href = dataOutput[2];
    }
}

fetch(`https://lingua-robot.p.rapidapi.com/language/v1/entries/en/food`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "5528b23ad4msha4ad47087d0d6e0p1bd980jsn5eefe831977c",
		"x-rapidapi-host": "lingua-robot.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
	console.log(data);
    dataOutput = dataFromAPI(data);
    console.log(dataOutput);
    displayData(dataOutput, example);
})
.catch(err => {
	console.error(err);
});

function searchAPI(searchTerm){
fetch(`https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${searchTerm}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "5528b23ad4msha4ad47087d0d6e0p1bd980jsn5eefe831977c",
		"x-rapidapi-host": "lingua-robot.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
    console.log(data);
    dataOutput = dataFromAPI(data);
    console.log(dataOutput);
    //console.log(dataOutput[4]);
    profanityChecker(dataOutput[4]);
    displayData(dataOutput, search);
})
.catch(err => {
    console.error(err);
});
}

// searchAPI("food");

let searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', function(){
    let inputVal = searchInput.value;
    console.log(inputVal);
    searchAPI(inputVal);
})

function profanityChecker(profanityCheck){
    profanityCheck.forEach(element => {
        let showResult = document.getElementById('searchBlock');
        if(element == "vulgar"){
            //console.log("this was vulgar");
            // let showResult = document.getElementById('searchBlock');
            showResult.style.display = "none";
            alert("Hey! This is a family site! Go look up your profanity elsewhere!");
        }
        else{
            showResult.style.display = "block";
        }
    });
}