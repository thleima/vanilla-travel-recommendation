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
			} else if (input === "temples" || input === "temple") {
				for (let temple of data.temples) {
					results.innerHTML += createCard(
						temple.imageUrl,
						temple.name,
						temple.description
					);
				}
			} else if (input === "beaches" || input === "beach") {
				for (let beach of data.beaches) {
					results.innerHTML += createCard(
						beach.imageUrl,
						beach.name,
						beach.description
					);
				}
			} else {
				results.innerHTML += "No results found";
			}
		})
		.catch((error) => {
			console.log("Error fetching data : ", e);
			results.innerHTML += "Error";
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
