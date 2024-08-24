clearGameField();
var player = document.querySelector('.player_model');

var playerPosition = { x: 300, y: 400 }; // Начальная позиция игрока
var speed = 200; // Скорость движения игрока (пикселей в секунду)
var acceleration = 10; // Коэффициент ускорения
var lastFrameTime = performance.now(); // Время последнего кадра
var keysPressed = {}; // Объект для отслеживания нажатых клавиш

document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    delete keysPressed[event.key];
});

function handleClickAnywhere(event) {
    // Проверяем, не является ли цель клика элементом .arrow
    if (!event.target.classList.contains('arrow')) {
        // Обработка события клика в любой области экрана
        console.log('Клик в любой области экрана!');
        console.log('Позиция клика: X = ' + event.clientX + ', Y = ' + event.clientY);
        fireFunction();
    }
}

// Добавляем обработчик события клика на документ
document.addEventListener('click', handleClickAnywhere);


/// Движение игрока ////////////////////////////////////////////////////////////////////
// Переменные для отслеживания состояния активности клавиш стрелок
var upArrowActive = false;
var downArrowActive = false;
var leftArrowActive = false;
var rightArrowActive = false;

// Обработчики событий для нажатия и отпускания клавиш стрелок
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            upArrowActive = true;
            break;
        case 'ArrowDown':
        case 's':
            downArrowActive = true;
            break;
        case 'ArrowLeft':
        case 'a':
            leftArrowActive = true;
            break;
        case 'ArrowRight':
        case 'd':
            rightArrowActive = true;
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'upArrow':
            upArrowActive = false;
            break;
        case 'ArrowDown':
        case 's':
        case 'downArrow':
            downArrowActive = false;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'leftArrow':
            leftArrowActive = false;
            break;
        case 'ArrowRight':
        case 'd':
        case 'rightArrow':
            rightArrowActive = false;
            break;
        default:
            break;
    }
});



// Функция для обработки нажатия на интерактивные стрелки
function handleInteractiveArrowPress() {
    document.querySelectorAll('.arrow').forEach(function(arrow) {
        // Обработчик для мыши
        arrow.addEventListener('mousedown', function(event) {
            event.preventDefault(); // Предотвращаем действия по умолчанию, чтобы избежать выделения текста
            switch (event.target.classList[1]) {
                case 'upArrow':
                    upArrowActive = true;
                    break;
                case 'downArrow':
                    downArrowActive = true;
                    break;
                case 'leftArrow':
                    leftArrowActive = true;
                    break;
                case 'rightArrow':
                    rightArrowActive = true;
                    break;
                default:
                    break;
            }
        });

        // Обработчик для отпускания мыши
        arrow.addEventListener('mouseup', function(event) {
            switch (event.target.classList[1]) {
                case 'upArrow':
                    upArrowActive = false;
                    break;
                case 'downArrow':
                    downArrowActive = false;
                    break;
                case 'leftArrow':
                    leftArrowActive = false;
                    break;
                case 'rightArrow':
                    rightArrowActive = false;
                    break;
                default:
                    break;
            }
        });

        // Обработчик для выхода мыши из элемента
        arrow.addEventListener('mouseout', function(event) {
            switch (event.target.classList[1]) {
                case 'upArrow':
                    upArrowActive = false;
                    break;
                case 'downArrow':
                    downArrowActive = false;
                    break;
                case 'leftArrow':
                    leftArrowActive = false;
                    break;
                case 'rightArrow':
                    rightArrowActive = false;
                    break;
                default:
                    break;
            }
        });

        // Обработчик для касания на мобильных устройствах
        arrow.addEventListener('touchstart', function(event) {
            event.preventDefault(); // Предотвращаем действия по умолчанию
            switch (event.target.classList[1]) {
                case 'upArrow':
                    upArrowActive = true;
                    break;
                case 'downArrow':
                    downArrowActive = true;
                    break;
                case 'leftArrow':
                    leftArrowActive = true;
                    break;
                case 'rightArrow':
                    rightArrowActive = true;
                    break;
                default:
                    break;
            }
        });

        // Обработчик для окончания касания на мобильных устройствах
        arrow.addEventListener('touchend', function(event) {
            switch (event.target.classList[1]) {
                case 'upArrow':
                    upArrowActive = false;
                    break;
                case 'downArrow':
                    downArrowActive = false;
                    break;
                case 'leftArrow':
                    leftArrowActive = false;
                    break;
                case 'rightArrow':
                    rightArrowActive = false;
                    break;
                default:
                    break;
            }
        });
    });
}



