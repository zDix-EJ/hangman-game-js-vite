import { switchThemeHandle } from './chang-theme' //Переключение темы и ее сохранение в браузере

import { startSoloGame } from './game'

switchThemeHandle()

const gameStartBtn = document.getElementById('startSolo')
gameStartBtn.addEventListener('click', startSoloGame)
