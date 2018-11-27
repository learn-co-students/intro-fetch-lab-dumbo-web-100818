// Write your swapi code in this file!

const crawlBtn = document.getElementById("crawlBtn")
const planetButton = document.getElementById("findPlanet")


crawlBtn.addEventListener("click", event=>{
  getOpeningCrawl();
})

planetButton.addEventListener("click", event=>{
  const planetText = document.getElementById("planetInput")
  getPlanetData(planetText.value)
})


function getOpeningCrawl() {
  fetch("https://swapi.co/api/films/1")
  .then(res => {
    return res.json()
  })
  .then(json => {
    addToHtml(json)
  })
  .catch(err=>console.log(err))
}

function addToHtml(givenJson){
  const openingCrawl = `<p id="firstCrawl"> "${givenJson.opening_crawl}"<button onclick="deleteCrawl()">Delete</button> </p>`
  const crawlDiv = document.getElementById("crawlDiv")
  //const delButton = `<button>Delete</button>`
  crawlDiv.innerHTML = openingCrawl

}

function deleteCrawl() {
  document.getElementById("firstCrawl").remove()
}

function getPlanetData(givenPlanet){
  let planetId = parseInt(givenPlanet)
  if(planetId > 60 || planetId < 1 || isNaN(planetId)){
    alert("Please enter a valid id between 1 and 60")
  }else{
    fetch(`https://swapi.co/api/planets/${planetId}/`)
    .then(res => res.json())
    .then(json => {
      addToPlanetDiv(json)
    })
    .catch(err => alert(err))
  }
}

function addToPlanetDiv(givenJson) {
  let planetData = document.getElementById("planetData")
  let planetInfo = `<ul id="${givenJson.name}">
                      <li>Name: ${givenJson.name}</li>
                      <li>Climate: ${givenJson.climate}</li>
                      <li>Gravity: ${givenJson.gravity}</li>
                      <button id="${givenJson.name} "onclick="deletePlanet(${givenJson.name})">Delete</button>
                    </ul>`;
  planetData.innerHTML+=planetInfo
}

function deletePlanet(givenId) {
  document.getElementById(givenId.id).remove()
}
