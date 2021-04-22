'use strict';
const timer = document.querySelector('.timer');
let getTimer = null;

let pomodoroTime = 1500;
let restTime = 300;
let min = '';
let sec = '';

function printPomodoroTimer() {
    min = parseInt(pomodoroTime / 60);
    sec = pomodoroTime % 60;
    timer.innerHTML = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
    }`;
    pomodoroTime--;

    if (pomodoroTime === 0) {
        printRestTimer();
    }
}

function printRestTimer() {
    min = parseInt(restTime / 60);
    sec = restTime % 60;
    timer.innerHTML = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
    }`;
    restTime--;
}

function setEventListeners() {
    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', (event) => onButtonClick(event));
}

function onButtonClick(event) {
    const startBtn = document.querySelector('.start');
    const value = event.target.value;
    if (value === 'start') {
        printPomodoroTimer();
        getTimer = setInterval(printPomodoroTimer, 1000);
        startBtn.innerHTML = 'pause';
        startBtn.value = 'pause';
        return;
    }

    if (value === 'pause') {
        clearInterval(getTimer);
        startBtn.innerHTML = 'start';
        startBtn.value = 'start';
        return;
    }

    if (value == 'reset') {
        clearInterval(getTimer);
        pomodoroTime = 1500;
        printPomodoroTimer();
        return;
    }
}

function init() {
    /* if css 속성 = x 면 setEventListeners(pomodoroTime) 해서 
    매개변수로 time 넘겨서 onButtonClick 함수 재활용
    restTime 으로 진입하면 h1 pomodoro 글자 색을 바꿀것임*/
    setEventListeners();
}

init();