// Функция для перемещения игрока
function movePlayer() {
    var deltaTime = getDeltaTime();
    var step = speed * deltaTime / 1000;

    var newX = playerPosition.x;
    var newY = playerPosition.y;

    // Проверяем состояние активности клавиш стрелок
    if (upArrowActive) {
        newY -= step;
    }
    if (downArrowActive) {
        newY += step;
    }
    if (leftArrowActive) {
        newX -= step;
    }
    if (rightArrowActive) {
        newX += step;
    }

    // Проверяем, чтобы игрок не выходил за пределы экрана
    if (newX >= 0 && newX <= window.innerWidth - player.offsetWidth) {
        playerPosition.x = newX;
    }
    if (newY >= 0 && newY <= window.innerHeight - player.offsetHeight) {
        playerPosition.y = newY;
    }

    // Устанавливаем новую позицию игрока
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
}

//ENGINE
function gameLoop() {
    movePlayer();
    handleInteractiveArrowPress();
    // Проверяем коллизии игрока с каждым астероидом
    var asteroids = document.querySelectorAll('.asteroids');
    asteroids.forEach(function(asteroid) {
        if (checkCollision(player, asteroid)) {
            console.log('Press F');
            // Место для управления действиями игрока при коллизии с астероидом
        }
    });

    // Проверяем коллизии игрока с каждым топливом
    var fuels = document.querySelectorAll('.fuel');
    fuels.forEach(function(fuel) {
        if (checkCollision(player, fuel)) {
            increaseToplivoBar(); // Увеличиваем toplivoBar при коллизии с топливом
            fuel.remove(); // Удаляем топливо после коллизии
        }
    });

    requestAnimationFrame(gameLoop);
}
///ENGINE

function getDeltaTime() {
    var currentTime = performance.now();
    var deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    return deltaTime;
}
/// Движение игрока ///////////////////////////////////////////////////////////////////////


/// Астеройды /////////////////////////////////////////////////////////////////////////////
function spawnAsteroid() {
    // Создаем новый элемент астероида
    var asteroid = document.createElement('div');
    asteroid.classList.add('asteroids'); // Добавляем класс астероида
    asteroid.style.opacity = '0'; // Устанавливаем нулевую прозрачность

    // Получаем размеры контейнера field
    var fieldWidth = document.querySelector('.Death_zone').offsetWidth;
    var fieldHeight = document.querySelector('.Death_zone').offsetHeight;

    // Задаем случайные координаты астероида в пределах контейнера field
    var randomX = Math.random() * (fieldWidth - 75); // Ширина астероида
    var randomY = -175 - Math.random() * 200; // Начинаем астероид за пределами контейнера сверху

    // Устанавливаем случайные координаты
    asteroid.style.left = randomX + 'px';
    asteroid.style.top = randomY + 'px';

    // Добавляем астероид на страницу
    document.querySelector('.Death_zone').appendChild(asteroid);

    // Анимация появления астероида
    setTimeout(function() {
        asteroid.style.opacity = '1'; // Устанавливаем полную прозрачность после добавления на страницу
    }, 100);

    // Анимация падения астероида
    var fallInterval = setInterval(function() {
        randomY += 5 + acceleration/1.5; // Скорость падения астероида (+ speed/20 +
        asteroid.style.top = randomY + 'px';

        // Удаляем астероид, если он выходит за пределы смертельного поля снизу
        if (randomY > fieldHeight) {
            clearInterval(fallInterval); // Останавливаем интервал
            asteroid.remove(); // Удаляем астероид из DOM
            spawnAsteroid(); // Создаем новый астероид после удаления старого
        }
    }, 50); // Интервал анимации
}

