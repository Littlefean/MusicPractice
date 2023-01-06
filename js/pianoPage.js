/**
 *
 * by littlefean
 */

// -- ** -- ** -- -- ** -- ** -- ** --
// 01 02 03 04 05 06 07 08 09 10 11 12

let dic = {
    "a": "3_01",
    "s": "3_01",
    "d": "3_01",
    "f": "3_01",
    "g": "3_01",
    "h": "3_03",
    "j": "3_01",
    "k": "3_03",
    "l": "3_05",
    ";": "3_06",
    "'": "3_08",
}
// 防止按下疯狂播放
let keyDownDic = {
    "a": false,
    "s": false,
    "d": false,
    "f": false,
    "g": false,
    "h": false,
    "j": false,
    "k": false,
    "l": false,
    ";": false,
    "'": false,
}

window.onload = function () {
    pageInit();
    let pianoKeyBoardEle = document.querySelector(".pianoKeyBoard");
    let keyboardEle = document.querySelector(".keyboard");

    // 添加键盘事件
    window.addEventListener("keypress", (e) => {
        if (!dic[e.key]) {  // 阻止其他键事件影响
            return;
        }
        if (!keyDownDic[e.key]) {
            // 音频播放
            let audio = new Audio(`../audio/${dic[e.key]}.mp3`);
            audio.play();
            // 特效渲染
            let keyEle = pianoKeyBoardEle.querySelector(`.keyCode-${e.code}`);
            keyEle.classList.add("keyDown");
            keyboardEle.querySelector(`.keyCode-${e.code}`).classList.add("keyboardDown");
        }

        // 防止按下疯狂触发
        keyDownDic[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        if (!dic[e.key]) { // 阻止其他键事件影响
            return;
        }
        keyDownDic[e.key] = false;

        // 特效渲染
        let keyEle = pianoKeyBoardEle.querySelector(`.keyCode-${e.code}`);
        keyEle.classList.remove("keyDown");
        //
        keyboardEle.querySelector(`.keyCode-${e.code}`).classList.remove("keyboardDown");
    })
}

/**
 * 布局初始化
 */
function pageInit() {
    let whiteKeyWidth = 50;
    let x = 0;
    for (let ele of document.querySelectorAll(".pianoWhiteKey")) {
        ele.style.left = `${x * whiteKeyWidth}px`;
        x++;
    }
}
