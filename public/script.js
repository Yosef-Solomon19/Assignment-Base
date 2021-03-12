const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"; // Adding array to a const variable 

async function windowActions() {
	const request = await fetch(endpoint) // Fetch request
	const names = await request.json() // Empty array, this replaces the race condition promise chain
																		// from the original tutorial


	function findMatches(wordToMatch, names){
		return names.filter(restaurants => {
			const regex = new RegExp (wordToMatch, 'gi');
			return restaurants.name.match(regex)
		});
	}

	function displayMatches(event) {
		const matchArray = findMatches(event.target.value, names);
		const html = matchArray.map(restaurants => {
			const regex = new RegExp(event.target.value, 'gi');
			const restaurantName = restaurants.name.replace(regex, `<span class="h1">${event.target.value}</span>`); // Highlights the restaurants name 		
			return `
				<li>
				<span class = "title">${restaurantName}</span>
				<span class = "address">${restaurants.address_line_1}</span>
				<span class = "city">${restaurants.city}</span>
				<span class = "category">${restaurants.category}</span>
				</li>
			`;
		}).join('');
		recommendations.innerHTML = html;	
		
	}

	const searchInput = document.querySelector('.typehead');
	const recommendations = document.querySelector('.recommendations');

	searchInput.addEventListener('change', displayMatches);
	searchInput.addEventListener('keyup', (evt) => {
		displayMatches(evt)
	});
		
}

window.onload = windowActions;