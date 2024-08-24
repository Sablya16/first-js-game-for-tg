document.addEventListener('keydown', function(event) {
    const audio = document.getElementById('audio');
  
    // Проверяем, нажата ли кнопка управления
    if (event.key === 'ArrowUp' || event.key === 'w' ||
        event.key === 'ArrowDown' || event.key === 's' ||
        event.key === 'ArrowLeft' || event.key === 'a' ||
        event.key === 'ArrowRight' || event.key === 'd') {
      // Воспроизводим музыку
      audio.play();
    }
  });

document.addEventListener("DOMContentLoaded", function() {
  // Получаем элемент фона
  var background = document.querySelector(".space_background");

  // Устанавливаем начальное значение позиции фона по оси Y
  var initialPositionY = 0;

  // Функция для обновления позиции фона
  function updateBackgroundPosition() {
      // Увеличиваем позицию фона по оси Y
      initialPositionY -= -1;

      // Устанавливаем новую позицию фона по оси Y
      background.style.backgroundPositionY = initialPositionY + "px";

      // Если фон переместился на свою высоту, сбрасываем его позицию
      if (initialPositionY <= -background.offsetHeight) {
          initialPositionY = 0;
      }
  }

  // Обновляем позицию фона каждые 10 миллисекунд
  setInterval(updateBackgroundPosition, 10);
});

