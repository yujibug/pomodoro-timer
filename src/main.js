'use strict';
const timer = document.querySelector('.timer');
let getTimer = null;

let pomodoroTime = 10;
let restTime = 5;
let timerTime = null;
let min = '';
let sec = '';

function printTimer(time) {
    min = parseInt(timerTime / 60);
    sec = timerTime % 60;
    timer.innerHTML = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
    }`;
    timerTime--;
    // console.log(`매개변수 time: ${time}`);
    // console.log(`변수 pomodoroTime: ${pomodoroTime}`);
    // console.log(`temp 변수: ${timerTime}`);

    if (pomodoroTime < 0) {
        clearInterval(getTimer);
        setTimeout(() => {
            printTimer(restTime);
            getTimer = setInterval(printTimer, 1000);
        }, 1000);
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

function setEventListeners(time) {
    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', (event) => onButtonClick(event, time));
}

function onButtonClick(event, time) {
    console.log(pomodoroTime);
    const startBtn = document.querySelector('.start');
    const value = event.target.value;
    if (value === 'start') {
        timerTime = time;
        printTimer(time);
        getTimer = setInterval(printTimer, 1000);
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
        // pomodoroTime = time;
        // resetTime = time;
        printTimer(time);
        startBtn.innerHTML = 'start';
        startBtn.value = 'start';
        return;
    }
}

const init = function () {
    /* if css 속성 = x 면 setEventListeners(pomodoroTime) 해서 
    매개변수로 time 넘겨서 onButtonClick 함수 재활용
    restTime 으로 진입하면 h1 pomodoro 글자 색을 바꿀것임*/
    const title = document.querySelector('.title');
    if (title.classList.contains('pomodoro')) {
        setEventListeners(pomodoroTime);
    } else if (title.classList.contains('rest')) {
        setEventListeners(restTime);
    }
};

init();
