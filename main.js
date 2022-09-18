const output = document.querySelector('.word');
const input = document.querySelector('input');
const button = document.querySelector('button');
const timers = document.querySelectorAll('.time');
const words = ['jebac', 'kurwa', 'czarnych', 'i zydow'];
let times = [];
let lastTime = 0;

let game = 10;

button.addEventListener('click', () => {
    if (game === 10) {
        times = [];
        game--;
        output.innerHTML = randomWord();
        input.value = '';
        input.focus();
        button.style.backgroundColor = 'red';
        button.disabled = true;

        startTimer();
    }
});

input.addEventListener('input', () => {
    if (game === 10) return;
    if (input.value === output.innerHTML) {
        output.innerHTML = randomWord();
        input.value = '';
        game--;
        times.push(timers[0].innerHTML);
        lastTime = new Date().getTime();


        if (game === 0) {
            output.innerHTML = 'nigger';
            button.style.backgroundColor = '#333';
            button.disabled = false;
            game = 10;
        }
    }
});

//timers
function startTimer() {
    lastTime = new Date().getTime();
    let actualTime = 0;
    let bestTime = 0;
    let averageTime = 0;

    const interval = setInterval(() => {
        actualTime = new Date().getTime();
        timers[0].innerHTML = formatTime(actualTime - lastTime);
        timers[1].innerHTML = getBestTime();
        timers[2].innerHTML = getAverageTime();
        if(game===10){
            clearInterval(interval);
            timers[0].innerHTML = '00:00.000';
        }
    }, 10);
 }

//utility functions
function getAverageTime() {
    if(!times.length) return '00:00.000';
    let sum = 0;
    for (let i = 0; i < times.length; i++) {
        sum += parseFloat(times[i].replace(':', ''));
    }
    let average = sum / times.length;
    average = average.toFixed(3);
    return formatTime(average.toString().replace('.', ''));
}

function getBestTime() {
    if(!times.length) return '00:00.000';
    let max = times[0];
    for(let i = 1; i<times.length; i++){
        if(times[i] < max){
            max = times[i];
        }
    }
    return max;
}

function formatTime(s) {
     let ms = s % 1000;
     s = (s - ms) / 1000;
     if(ms < 10) ms = '00' + ms;
     let secs = s % 60;
     s = (s - secs) / 60;
     if (secs < 10)
         secs = '0' + secs;
     let mins = s % 60;
     if (mins < 10)
         mins = '0' + mins;

     return mins + ':' + secs + '.' + ms;
}

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}