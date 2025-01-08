const btnSearch = document.querySelector("#btnSearch");
const searchInput = document.querySelector("#search-input");
const results = document.getElementById("results");

btnSearch.addEventListener("click", handleSearch);

function handleSearch() {
	const input = searchInput.value.toLowerCase().trim();
	results.innerHTML = "";
	fetch("travel_recommendation.json")
		.then((response) => response.json())
		.then((data) => {
			const country = data.countries.find(
				(item) => item.name.toLowerCase() === input
			);
			if (country) {
				for (let city of country.cities) {
					results.innerHTML += createCard(
						city.imageUrl,
						city.name,
						city.description
					);
				}
			}
		});
}

function createCard(imgUrl, name, description) {
	return `				<div class="result-container">
					<div class="result-img"></div>
					<div class="result-text">
						<h3>${name}</h3>
						<p>
							${description}
						</p>
						<button>Visit</button>
					</div>
				</div>`;
}
