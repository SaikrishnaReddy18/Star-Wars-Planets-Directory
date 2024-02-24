const planetsContainer = document.getElementById('planets');
const paginationContainer = document.getElementById('pagination');
let nextPageUrl = 'https://swapi.dev/api/planets/?format=json';
let prevPageUrl = '';

function fetchPlanets(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      nextPageUrl = data.next;
      prevPageUrl = data.previous;
      displayPlanets(data.results);
      displayPagination();
    })
    .catch(error => console.error('Error fetching planets:', error));
}

function displayPlanets(planets) {
  planetsContainer.innerHTML = '';
  planets.forEach(planet => {
    const residents = planet.residents.length > 0 ? `<ul class="residents-list">${planet.residents.map(resident => `<li>${resident}</li>`).join('')}</ul>` : 'No residents';
    const planetCard = `
      <div class="planet-card">
        <h2>${planet.name}</h2>
        <p><strong>Climate:</strong> ${planet.climate}</p>
        <p><strong>Population:</strong> ${planet.population}</p>
        <p><strong>Terrain:</strong> ${planet.terrain}</p>
        <p><strong>Residents:</strong> ${residents}</p>
      </div>
    `;
    planetsContainer.innerHTML += planetCard;
  });
}

function displayPagination() {
  paginationContainer.innerHTML = '';
  if (prevPageUrl) {
    const prevPageButton = `<button onclick="fetchPlanets('${prevPageUrl}')">Previous Page</button>`;
    paginationContainer.innerHTML += prevPageButton;
  }
  if (nextPageUrl) {
    const nextPageButton = `<button onclick="fetchPlanets('${nextPageUrl}')">Next Page</button>`;
    paginationContainer.innerHTML += nextPageButton;
  }
}

fetchPlanets(nextPageUrl);