// Запускаем создание астероидов каждые 2 секунды
var asteroidSpawnInterval = setInterval(function() {
    // Проверяем, сколько астероидов находится на странице
    var asteroidsCount = document.querySelectorAll('.asteroids').length;
    if (asteroidsCount < 10) {
        spawnAsteroid();
    }
}, 2000); // Интервал создания астероидов

//Timer

let startTime = new Date().getTime();

function updateTimer() {
  let currentTime = new Date().getTime();
  let timeDifference = currentTime - startTime;

  let hours = Math.floor(timeDifference / 1000 / 60 / 60);
  let minutes = Math.floor(timeDifference / 1000 / 60) % 60;
  let seconds = Math.floor(timeDifference / 1000) % 60;

  let timerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  document.querySelector(".timer").textContent = timerText;

  setTimeout(updateTimer, 1000);
}

function pad(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

updateTimer();

///Timer


//Score
let currentTimeTime = new Date().getTime();
let score = 0;
let killScore = 0;

function updateScore() {
  let currentTime = new Date().getTime();
  let timeDifference = currentTime - startTime;
  score = Math.floor(timeDifference / 1000) * 10 + killScore; // Примерно каждые 100 миллисекунд добавляется 10 очков

  document.querySelector(".score").textContent = score;

  setTimeout(updateScore, 100); // Обновление счета каждые 100 миллисекунд
}

updateScore();
///Score


//Collision
function checkCollision(player, asteroid) {
    // Получаем координаты и размеры игрока и астероида
    var playerRect = player.getBoundingClientRect();
    var asteroidRect = asteroid.getBoundingClientRect();

    // Проверяем пересечение координат игрока и астероида
    if (
        playerRect.left < asteroidRect.right &&
        playerRect.right > asteroidRect.left &&
        playerRect.top < asteroidRect.bottom &&
        playerRect.bottom > asteroidRect.top
    ) {
        return true; // Есть пробитие
    } else {
        return false; // Нет пробития
    }
}

///Collision


//Aceleration
function updateSpeed() {
    let currentTime = new Date().getTime();
    let timeDifference = currentTime - startTime;
    speed = 200 + Math.floor(timeDifference / 10000) * acceleration; // Увеличиваем скорость каждые 10 секунд на значение acceleration

    //Ограничю макс скорость, чтобы игра не становилась слишком сложной
    if (speed > 500) {
        speed = 500;
    }
    console.log("Текущая скорость: " + speed); // Выводим текущую скорость в консоль
}

setInterval(updateSpeed, 5000); // Обновляем скорость каждые 1 секундy //Build configuration
///Aceleration

//СМЕРТЬ
function checkConsoleLog() {
    var originalLog = console.log;
    console.log = function() {
        if (arguments[0] === "Press F") {
            window.location.href = "main_menu.html"; // Загрузить другой HTML документ
        }
        originalLog.apply(console, arguments);
    }
}
// Вызываем функцию для отслеживания сообщений в консоли
checkConsoleLog();
///СМЕРТЬ

//Score end
function saveFinalResults() {
    // Получаем текущие значения очков и времени из соответствующих элементов DOM
    var timerText = document.querySelector(".timer").textContent;

    // Преобразуем текст времени в миллисекунды
    var timeParts = timerText.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);
    var currentTimeTime = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

    // Сохраняем значения в localStorage
    localStorage.setItem('score', score);
    localStorage.setItem('currentTimeTime', currentTimeTime);

    // Выводим сохраненные данные в консоль
    console.log('Score:', score);
    console.log('Current Time:', new Date(currentTimeTime).toLocaleString());
}

// Вызываем функцию сохранения финальных результатов и вывода в консоль каждые 5 секунд
setInterval(saveFinalResults, 5000);
///SCORE END

