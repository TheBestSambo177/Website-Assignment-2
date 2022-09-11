//Javascript code
function loadJSONFile() {
	//1: Use CORS API website as proxy to retrieve XML file
	let proxy = 'https://cors-anywhere.herokuapp.com/';
	//Declare the URL indicates the location of the XML file
	let url = "http://danieldangs.com/itwd6-408/json/contact-eit.json";
	//2: Create XMLHttpRequest object
	let ourRequest = new XMLHttpRequest();
	//Set ourRequest to URL to get data (not send data)
	ourRequest.open('GET', proxy + url, true);
	//Send XMLHttpRequest object or ourRequest to URL
	ourRequest.send();
	
	//3: Receive response (reply) from URL and Process that data
	ourRequest.onload = function() {
		//Check if the response status is OK (o error), render data on web page
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
		//
		let receivedData = JSON.parse(ourRequest.responseText);
		//Build an html string which will be rendered on browser as an html-formated element
		let htmlString = "";

		//Retrieve question and relevant answer
		for (var i = 0; i < receivedData.length; i++) {
		//Add a <div> open tag
		htmlString += `<div style="background-color: yellow; margin: 10px; padding: 5px;">`;
		//Get name
		htmlString += "<h4>" + receivedData[i].name + "</h4>";
		//Get email
		htmlString += "<p4>" + receivedData[i].email + "</p4>";
		//Add the closing tag of div
		htmlString += "</div>";
		}

		//Render the whole htmlString to web page
		let faqContainer = document.getElementById("json-data");
		faqContainer.innerHTML = htmlString;

		//Add style to the html elements: add the <div> tag
		} else {
		//Exception handling
		console.log("Connected to the server successfully but it returned an error!");
		}
	}; 
}