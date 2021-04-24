'use strict';
const title = document.querySelector('.title');
const timer = document.querySelector('.timer');
const btn = document.querySelectorAll('.btn');
const audio = new Audio('./sound/oh.mp3');

let getTimer = null;
let focusTime = 1499;
let restTime = 300;
let min = '';
let sec = '';

function printfocusTimer() {
    min = parseInt(focusTime / 60);
    sec = focusTime % 60;
    timer.innerHTML = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
    }`;
    focusTime--;

    if (focusTime < 0) {
        audio.play();
        notify('', './image/tomato.png', '달콤한 휴식!');
        classChange('rest', 'focus');
        clearInterval(getTimer);
        setTimeout(() => {
            restTime = 300;
            printRestTimer(restTime);
            getTimer = setInterval(printRestTimer, 1000);
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

    if (restTime < 0) {
        audio.play();
        notify('', './image/tomato.png', '일해라!');
        classChange('focus', 'rest');
        clearInterval(getTimer);
        setTimeout(() => {
            focusTime = 1500;
            printfocusTimer(focusTime);
            getTimer = setInterval(printfocusTimer, 1000);
        }, 1000);
    }
}

function notify(msg, iconImage, theTitle) {
    let options = {
        body: msg,
        icon: iconImage,
    };
    let notification = new Notification(theTitle, options);

    setTimeout(() => notification.close(), 3000);
}

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
        focusTime++;
        restTime++;
        fuc(time);
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
        focusTime = 1500;
        restTime = 300;
        fuc(time);
        startBtn.innerHTML = 'start';
        startBtn.value = 'start';
        return;
    }
}

const init = function () {
    Notification.requestPermission();
    setEventListeners();
};

init();
