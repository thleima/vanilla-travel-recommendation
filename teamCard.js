const teamCardContainer = document.querySelector(".team-card-container");

const team = [
	{ name: "John Doe", description: "John is responsible for...", role: "CEO" },
	{
		name: "Celina Thomas",
		description: "Celina is responsible for...",
		role: "Team Lead",
	},
	{
		name: "Myke Tysen",
		description: "Myke is responsible for...",
		role: "Delivery Head",
	},
];

for (let people of team) {
	teamCardContainer.innerHTML += teamCard(
		people.name,
		people.description,
		people.role
	);
}

function teamCard(name, description, role) {
	const card = `<div class="team-card">
							<div class="user">
								<i class="fa-regular fa-user"></i>
								<h4>${name}</h4>
							</div>
							<p>${description}</p>
							<span>${role}</span>
						</div>`;
	return card;
}
