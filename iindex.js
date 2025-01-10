const btnSearch = document.querySelector("#btn-search");
const btnClear = document.querySelector("#btn-clear");
const results = document.querySelector("#home-results");

const searchInput = document.querySelector("#search-input");

btnSearch.addEventListener("click", handleSearch);
btnClear.addEventListener("click", handleClear);

const file = "./travel_recommendation.json";
const searchKeywords = {
	countries: ["country", "countries", "australia", "japan", "brazil"],
	temples: ["temple", "temples", "angkor wat", "taj mahal"],
	beaches: ["beach", "beaches", "bora bora", "copacabana beach"],
};

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

function isWordValid(keywords, inp) {
	let isValid = false;
	for (let th in keywords) {
		if (keywords[th].includes(inp)) {
			isValid = true;
			break;
		}
	}
	return isValid;
}

function handleSearch() {
	results.innerHTML = "";
	const input = searchInput.value.trim().toLowerCase();
	let data_to_print;
	if (!isWordValid(searchKeywords, input)) {
		results.innerHTML = `<div class="card-container"><p>No results found. Try a new search !</p></div>`;
	}
	// ** Search within the keywords object defined
	for (let theme in searchKeywords) {
		// ** Check if the word searched, is included in keywords
		if (searchKeywords[theme].includes(input)) {
			// ** YES ? Check what is the theme associated
			if (theme === "beaches" || theme === "temples") {
				data_to_print = data[theme];
				iterateAndDisplay(data_to_print);
			}
			if (theme === "countries") {
				const allCountries = data[theme];
				// ** Check if it's a search for 1 country
				if (getCountry(allCountries, input)) {
					data_to_print = getCountry(allCountries, input);
					iterateAndDisplay(data_to_print);
				} else {
					// ** Or all countries
					allCountries.forEach((country) => {
						for (let city of country.cities) {
							results.innerHTML += createCard(
								city.imageUrl,
								city.name,
								city.description
							);
						}
					});
				}
			}
		}
	}
}

function iterateAndDisplay(array) {
	array.forEach((item) => {
		results.innerHTML += createCard(item.imageUrl, item.name, item.description);
	});
}

function getCountry(array, inp) {
	let value;
	for (let el of array) {
		if (el.name.toLowerCase() === inp) {
			value = el.cities;
			break;
		}
	}
	return value;
}

function createCard(img, name, description) {
	return `<div class="card-container">
						<img src="${img}" alt="Image of ${name}" />
						<h4>${name}</h4>
						<p><i>${description}</i></p>
					</div>`;
}

function handleClear() {
	searchInput.value = "";
	results.innerHTML = "";
}
