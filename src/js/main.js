const html = document.documentElement
const mono = document.querySelector('.mono')
const color = document.querySelector('.color')
const switcher = document.getElementById('themeSwitcher')

/* Переключение темы */
function applyTheme(theme) {
	if (theme === 'mono') {
		html.classList.add('theme__mono')
		html.classList.remove('theme__color')
		mono.style.display = 'block'
		color.style.display = 'none'
	} else if (theme === 'color') {
		switcher.checked = true // Сохранение положения switcher`а
		html.classList.add('theme__color')
		html.classList.remove('theme__mono')
		color.style.display = 'block'
		mono.style.display = 'none'
	}
}

/* Сохранение темы */

// Переключение темы при клике
switcher.addEventListener('click', () => {
	if (html.classList.contains('theme__mono')) {
		applyTheme('color')
		localStorage.setItem('theme', 'color')
	} else {
		applyTheme('mono')
		localStorage.setItem('theme', 'mono')
	}
})

// Применение темы при загрузке
window.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem('theme')
	if (savedTheme) {
		applyTheme(savedTheme)
	} else {
		applyTheme('mono')
	}
})