// Массив путей к аудиофайлам
const songs = [
    'game.mp3',
    'main.mp3',
  ];
  
  // Получаем случайный индекс из массива песен
  const randomIndex = Math.floor(Math.random() * songs.length);
  
  // Получаем аудиоэлемент
  const audio = document.getElementById('audio');
  
  // Устанавливаем источник аудиофайла
  audio.src = songs[randomIndex];
  audio.play();
//

// Функция для обработки нажатия на кнопку fire_button




// input fire
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        fireFunction(); 
    }
    //console.log("Fire"); // Выводим fire
});

///

//Fire Function
function fireFunction() {
    var bullet = document.createElement('div');
    bullet.className = 'bullet';

    bullet.style.left = (playerPosition.x + player.offsetWidth / 2) + 'px';
    bullet.style.top = (playerPosition.y + player.offsetHeight / 2) + 'px';

    document.body.appendChild(bullet); // Добавьте пулю на игровое поле
    moveBullet(bullet); // Запустите функцию для движения пули
    //console.log("Bullet go!"); // Выводим fire
}
///

//  Polet Shmelya
function moveBullet(bullet) {
    var bulletSpeed = 5 + speed / 20 + acceleration / 1.5; // Скорость пули

    setTimeout(function() {
        bullet.style.opacity = '1'; // Устанавливаем полную прозрачность после добавления на field
    }, 5);

    var bulletInterval = setInterval(function() {
        bullet.style.top = (parseFloat(bullet.style.top) - bulletSpeed) + 'px';

        var enemydeath = checkenemyDeath(bullet);

        if (enemydeath) {
            enemydeath.remove();
            clearInterval(bulletInterval); // Останавливаем интервал движения пули
            bullet.remove(); // Удаляем пулю из DOM
        }

        // Проверяем коллизию пули с астероидами
        var collidedAsteroid = checkBulletCollision(bullet); // Получаем астероид, с которым произошла коллизия
        if (collidedAsteroid) {
            collidedAsteroid.remove(); // Удаляем астероид из DOM
            clearInterval(bulletInterval); // Останавливаем интервал движения пули
            bullet.remove(); // Удаляем пулю из DOM
        }
        
        // Проверяем, прошла ли пуля за пределы игрового поля
        if (parseFloat(bullet.style.top) < 0) {
            clearInterval(bulletInterval); // Останавливаем интервал движения пули
            bullet.remove(); // Удаляем пулю из DOM
        }
    }, 10);
}
///




// Выстрел игрока колизия
function checkBulletCollision(bullet) {
    var asteroids = document.querySelectorAll('.asteroids'); // Получаем все астероиды

    for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i];
        
        // Получаем координаты пули и астероида
        var bulletRect = bullet.getBoundingClientRect();
        var asteroidRect = asteroid.getBoundingClientRect();

        // Проверяем коллизию между пулей и астероидом
        if (bulletRect.top < asteroidRect.bottom &&
            bulletRect.bottom > asteroidRect.top &&
            bulletRect.left < asteroidRect.right &&
            bulletRect.right > asteroidRect.left) {
            console.log("BABAX!!"); // Выводим сообщение о коллизии в консоль
            Addictive_Score();
            console.log(score); // Выводим очки в консоль
            return asteroid; // Возвращаем астероид, с которым произошла коллизия
        }
    }
    return null; // Возвращаем null, если коллизии не произошло
}
///


//Babax asteroid
function Addictive_Score() {
    killScore += 25; // Добавляем 25 очков к killScore после уничтожения метеорита
  }
///
function Addictive_Score_Enemy() {
    killScore += 50; // Добавляем 25 очков к killScore после уничтожения метеорита
  }
