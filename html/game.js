// 音符和对应音频文件的映射关系
// const notes = {
//     "C4": "3_01.mp3",
//     // "C#4": "3_02.mp3",
//     "D4": "3_03.mp3",
//     // "D#4": "3_04.mp3",
//     "E4": "3_05.mp3",
//     "F4": "3_06.mp3",
//     // "F#4": "3_07.mp3",
//     "G4": "3_08.mp3",
//     // "G#4": "3_09.mp3",
//     "A4": "3_10.mp3",
//     // "A#4": "3_11.mp3",
//     "B4": "3_12.mp3",
//     "C5": "4_01.mp3",
//     // "C#5": "4_02.mp3",
//     "D5": "4_03.mp3",
//     // "D#5": "4_04.mp3",
//     "E5": "4_05.mp3",
//     "F5": "4_06.mp3",
//     // "F#5": "4_07.mp3",
//     "G5": "4_08.mp3",
//     // "G#5": "4_09.mp3",
//     "A5": "4_10.mp3",
//     // "A#5": "4_11.mp3",
//     "B5": "4_12.mp3"
// };

const notes = {
    "C4": "3_01.mp3",
    "D4": "3_03.mp3",
    "E4": "3_05.mp3",
    "F4": "3_06.mp3",
    "G4": "3_08.mp3",
    "A4": "3_10.mp3",
    "B4": "3_12.mp3",
    // "C5": "4_01.mp3",
    // "D5": "4_03.mp3",
    // "E5": "4_05.mp3",
    // "F5": "4_06.mp3",
    // "G5": "4_08.mp3",
    // "A5": "4_10.mp3",
    // "B5": "4_12.mp3"
};
// 播放指定音符的音频文件
function playSound(note, number) {
    let audioPlayer = document.getElementById(`audio-player${number}`);
    let file = "../audio/default/" + notes[note];
    audioPlayer.src = file;
    audioPlayer.play();
}

// 随机选择一个音符，并播放
function getRandomNote() {
    const notesInRange = Object.keys(notes);
    return notesInRange[Math.floor(Math.random() * notesInRange.length)];
}

let randomNote1 = getRandomNote();
let randomNote2 = getRandomNote();

function startGame() {
    randomNote1 = getRandomNote();
    randomNote2 = getRandomNote();
    while (randomNote1 === randomNote2) {
        // 如果两个音符相同，则重新选择第二个音符
        randomNote2 = getRandomNote();
    }
    playSound(randomNote1, 1);
    setTimeout(() => {
        playSound(randomNote2, 2);
    }, 500);
    document.querySelector(".firstNote").innerText = randomNote1;


    setTimeout(() => {

    }, 1000);

}

// 给开始按钮绑定点击事件
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

document.getElementById("test-btn").addEventListener("click", () => {
    let guess = document.querySelector(".userAnswer").value;

    if (guess) {
        guess = guess.toUpperCase();
        if (guess === randomNote2) {
            alert("恭喜你，猜对了！");
        } else {
            alert("很遗憾，猜错了。正确答案是 " + randomNote2);
        }
    }
})
