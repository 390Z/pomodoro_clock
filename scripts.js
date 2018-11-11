const buttons = document.querySelectorAll('button');
const session = document.querySelector('#session');
const time = document.querySelector('#time');
const work = document.querySelector('#work');
const rest = document.querySelector('#rest');
const title = document.querySelector('.title');
const settings = document.querySelector('.settings');
let totalSeconds, timer;
let play = false;


function convertToSeconds() {
    let duration = (time.textContent).split(':');
    let minutes = parseInt(duration[0]);
    let seconds = parseInt(duration[1]);
    totalSeconds = (minutes * 60) + seconds;
}

function startTimer() {
    convertToSeconds();
    timer = setInterval(function() {
        totalSeconds--;

        if (totalSeconds < 1) {
            switchSession();
        }
        
        minutes = Math.floor(totalSeconds / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;

        seconds = totalSeconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        time.textContent = minutes + ':' + seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    stylize('#fff');
    time.textContent = work.textContent + ':00';
}

function resetTimer() {
    clearInterval(timer);
    session.textContent = 'Work';
    work.textContent = '25';
    rest.textContent = '5';
    time.textContent = '25:00';
}

function switchSession() {
    if (session.textContent === 'Work') {
        session.textContent = 'Rest';
        stylize('rgb(66, 185, 245)');
        totalSeconds = rest.textContent * 60;
    } else {
        session.textContent = 'Work';
        stylize('#fff');
        totalSeconds = rest.textContent * 60;
    }
}

function stylize(color) {
    session.style.color = color;
    time.style.color = color;
}

function decrease(activity) {
    let value = parseInt(activity.textContent);
    if (value > 1) {
        value--;
        activity.textContent = value;
    }
}

function increase(activity, limit) {
    let value = parseInt(activity.textContent);
    if (value < limit) {
        value++;
        activity.textContent = value;
    }
}

function updateTime() {
    let duration = (time.textContent).split(':');
    let workValue = parseInt(work.textContent);
    duration[0] = workValue < 10 ? '0' + workValue : workValue;
    time.textContent = duration.join(':');
}

function hideElements() {
    title.style.opacity = 0;
    settings.style.opacity = 0;
}

function showElements() {
    title.style.opacity = 1;
    settings.style.opacity = 1;
}

buttons.forEach(button => button.addEventListener('click', function(e) {
    console.log(e.target.id);
    tId = e.target.id;
    switch(tId) {
        case 'play':
            if (play === true) {
                return;
            } else {
                play = true;
                pause = false;
                startTimer();
                hideElements();
            }
            break;
        case 'pause':
            clearInterval(timer);
            play = false;
            pause = true;
            break;
        case 'stop':
            stopTimer();
            showElements();
            play = false;
            pause = false;
            break;
        case 'reset':
            resetTimer();
            showElements();
            play = false;
            pause = false;
            break;
        case 'dec-work':
            if (play == true || pause == true) {
                return;
            } else {
                decrease(work);
                updateTime();
            }
            break;
        case 'inc-work':
            if (play == true || pause == true) {
                return;
            } else {
                increase(work, 60);
                updateTime();
            }
            break;
        case 'dec-rest':
            if (play == true || pause == true) {
                return;
            } else {
                decrease(rest);
            }
            break;
        case 'inc-rest':
            if (play == true || pause == true) {
                return;
            } else {
                increase(rest, 30);
            }
            break;
    }
}));