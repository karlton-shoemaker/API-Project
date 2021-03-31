let test = document.getElementById("test");
test.style.color = "brown";

fetch("https://lingua-robot.p.rapidapi.com/language/v1/entries/en/squelch", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "5528b23ad4msha4ad47087d0d6e0p1bd980jsn5eefe831977c",
		"x-rapidapi-host": "lingua-robot.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
    //JSON.parse(response);
	console.log(data);
    console.log(data.entries[0].entry);
    test.innerText = data.entries[0].entry;
})
.catch(err => {
	console.error(err);
});