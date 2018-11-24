// Write your numbers code in this file!
function fetchTrivia(num, elementId = "one-facts") {
  let promiseForData = fetch(`http://numbersapi.com/${num}/trivia`)

  promiseForData
    .then(response => response.text())
    .then(function(trivia) {
      displayTrivia(trivia, elementId)
    })
};


function displayTrivia(trivia, elementId) {
  const div = document.getElementById(elementId);
  div.innerHTML = trivia;
};


function isValidNumber(input) {
  return isFinite((parseInt(input)))
};


const numberInput = document.getElementById("pick-a-number")
numberInput.addEventListener("change", function(event) {
  let input = numberInput.value
  if (isValidNumber(input)) {
    fetchTrivia(input, "random-math-fact");
  } else {
    const div = document.getElementById("random-math-fact");
    div.innerHTML = "please enter a valid number";
  }
});

function fetchYearFact(year) {
  let promiseForData = fetch(`http://numbersapi.com/${year}/year`)

  promiseForData
    .then(response => response.text())
    .then(showYearFact)
};


function showYearFact(fact) {
  let div = document.getElementById("year-history");
  div.innerHTML = fact;
}


function setYearFactInterval() {
  let year = new Date().getFullYear()
  fetchYearFact(year)
  setInterval(() => {
    year--
    fetchYearFact(year)
  }, 5000)
}


function getAllTheNumbers() {
  let promiseForData = fetch("http://numbersapi.com/1..100");

  return promiseForData.then(response => response.json());
}

const allNumbersButton = document.querySelector("#all-numbers-button");

allNumbersButton.addEventListener("click", function(event) {

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
});


document.addEventListener('DOMContentLoaded', function() {
  setYearFactInterval()
})