///


    function KiborgUpitsaa() {
        var maxEnemies = 5; // Максимальное количество врагов
        var currentEnemies = document.querySelectorAll('.enemy').length; // Текущее количество врагов
        if (currentEnemies >= maxEnemies) return; // Если текущее количество врагов достигло максимума, выходим из функции
    
        // Создаем нового врага
        var enemy = document.createElement('div');
        enemy.classList.add('enemy', 'enemy-appear'); // Добавляем класс врага
    
        // Получаем размеры контейнера Death_zone
        var deathZone = document.querySelector('.Death_zone');
        var fieldWidth = deathZone.offsetWidth;
        var fieldHeight = deathZone.offsetHeight;
    
        // Задаем случайные координаты в пределах Death_zone
        var randomX = Math.random() * (fieldWidth - 75); // Ширина врага
        var randomY = Math.random() * (fieldHeight / 2); // Верхняя часть экрана
    
        // Проверяем, чтобы враг не выходил за пределы Death_zone
        var enemyWidth = 75; // Ширина врага
        var enemyHeight = 75; // Высота врага
        var newX = Math.min(Math.max(randomX, 0), fieldWidth - enemyWidth);
        var newY = Math.min(Math.max(randomY, 0), fieldHeight - enemyHeight);
    
        // Устанавливаем случайные координаты
        enemy.style.left = newX + 'px';
        enemy.style.top = newY + 'px';
    
        // Добавляем врага на страницу
        deathZone.appendChild(enemy);
        
        // Вызываем функцию стрельбы врага с этим врагом в качестве аргумента
        
        // Анимация движения врага
        var moveInterval = setInterval(function() {
            // Генерируем случайное смещение по X и Y
            var offsetX = (Math.random() - 0.5) * 10;
            var offsetY = (Math.random() - 0.5) * 5;
    
            // Вычисляем новые координаты
            var newX = enemy.offsetLeft + offsetX;
            var newY = enemy.offsetTop + offsetY;
    
            // Проверяем, чтобы враг не выходил за пределы смертельной зоны
            if (newX >= 0 && newX <= fieldWidth - enemy.offsetWidth) {
                enemy.style.left = newX + 'px';
            }
            if (newY >= 0 && newY <= fieldHeight - enemy.offsetHeight) {
                enemy.style.top = newY + 'px';
            }
            
        }, 100); // Интервал перемещения
    }
    
    
    setInterval(KiborgUpitsaa, 3000);
    setInterval(enemyFire, 4500);
    
    
    // Функция для стрельбы врагов
    function enemyFire(enemy) {
        var enemyBullet = document.createElement('div');
        enemyBullet.className = 'enemyBullet';
    
        // Устанавливаем начальные координаты пули на позиции врага
        enemyBullet.style.left = (enemy.offsetLeft + enemy.offsetWidth / 2) + 'px';
        enemyBullet.style.top = (enemy.offsetTop + enemy.offsetHeight) + 'px';


        document.body.appendChild(enemyBullet); // Добавляем пулю на игровое поле
        moveEnemyBullet(enemyBullet); // Запускаем функцию для движения пули
    }
    
    
    // Функция для движения пули врага
function moveEnemyBullet(enemyBullet) {
    var bulletSpeed = 5; // Скорость пули врага
    var deathZoneOffset = 25; // Отступ от нижней границы Death_zone

    setTimeout(function() {
        enemyBullet.style.opacity = '1'; // Устанавливаем полную прозрачность после добавления на field
    }, 1);

    var bulletInterval = setInterval(function() {
        // Получаем текущую позицию пули
        var currentTop = parseFloat(enemyBullet.style.top);

        // Проверяем, достигла ли пуля Death_zone
        if (currentTop + bulletSpeed >= window.innerHeight - deathZoneOffset) {
            clearInterval(bulletInterval); // Останавливаем интервал движения пули
            enemyBullet.remove(); // Удаляем пулю врага из DOM
            return; // Завершаем выполнение функции
        }

        // Перемещаем пулю
        enemyBullet.style.top = (currentTop + bulletSpeed) + 'px';

        // Проверяем столкновение пули с игроком
        checkEnemyBulletCollision(enemyBullet);
    }, 10);
}
    ///
    
