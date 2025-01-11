const btnSearch = document.querySelector("#btn-search");
const btnClear = document.querySelector("#btn-clear");
const results = document.querySelector("#home-results");

const searchInput = document.querySelector("#search-input");

btnSearch.addEventListener("click", handleSearch);
btnClear.addEventListener("click", handleClear);

const file = "./travel_recommendation.json";
// The keywords that are valid for a search
const searchKeywords = {
	countries: ["country", "countries", "australia", "japan", "brazil"],
	temples: ["temple", "temples", "angkor wat", "taj mahal"],
	beaches: ["beach", "beaches", "bora bora", "copacabana beach"],
};

// Fetch data
let data;
async function fetchData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		data = await response.json();
	} catch (error) {
		console.error(error.message);
	}
}

fetchData(file);

// Function that fires when a word is searched
function handleSearch() {
	results.innerHTML = "";
	const input = searchInput.value.trim().toLowerCase();
	// Input is not in keywords, stop here
	if (!isWordValid(searchKeywords, input)) {
		results.innerHTML = noResultCard();
		return;
	}
	// ** Search within the keywords object defined
	for (let theme in searchKeywords) {
		// ** Check if the word searched, is included in keywords
		if (searchKeywords[theme].includes(input)) {
			// ** YES ? Check what is the theme associated
			switch (theme) {
				case "beaches":
					iterateAndDisplay(data[theme]);
					break;
				case "temples":
					iterateAndDisplay(data[theme]);
					break;
				case "countries":
					const allCountries = data[theme];
					// ** Check if it's a search for 1 country
					const searchedCountry = allCountries.find(
						(item) => item.name.toLowerCase() === input
					);
					if (searchedCountry) {
						iterateAndDisplay(searchedCountry.cities);
					} else {
						// ** Or all countries
						iterateAndDisplay(allCountries);
					}
			}
			break;
		}
	}
}

function isWordValid(keywords, inp) {
	let isValid = false;
	for (let word in keywords) {
		if (keywords[word].includes(inp)) {
			isValid = true;
			break;
		}
	}
	return isValid;
}

function iterateAndDisplay(array) {
	array.forEach((item) => {
		if (item.cities) {
			iterateAndDisplay(item.cities);
			return;
		}
		results.innerHTML += createCityCard(
			item.imageUrl,
			item.name,
			item.description
		);
	});
}

function createCityCard(img, name, description) {
	return `<div class="card-container">
						<img src="${img}" alt="Image of ${name}" />
						<h4>${name}</h4>
						<p><i>${description}</i></p>
					</div>`;
}

function noResultCard() {
	return `<div class="card-container"><p>No results found. Try a new search !</p></div>`;
}

function handleClear() {
	searchInput.value = "";
	results.innerHTML = "";
}
