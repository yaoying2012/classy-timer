let isWorking = true;
let timeLeft = 45 * 60; // 45分钟转为秒
let isDarkMode = true;
let timerInterval;

function toggleTheme() {
    if (isDarkMode) {
        $('body').addClass('dark-theme');
    } else {
        $('body').removeClass('dark-theme');
    }
    isDarkMode = !isDarkMode;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    $('#time-left').text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        $('#alarmSound')[0].play(); // 使用[0]来获取原生DOM元素以调用play方法
        if (isWorking) {
            timeLeft = 15 * 60; // 休息15分钟
        } else {
            timeLeft = 45 * 60; // 工作45分钟
        }
        isWorking = !isWorking;
    }
}
