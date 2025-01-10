const btnSearch = document.querySelector("#btn-search");
const btnClear = document.querySelector("#btn-clear");
const results = document.querySelector("#home-results");

const searchInput = document.querySelector("#search-input");

btnSearch.addEventListener("click", handleSearch);

const file = "./travel_recommendation.json";
const searchKeywords = {
	countries: ["country", "countries", "australia", "japan", "brazil"],
	temples: [
		"temple",
		"temples",
		"angkor wat",
		"taj mahal",
		"india",
		"cambodia",
	],
	beaches: [
		"beach",
		"beaches",
		"bora bora",
		"french polynesia",
		"copacabana beach",
	],
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

function handleSearch() {
	const sydney = data.countries[0].cities[0];
	console.log(sydney);
	results.innerHTML += createCard(
		sydney.imageUrl,
		sydney.name,
		sydney.description
	);
}

function createCard(img, name, description) {
	return `<div class="card-container">
						<img src="${img}" alt="" />
						<h4>${name}</h4>
						<p>${description}</p>
					</div>`;
}
