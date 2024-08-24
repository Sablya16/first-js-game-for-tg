//models
var player = document.querySelector('.player_model');
var bullet = document.querySelector('.bullet');
var asteroids = document.querySelector('.asteroids');
//mechanics
var playerPosition = { x: 300, y: 400 }; // 
var speed = 200; // 
var acceleration = 10; //
var lastFrameTime = performance.now(); // 
var keysPressed = {}; //

{//ENGINE
function gameLoop() {
    movePlayer();

    // Проверяем коллизии игрока с каждым астероидом
    var asteroids = document.querySelectorAll('.asteroids');
    asteroids.forEach(function(asteroid) {
        if (checkCollision(player, asteroid)) {
            console.log('Press F');
            // управление консолью
        }
    });

    requestAnimationFrame(gameLoop);
}
{//Движение игрока
function movePlayer() {
    var deltaTime = getDeltaTime();
    var step = speed * deltaTime / 1000;

    var newX = playerPosition.x;
    var newY = playerPosition.y;

    if ('ArrowUp' in keysPressed || 'w' in keysPressed) {
        newY -= step;
    }
    if ('ArrowDown' in keysPressed || 's' in keysPressed) {
        newY += step;
    }
    if ('ArrowLeft' in keysPressed || 'a' in keysPressed) {
        newX -= step;
    }
    if ('ArrowRight' in keysPressed || 'd' in keysPressed) {
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

function getDeltaTime() {
    var currentTime = performance.now();
    var deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    return deltaTime;
}
/////Движение игрока
}

gameLoop();
///ENGINE
}

