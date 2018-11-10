const buttons = document.querySelectorAll('button');
const session = document.querySelector('#session');
const time = document.querySelector('#time');
const work = document.querySelector('#work');
const rest = document.querySelector('#rest');
let totalSeconds, timer;

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
    time.textContent = work.textContent + ':00';
}

function switchSession() {
    if (session.textContent == 'Work') {
        session.textContent = 'Rest';
        totalSeconds = rest.textContent * 60;
    } else {
        session.textContent = 'Work';
        totalSeconds = rest.textContent * 60;
    }
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
    let workValue = parseInt(work.textContent)
    duration[0] = workValue < 10 ? '0' + workValue : workValue;
    time.textContent = duration.join(':');
}

buttons.forEach(button => button.addEventListener('click', function(e) {
    console.log(e.target.id);
    tId = e.target.id;
    switch(tId) {
        case 'play':
            startTimer();
            break;
        case 'pause':
            clearInterval(timer);
            break;
        case 'stop':
            stopTimer();
            break;
        case 'reset':
            location.reload();
            break;
        case 'dec-work':
            decrease(work);
            updateTime();
            break;
        case 'inc-work':
            increase(work, 60);
            updateTime();
            break;
        case 'dec-rest':
            decrease(rest);
            break;
        case 'inc-rest':
            increase(rest, 30);
            break;
    }
}));