const btnSearch = document.querySelector("#btn-search");
const btnClear = document.querySelector("#btn-clear");
const results = document.querySelector("#home-results");

const searchInput = document.querySelector("#search-input");

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
const file = "./travel_recommendation.json";
fetchData(file);

const getPlurialCategories = (category) => {
	if (category.endsWith("h")) return "beaches";
	if (category.endsWith("e")) return "temples";
	return category;
};

const searchThroughRecommendations = () => {
	results.innerHTML = "";
	const input = searchInput.value.trim().toLowerCase();
	const categoriesRegex =
		/\b(country|countries|beach|beaches|temple|temples)\b/;

	if (!input || !input.match(categoriesRegex)) {
		results.innerHTML = noResultCard();
		return;
	}

	// Search by category (beach(es) temple(s))
	if (input.match(categoriesRegex)) {
		const pluralCategory = getPlurialCategories(input);
		console.log(data[pluralCategory]);
		iterateAndDisplay(data[pluralCategory]);
		return;
	}

	// Special for country / countries
	if (input.match(categoriesRegex) && input.startsWith("count")) {
		let arr = data["countries"].map((el) => el.cities);
		let newarr = arr.reduce((initial, curr) => initial.concat(curr), []);
		iterateAndDisplay(newarr);
		return;
	}

	// Search by country name (japan, brazil, australia)
	let returnValue = null;
	for (let item in data) {
		data[item].forEach((el) => {
			if (el.name.toLowerCase().includes(input.toLowerCase()) && !returnValue) {
				returnValue = el?.cities ?? el;
				iterateAndDisplay(returnValue);
			}
		});
	}
};

function iterateAndDisplay(array) {
	array.forEach((item) => {
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

btnSearch.addEventListener("click", searchThroughRecommendations);
btnClear.addEventListener("click", handleClear);
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		searchThroughRecommendations();
	}
});
