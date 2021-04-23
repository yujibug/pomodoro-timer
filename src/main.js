'use strict';
const title = document.querySelector('.title');
const timer = document.querySelector('.timer');
const btn = document.querySelectorAll('.btn');
let getTimer = null;

let focusTime = 10;
let restTime = 5;
let timerTime = null;
let min = '';
let sec = '';

function classChange(text, text2) {
    btn[0].classList.add(text);
    btn[1].classList.add(text);
    title.classList.add(text);
    timer.classList.add(text);
    btn[0].classList.remove(text2);
    btn[1].classList.remove(text2);
    title.classList.remove(text2);
    timer.classList.remove(text2);
}

function printfocusTimer(time) {
    console.log('focus timer 함수 실행중');
    min = parseInt(focusTime / 60);
    sec = focusTime % 60;
    timer.innerHTML = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
    }`;
    focusTime--;
    // console.log(`매개변수 time: ${time}`);
    // console.log(`변수 focusTime: ${focusTime}`);
    // console.log(`temp 변수: ${timerTime}`);

    if (focusTime < 0) {
        classChange('rest', 'focus');
        clearInterval(getTimer);
        setTimeout(() => {
            restTime = 5;
            printRestTimer(restTime);
            getTimer = setInterval(printRestTimer, 1000);
        }, 1000);
    }
}

function printRestTimer() {
    console.log('rest timer 함수 실행중');
    min = parseInt(restTime / 60);
    sec = restTime % 60;
    timer.innerHTML = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
    }`;
    restTime--;

    if (restTime < 0) {
        classChange('focus', 'rest');
        clearInterval(getTimer);
        setTimeout(() => {
            focusTime = 10;
            printfocusTimer(focusTime);
            getTimer = setInterval(printfocusTimer, 1000);
        }, 1000);
    }
}

function setEventListeners() {
    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', (event) => {
        if (title.classList.contains('focus')) {
            let time = focusTime;
            let fuc = printfocusTimer;
            onButtonClick(event, time, fuc);
            return;
        }

        if (title.classList.contains('rest')) {
            let time = restTime;
            let fuc = printRestTimer;
            onButtonClick(event, time, fuc);
        }
    });
}

function onButtonClick(event, time, fuc) {
    const startBtn = document.querySelector('.start');
    const value = event.target.value;
    if (value === 'start') {
        // fuc(time);
        getTimer = setInterval(fuc, 1000);
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
        focusTime = 10;
        restTime = 5;
        fuc(time);
        startBtn.innerHTML = 'start';
        startBtn.value = 'start';
        return;
    }
}

const init = function () {
    /* if css 속성 = x 면 setEventListeners(focusTime) 해서 
    매개변수로 time 넘겨서 onButtonClick 함수 재활용
    restTime 으로 진입하면 h1 pomodoro 글자 색을 바꿀것임*/
    setEventListeners();
};

init();
