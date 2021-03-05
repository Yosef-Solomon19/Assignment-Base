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
		return restaurants.name.match(regex) 		

	});
}

// Create display function 
// Display matches from what the user is typing 
function displayMatches() {
	const matchArray = findMatches(this.value, names);
	const html = matchArray.map(restaurants => {
		const regex = new RegExp(this.value, 'gi');
		const restaurantName = restaurants.name.replace(regex, `<span class="h1">${this.value}</span>`); // Highlights the restaurants name 		
		return `
			<li>
			<span class = "title">${restaurantName}</span>
			<span class = "address">${restaurants.address_line_1}</span>
			<span class = "city">${restaurants.city}</span>
			<span class = "category">${restaurants.category}</span>
		`;
	}).join('');
	recommendations.innerHTML = html;	
	
}
const searchInput = document.querySelector('.typehead');
const recommendations = document.querySelector('.recommendations');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);