// Функция для установки таймера стрельбы для одного врага
function setEnemyFireTimer(enemy) {
    // Генерируем случайное время до начала стрельбы от 1000 до 4000 миллисекунд
    var randomDelay = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;

    setTimeout(function() {
        enemyFire(enemy); // Вызываем стрельбу для врага
    }, randomDelay); // Устанавливаем случайную задержку перед стрельбой
}

// Устанавливаем интервал для создания врагов и установки таймера стрельбы
setInterval(function() {
    KiborgUpitsaa(); // Создаем нового врага
    var enemies = document.querySelectorAll('.enemy'); // Получаем всех врагов на поле
    enemies.forEach(function(enemy) {
        setEnemyFireTimer(enemy); // Устанавливаем таймер стрельбы для каждого врага
    });
}, 3000); // Каждые 3 секунды создаем врагов и устанавливаем таймер стрельбы
    



   // Выстрел в игрока колизия
function checkEnemyBulletCollision(enemyBullet) {
    // Получаем координаты пули и игрока
    var enemyBulletRect = enemyBullet.getBoundingClientRect();
    var playerRect = player.getBoundingClientRect();

    // Проверяем коллизию между пулей и игроком
    if (enemyBulletRect.top < playerRect.bottom &&
        enemyBulletRect.bottom > playerRect.top &&
        enemyBulletRect.left < playerRect.right &&
        enemyBulletRect.right > playerRect.left) {
        // Если попали, уменьшаем количество жизней игрока
        console.log("Press F");// Выводим сообщение о коллизии в консоль
        enemyBullet.remove(); // Удаляем пулю врага из DOM
        return true; // Возвращаем true, чтобы указать, что произошла коллизия
    }
    return false; // Возвращаем false, если коллизии не произошло
}
    ///

    //Создание бензина как и астеройдов
   /// Fuel /////////////////////////////////////////////////////////////////////////////
function spawnFuel() {
    // Создаем новый элемент fuel
    var fuel = document.createElement('div');
    fuel.classList.add('fuel'); // Добавляем класс топлива
    fuel.style.opacity = '0'; // Устанавливаем нулевую прозрачность

    // Получаем размеры контейнера field
    var deathZone = document.querySelector('.Death_zone');
    var fieldWidth = deathZone.offsetWidth;
    var fieldHeight = deathZone.offsetHeight;

    // Задаем случайные координаты fuel в пределах контейнера field
    var randomX = Math.random() * (fieldWidth - 75); // fuel по x
    var randomY = -175 - Math.random() * 200; // fuel по y

    // Устанавливаем случайные координаты
    fuel.style.left = randomX + 'px';
    fuel.style.top = randomY + 'px';

    // Добавляем fuel на страницу
    deathZone.appendChild(fuel);

    // Анимация появления fuel
    setTimeout(function() {
        fuel.style.opacity = '1'; // Устанавливаем полную прозрачность после добавления на страницу
    }, 100);

    // Анимация падения топлива
    var fallInterval = setInterval(function() {
        randomY += 5 * acceleration/3.5; // Скорость падения топлива
        fuel.style.top = randomY + 'px';

        // Удаляем топливо, если оно выходит за пределы смертельного поля снизу
        if (randomY > fieldHeight) {
            clearInterval(fallInterval); // Останавливаем интервал
            fuel.remove(); // Удаляем топливо из DOM
            spawnFuel(); // Создаем новое топливо после удаления старого
        }
    }, 50); // Интервал анимации
}

// Запускаем создание топлива каждые 5 секунд
var fuelSpawnInterval = setInterval(function() {
    // Проверяем, сколько топлива находится на странице
    var fuelCount = document.querySelectorAll('.fuel').length;
    if (fuelCount < 5) {
        spawnFuel();
    }
}, 5000); // Интервал создания топлива

