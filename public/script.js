const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"; // Adding array to a const variable 

// Empty array to put our restaurant names into 
const names=[];

// Using api fetch. Looking into Async/await as a replacement later
fetch(endpoint)
	.then(blob => blob.json())
	.then(data => names.push(...data))

// Run a function to show everything that matches the word being typed in the box
// The function is going to take this huge array and filter it down into a subset 
function findMatches(wordToMatch, names) {
	return names.filter(restaurants => {
		const regex = new RegExp (wordToMatch, 'gi');
		return restaurants.names.math(regex) 		

	});
}