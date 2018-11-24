// Write your swapi code in this file!
function getOpeningCrawl() {
  let promiseForData = fetch('https://swapi.co/api/films/1/')
  debugger
  promiseForData
    .then(response => response.json())
    .then(displayCrawl)
}


function displayCrawl(film) {
  const crawlDiv = document.getElementById("crawlDiv");
  crawlDiv.innerHTML = film.opening_crawl;
}


function displayPlanet(json, elementId) {
  const planetElement = document.getElementById(elementId);

  planetElement.innerHTML = `
  <div>Planet Name: ${json.name}</div>
  <div>Planet Climate: ${json.climate}</div>`
};


function getPlanet(id, elementId = "planetData") {
  let promiseForData = fetch(`https://swapi.co/api/planets/${id}`)

  promiseForData
    .then(response => response.json())
    .then((json) => displayPlanet(json, elementId))
};


const planetForm = document.getElementById("planetForm");


planetForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const planetInput = document.getElementById("planetInput");
  getPlanet(planetInput.value);
});


function getHomePlanet(planetURL) {
  let elementEventTargetId = event.target.id
  let id = planetURL.match(/(?<=planets\/)\d/)[0];
  getPlanet(id, `${elementEventTargetId}-planet`);
}


function displayDroid(droid) {
  let id = droid.url.match(/(?<=people\/)\d/)[0]
  let droidDiv = document.getElementById(`droid-${id}`);
  droidDiv.innerHTML = `
  <div><b>Name: ${droid.name}</b></div>
  <div>Height: ${droid.height}</div>
  <div>Mass: ${droid.mass}</div>
  <button id = droid-${id}-btn onclick = getHomePlanet("${droid.homeworld}") >Home Planet</button>`
}


function getDroids(id) {
  let promiseForData = fetch(`https://swapi.co/api/people/${id}`)

  promiseForData
    .then(response => response.json())
    .then(displayDroid)
}

getDroids(3);
getDroids(4);
