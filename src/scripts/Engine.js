const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60,
        enemies: Array.from({ length: 10 }, (_, i) => `enemy${i + 1}`),
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu Resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        state.values.enemies.forEach(enemy => square.classList.remove(enemy));
    });

    let randomEnemy = state.values.enemies[Math.floor(Math.random() * state.values.enemies.length)];
    let randomSquareIndex = Math.floor(Math.random() * state.view.squares.length);
    let selectedSquare = state.view.squares[randomSquareIndex];

    selectedSquare.classList.add(randomEnemy);
    state.values.hitPosition = selectedSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                state.values.enemies.forEach(enemy => square.classList.remove(enemy));
            }
        });
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();
