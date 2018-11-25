// Write your numbers code in this file!
function fetchTrivia(num) {
  return fetch(`http://numbersapi.com/${num}/trivia`).then(res => res.text())
}

const numOnebtn = document.getElementById('number-one')
const randomy = document.getElementById('pick-a-number')
const allnums = document.getElementById('all-numbers-button')

function getOne() {
const facts = document.querySelector('#one-facts')
facts.innerHTML = ''
fetchTrivia(1).then(blahblah => facts.innerHTML = blahblah)
}

function pickNumber(e) {
  e.preventDefault()
  const randomMath = document.querySelector('#random-math-fact')
  randomMath.innerHTML = ''
  if(isNaN(document.querySelector('#pick-a-number').value)) {
    randomMath.innerHTML = 'please enter a valid number'
  } else {
  fetchTrivia(document.querySelector('#pick-a-number').value).then(lala => randomMath.innerHTML = lala)
}}

function fetchToStudy(year) {
  return fetch(`http://numbersapi.com/${year}/year`).then(r => r.text())
}

function showFact(year) {
  const yeary = document.querySelector('#year-history')
  yeary.innerHTML = ''
  fetchToStudy(year).then(fact => {
    yeary.innerHTML = fact})
}

function yearInterval() {
  let year = new Date().getFullYear()
  showFact(year)
  setInterval(function() {
    year--
    showFact(year)
  },5000)
}

function allTheNumbers() {
  numbas = document.querySelector('#all-the-numbers')
  numbas.innerHTML = ''
  fetch('http://numbersapi.com/1..100').then(res => res.json()).then(lala => {
    let html = '<ul>'
    for(key in lala) {
      html += `<li>${lala[key]}</li>`
    }
    html += '</ul>'
    numbas.innerHTML = html
  })
}

document.addEventListener('DOMContentLoaded', () => {
  numOnebtn.addEventListener('click', getOne)
  randomy.addEventListener('change', pickNumber)
  yearInterval()
  allnums.addEventListener('click', allTheNumbers)
})
