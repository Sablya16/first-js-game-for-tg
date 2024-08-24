const playBtn = document.getElementById('play');
const aboutBtn = document.getElementById('about');
const exitBtn = document.getElementById('exit');



exitBtn.addEventListener('click', function() {
    window.close(); // Закроет текущее окно браузера
});

playBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

aboutBtn.addEventListener('click', function() {
    window.location.href = 'https://instagram.com/sad_b1tchy_fake/';
});

// Получаем счет и время из localStorage
var score = parseInt(localStorage.getItem('score'));
var currentTimeTime = parseInt(localStorage.getItem('Current Time'));

// Пример использования
console.log('Последний счет:', score);
console.log('Последнее время:', currentTimeTime);
// Пример использования
console.log('Последний счет:', score);


var audioFiles = ["game.mp3", "main.mp3"]; // Список ваших аудиофайлов

document.addEventListener('click', function() {
    var randomIndex = Math.floor(Math.random() * audioFiles.length); // Генерация случайного индекса
    var audio = new Audio(audioFiles[randomIndex]); // Создание аудиоэлемента с выбранным аудиофайлом
    audio.play(); // Проигрывание аудио
});

// Функция для обновления очков из localStorage
function updateScoreFromLocalStorage() {
    // Проверяем, есть ли сохраненные данные в localStorage
    if (!isNaN(score)) {
        // Если есть, обновляем элемент с классом .score-value
        var scoreElement = document.querySelector('.score-value');
        if (scoreElement) {
            scoreElement.textContent = score;
            console.log('Счет из localStorage обновлен:', score);
        } else {
            console.log('Элемент с классом .score-value не найден.');
        }
    } else {
        console.log('Нет сохраненных данных счета в localStorage.');
    }
}

// Вызываем функцию обновления очков из localStorage
updateScoreFromLocalStorage();



function ClickMusic ()
{
  document.addEventListener('click', function() {
    var audio = document.getElementById('audio');
    audio.play();
});

} 

