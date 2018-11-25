// Write your swapi code in this file!

function fetchSwapi(type, num) {
return fetch(`https://swapi.co/api/${type}/${num}`).then(response => response.json())
}

function getOpeningCrawl() {
  fetchSwapi('films', 1).then(divy => {
  const crawly = document.getElementById('crawlDiv')
  crawly.innerText = divy.opening_crawl
  })
}



function getPlanet(e) {
  e.preventDefault()
  const planetId = parseInt(document.querySelector('#planetInput').value)
  fetchSwapi('planets', planetId).then(hmm => document.getElementById('planetData').innerHTML = `<p>Name: ${hmm.name}</p><p>Climate: ${hmm.climate}</p>`)
}

function getHomePlanet(planett, id) {
  fetch(planett).then(r => r.json()).then(planet => {
    document.getElementById(`droid-${id}-homeworld`).innerText = planet.name
  })
}

function getDroids() {
  const droidIDs = [2, 3]
  droidIDs.map(id => {
    const droidName = document.getElementById(`droid-${id}-name`)
    const droidHeight = document.getElementById(`droid-${id}-height`)
    const droidMass = document.getElementById(`droid-${id}-mass`)
    const droidBtn = document.getElementById(`droid-${id}-btn`)
    fetchSwapi("people", id).then(droid => {
      droidName.innerText = droid.name
      droidHeight.innerText = droid.height
      droidMass.innerText = droid.mass
      droidBtn.addEventListener('click', () => getHomePlanet(droid.homeworld, id))
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#crawlBtn').addEventListener('click', getOpeningCrawl)
  document.querySelector('#planetForm').addEventListener('submit', getPlanet)
  document.querySelector('#find-droids').addEventListener('click', getDroids)
})