// ROGUE liKE FUEL
// Анимация уменьшения toplivoBar
function decreaseToplivoBar() {
    var toplivoBar = document.querySelector('.toplivoBar');
    var currentWidth = toplivoBar.offsetWidth;
    
    if (currentWidth > 0) {
        // Уменьшаем ширину с обеих сторон
        toplivoBar.style.width = (currentWidth - 1) + 'px';
        toplivoBar.style.marginLeft = '1px'; 
        toplivoBar.style.marginRight = '1px';
        
        // Проверяем состояние toplivoBar
        if (toplivoBar.offsetWidth === 0) {
            console.log("Press F");
        }
        
        // Рекурсивно вызываем функцию decreaseToplivoBar каждые 10 миллисекунд
        setTimeout(decreaseToplivoBar, 100);
    }
}

// Начинаем анимацию уменьшения toplivoBar
decreaseToplivoBar();

// Проверка состояния toplivoBar и вывод сообщения в консоль
function checkToplivoBarState() {
    var toplivoBar = document.querySelector('.toplivoBar');
    
    if (toplivoBar.offsetWidth === 0) {
        console.log("Press F");
    }
}

//++toplivo
function increaseToplivoBar() {
    var toplivoBar = document.querySelector('.toplivoBar');
    var currentWidth = toplivoBar.offsetWidth;
    if (currentWidth < 100) {
        toplivoBar.style.width = (currentWidth + 50) + 'px'; // Увеличиваем на 10 пикселей
        toplivoBar.style.marginLeft = '1px'; // Устанавливаем отступы, чтобы видно было увеличение ширины
        toplivoBar.style.marginRight = '1px';
    }
}
///


//Collision with fuel 
function checkCollision(player, fuel) {
    var playerRect = player.getBoundingClientRect();
    var fuelRect = fuel.getBoundingClientRect();

    if (
        playerRect.left < fuelRect.right &&
        playerRect.right > fuelRect.left &&
        playerRect.top < fuelRect.bottom &&
        playerRect.bottom > fuelRect.top
    ) {
        return true; // Есть столкновение
    } else {
        return false; // Нет столкновения
    }
}

// Обработка коллизий и увеличение toplivoBar
function fuelCheck() {
    var player = document.querySelector('.player'); // Предполагается, что у вас есть элемент игрока с классом 'player'
    var fuels = document.querySelectorAll('.fuel'); // Предполагается, что у вас есть элементы топлива с классом 'fuel'
    var toplivoBar = document.querySelector('.toplivoBar');

    fuels.forEach(function(fuel) {
        if (checkCollision(player, fuel)) {
            increaseToplivoBar(); // Увеличиваем значение toplivoBar при коллизии с топливом
            fuel.remove(); // Удаляем топливо после коллизии
        }
    });
}

///


function checkenemyDeath(bullet) {
    var enemies = document.querySelectorAll('.enemy'); // Получаем всех врагов

    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        
        // Получаем координаты пули и врага
        var bulletRect = bullet.getBoundingClientRect();
        var enemyRect = enemy.getBoundingClientRect();

        // Проверяем коллизию между пулей и врагом
        if (bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top &&
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left) {
            console.log("Enemy hit!"); // Выводим сообщение о попадании во врага
            Addictive_Score_Enemy();
            
            enemy.remove(); // Удаляем врага из DOM
            return enemy; // Возвращаем врага, с которым произошло попадание
        }
    }
    return null; // Возвращаем null, если коллизии не произошло
}


function clearGameField() {
    var fuels = document.querySelectorAll('.fuel');
    var enemies = document.querySelectorAll('.enemy');
    var asteroids = document.querySelectorAll('.asteroid');
    var enemyBullet = document.querySelectorAll('.enemybullet');


    // Удаляем все топливо
    fuels.forEach(function(fuel) {
        fuel.parentNode.removeChild(fuel);
    });

    // Удаляем всех врагов
    enemies.forEach(function(enemy) {
        enemy.parentNode.removeChild(enemy);
    });

    // Удаляем все астероиды
    asteroids.forEach(function(asteroid) {
        asteroid.parentNode.removeChild(asteroid);
    });

    // Удаляем все астероиды
    enemyBullet.forEach(function(enemyBullet) {
        enemyBullet.parentNode.removeChild(enemyBullet);
    });
   
}
    



gameLoop();
