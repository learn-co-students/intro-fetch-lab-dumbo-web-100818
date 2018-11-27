document.addEventListener("DOMContentLoaded",()=>{
  getYearInfo()
  const numberOne = document.getElementById("number-one")
  numberOne.addEventListener("click", event => {
    getFactAboutNumber(1);
  })

  const pickANumber = document.getElementById("pick-a-number")
  pickANumber.addEventListener("change", (e)=>{
    const randomNumber = parseInt(pickANumber.value)
    if(isNaN(randomNumber)){
      const randomFactsDiv = document.getElementById("random-math-fact")
      randomFactsDiv.innerHTML = "please enter a valid number"
    }else{
      getFactAboutNumber(randomNumber)
    }
  })
  let allNumbersButton = document.querySelector('#all-numbers-button')
  allNumbersButton.addEventListener('click', showAllTheNumbers)
})

function getAllTheNumbers() {
  return fetch('http://numbersapi.com/1..100').then(res => res.json())
}

function showAllTheNumbers() {
  const div = document.querySelector('#all-the-numbers')
  div.innerHTML = ''
  getAllTheNumbers().then(numbers => {
    let html = '<ul>'
    for (key in numbers) {
      html += `<li>${numbers[key]}</li>`
    }
    html += '</ul>'
    div.innerHTML = html
  })
}
//
// document.getElementById("all-numbers-button").addEventListener("click", (number)=>{
//   const container = document.getElementById("all-the-numbers")
//   const ul = `<ul></ul>`
//   container.innerHTML = ul
//   for(let i = 0; i < 100; i++){
//     let randNumber = Math.random()*100
//     let randInt = Math.floor(randNumber)
//     fetchFact(randInt)
//   }
//
// })
//
// function fetchFact(givenNumber) {
//       fetch(`http://numbersapi.com/${givenNumber}/trivia`)
//       .then(res => res.text())
//       .then(json => displayFacts(json))
//       .catch(err => console.log(err))
// }
//
// function displayFacts(givenFacts){
//   const container = document.getElementById("all-the-numbers")
//   const ul = container.firstElementChild
//   let newLi = `<li>
//                     ${givenFacts}
//                   </li>`;
//   ul.innerHTML += newLi
// }
//


function getYearInfo() {
  var year = new Date().getFullYear()
  fetchyearInfo(year)
  setInterval(function(e){
    year--
    fetchyearInfo(year)
  }, 5000)
}

function fetchyearInfo(year) {
  return fetch(`http://numbersapi.com/${year}/year`)
    .then(res => res.text())
    .then(json => addYearInfo(json))
    .catch(err => console.log(err))
}


function addYearInfo(givenYearInfo) {
  let yearHistory = document.getElementById("year-history")
  yearHistory.innerHTML = givenYearInfo
}


function getFactAboutNumber(numberGiven) {
  fetch(`http://numbersapi.com/${numberGiven}/trivia`)
  .then(res => res.text())
  .then(json => addToFacts(json, numberGiven))
  .catch(err => alert(err))
}

function addToFacts(json, givenNumber) {
  if (givenNumber===1){
    const oneDiv = document.getElementById("one-facts")
    oneDiv.innerHTML = json

  }else {
    const randomFactsDiv = document.getElementById("random-math-fact")
    randomFactsDiv.innerHTML = json

  }
}
