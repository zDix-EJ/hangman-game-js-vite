import { WORD } from './words-solo' //Массив слов для режима "Solo"
// import { IMAGINARY } from './together'

import { keyBoardLetters } from './keyboard' //Буквы для клавиатуры

const gameToHtml = document.getElementById('game')
const TitleGame = document.getElementById('logo')

let triesLeft
let winPoint

const switcher = document.getElementById('switcher')

// Черточки для отгадываемого слова
const createPlaceholders = () => {
	const word = sessionStorage.getItem('word')

	const wordArray = Array.from(word)
	const placeholderLetter = wordArray.reduce(
		(acc, curr, i) => acc + `<h1 id='letter__${i}' class = "letter"> _ </h1>`,
		''
	)

	return `<div class="placeholderLetters" id = 'placeholderLetters'><h1>${placeholderLetter}</h1></div>`
}

//Клавиатура

const CreateKeyboard = () => {
	const keyboard = document.createElement('div')
	keyboard.classList.add('keyboard')
	keyboard.id = 'keyboard'

	const letterArray = Array.from(keyBoardLetters)
	const keysHTML = letterArray.reduce(
		(acc, curr, i) =>
			acc + `<button id='${curr}' class = "keyboard__key">${curr}</button>`,
		''
	)
	keyboard.innerHTML = keysHTML
	return keyboard
}

//Экран с картинкой

const createHangmanImg = () => {
	const image = document.createElement('img')
	image.src = '/public/img/hg-0.png'
	image.alt = 'hangman image'
	image.classList.add('display')
	image.id = 'hangmanImage'

	return image
}

// Выбор случайного слова из массива "WORD" и запуск игры
export const startSoloGame = () => {
	triesLeft = 10
	winPoint = 0

	switcher.style.paddingBottom = '30px'
	TitleGame.style.fontSize = '2.5rem'

	const randomIndex = Math.floor(Math.random() * WORD.length)
	const wordToGuess = WORD[randomIndex]
	sessionStorage.setItem('word', wordToGuess)

	const checkLetter = letter => {
		const word = sessionStorage.getItem('word').toLowerCase()
		const inputLetter = letter.toLowerCase()
		//Буквы нет
		if (!word.includes(inputLetter)) {
			const triesCounter = document.getElementById('triesCount')
			triesLeft -= 1
			triesCounter.innerText = triesLeft
			updateTriesCount(triesLeft)

			const hangmanImg = document.getElementById('hangmanImage')
			hangmanImg.src = `/public/img/hg-${10 - triesLeft}.png`

			if (triesLeft === 0) {
				gameFinish('lose')
			}
		} else {
			//Буква есть
			const wordArray = Array.from(word)
			wordArray.forEach((currentLetter, i) => {
				if (currentLetter.toLowerCase() === inputLetter.toLowerCase()) {
					winPoint += 1
					if (winPoint === word.length) {
						gameFinish('win')
					}
					document.getElementById(`letter__${i}`).innerText =
						inputLetter.toUpperCase()
				}
			})
		}
	}

	// Сценарии завершения игры
	const gameFinish = result => {
		const word = sessionStorage.getItem('word')

		document.getElementById('triesLeft').remove()
		document.getElementById('keyboard').remove()
		document.getElementById('placeholderLetters').remove()

		const logo = document.getElementById('logo')
		logo.style.fontSize = '3.5rem'

		const gameEndDiv = document.createElement('div')
		gameEndDiv.classList.add('gameEnd')

		if (result === 'win') {
			//победа
			document.getElementById('hangmanImage').src = '/public/img/hg-win.png'

			const gameEndResult = document.createElement('h2')
			gameEndResult.className = 'gameEnd__result'
			gameEndResult.textContent = 'You Win!'

			const gameEndTriesLeft = document.createElement('p')
			gameEndTriesLeft.className = 'gameEnd__triesLeft'
			gameEndTriesLeft.textContent = `Tries left: ${triesLeft}`

			gameEndDiv.append(gameEndResult, gameEndTriesLeft)
			gameEndDiv.innerHTML += `<p class = "gameEnd__wasWord">That was the word: <span class = "gameEnd__word">${word}</span></p><button id = 'playAgain' class = 'gameEnd__btnPlayAgain'>Play again</button>`

			gameToHtml.append(gameEndDiv)
		} else if (result === 'lose') {
			//поражение
			const gameEndResult = document.createElement('h2')
			gameEndResult.className = 'gameEnd__result'
			gameEndResult.textContent = 'You Lose!'

			gameEndDiv.append(gameEndResult)
			gameEndDiv.innerHTML += `<p class = "gameEnd__wasWord">That was the word: <span class = "gameEnd__word">${word}</span></p><button id = 'playAgain' class = 'gameEnd__btnPlayAgain'>Play again</button>`

			gameToHtml.append(gameEndDiv)
		}

		document.getElementById('playAgain').onclick = startSoloGame
	}

	// Вывод в HTML

	gameToHtml.innerHTML = createPlaceholders()

	gameToHtml.innerHTML += `<p id= "triesLeft" class= "tries">TRIES LEFT: <span id="triesCount" class="tries__count">10<span></p>`

	// Изменение счетчика в зависимости от количества оставшихся попыток
	function updateTriesCount(count) {
		const numberElem = document.getElementById('triesCount')
		numberElem.textContent = count

		if (count <= 3) {
			numberElem.style.color = 'red'
		} else {
			numberElem.style.color = 'black'
		}
	}
	//Узнаю id нажатой клавиши
	const keyboardInDiv = CreateKeyboard()
	keyboardInDiv.addEventListener('click', event => {
		if (event.target.tagName.toLowerCase() === 'button') {
			event.target.disabled = true
			checkLetter(event.target.id)
		} else {
			return
		}
	})
	gameToHtml.appendChild(keyboardInDiv)

	const displayGame = createHangmanImg()
	gameToHtml.prepend(displayGame)
}
