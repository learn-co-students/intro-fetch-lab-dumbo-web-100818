function fetchTrivia(num) {
	return fetch(`http://numbersapi.com/${num}/trivia`).then(res => res.text())
}

function fetchYearFact(year) {
	return fetch(`http://numbersapi.com/${year}/year`).then(res => res.text())
}

function showOneTrivia() {
	const div = document.querySelector('#one-facts')
	div.innerHTML = ''
	fetchTrivia(1).then(trivia => {
		div.innerHTML = trivia
	})
}

function showTrivia(e) {
	e.preventDefault()
	console.log("here")
	const div = document.querySelector('#random-math-fact')
	div.innerHTML = ''
	const num = document.querySelector('#pick-a-number').value

	if (isNaN(num)) {
		div.innerHTML = 'please enter a valid number'
	}else {fetchTrivia(num).then(trivia => {
		div.innerHTML = trivia
	})}
}

function showYearFact(year) {
	const div = document.querySelector('#year-history')
	div.innerHTML = ''

	fetchYearFact(year).then(fact => {
		div.innerHTML = fact
	})
}

function setYearFetchInterval() {
	const year = (new Date()).getFullYear()
	showYearFact(year)
	setInterval(() => {
		showYearFact(year)
	}, 5000)
}

function fetchAllFacts(num) {
	return fetch(`http://numbersapi.com/1..100`).then(res => res.json())
}

function showHundredFacts() {
	const div = document.querySelector('#all-the-numbers')
	div.innerHTML = ''
	fetchAllFacts().then(numbers => {
		let html = '<ul>'
		for(key in numbers) {
			html += `<li>${numbers[key]}</li>`
		}
		html += '</ul>'
		div.innerHTML = html
	})
}

document.addEventListener('DOMContentLoaded', function() {
	let oneButton = document.querySelector('#number-one')
	oneButton.addEventListener('click', showOneTrivia)
	let numShow = document.querySelector('#pick-a-number')
	numShow.addEventListener('change', showTrivia)
	setYearFetchInterval()
	let allNumButton = document.querySelector('#all-numbers-button')
	allNumButton.addEventListener('click', showHundredFacts)
})