// 声明变量，记录当前是否为深色主题状态，以及警报音频字典
let isDark = false;
let alarmDict = {
    1: 'alarm/防空警报.mp3', // 键1对应的警报音频路径
    2: 'alarm/全面核打击警报（长）.mp3',
    3: 'alarm/全面核打击警报（短）.mp3',
};

// 根据选择播放相应的警报音频
function choiceAlarm(alarmChoice) {
    // 从警报字典中获取音频源并播放
    alarmSound.src = alarmDict[alarmChoice];
    alarmSound.play();
}

// 渐显效果函数，使元素逐渐可见
function fadeIn(element, opacity) {
    // 设置元素的不透明度
    element.style.opacity = opacity;
    // 如果不透明度小于完全不透明，则继续渐显
    if (opacity < 1) {
        setTimeout(function() {
            // 递归调用自己，增加不透明度
            fadeIn(element, opacity + 0.05);
        }, // 计算延迟时间以实现平滑渐变
        Math.abs(0.5 - opacity) * 100);
    }
}

// 渐隐效果函数，使元素逐渐不可见
function fadeOut(element, opacity) {
    element.style.opacity = opacity;
    if (opacity > 0) {
        setTimeout(function() {
            fadeOut(element, opacity - 0.05);
        }, Math.abs(0.5 - opacity) * 100);
    }
}

// 切换警报显示与隐藏，同时控制深色遮罩的显示
function toggleAlarm() {
    let block = document.getElementById('alarm-container'); // 获取警报容器元素
    let darkOverlay = document.getElementById('dark-overlay'); // 获取遮罩层元素
    if (isDark) { // 如果当前是深色主题
        // 渐隐警报容器和遮罩层
        fadeOut(block, 1);
        fadeOut(darkOverlay, 1);
        // 在渐隐动画结束后隐藏元素
        setTimeout(function() {
            block.style.display = 'none';
            darkOverlay.style.display = 'none';
        }, 500);
    } else { // 如果当前不是深色主题
        // 显示警报容器和遮罩层，并开始渐显
        block.style.display = 'block';
        fadeIn(block, 0);
        darkOverlay.style.display = 'block';
        fadeIn(darkOverlay, 0);
    }
    // 切换深色主题标志
    isDark = !isDark;
}

// 暂停并重置音频播放
function pauseAudio() {
    alarmSound.pause(); // 暂停当前播放的音频
    alarmSound.currentTime = 0; // 将播放时间重置为0，即音频开始处
}
