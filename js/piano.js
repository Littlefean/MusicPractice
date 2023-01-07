/**
 * 钢琴类单例
 */
class Piano {
    // -- ** -- ** -- -- ** -- ** -- ** --
    // 01 02 03 04 05 06 07 08 09 10 11 12
    constructor() {
        this.keyToFileName = {

            // right
            "a": "2_03",
            "s": "2_05",
            "d": "2_06",
            "f": "2_08",
            "g": "2_10",
            "h": "2_12",
            "j": "3_01",
            "k": "3_03",
            "l": "3_05",
            ";": "3_06",
            "'": "3_08",
            // left
            "q": "2_01",
            "w": "2_03",
            "e": "2_05",
            "r": "2_06",
            "t": "2_08",
            "y": "2_08",
            "u": "2_03",
            "i": "2_03",
            "o": "2_03",
            "p": "2_03",
            "[": "2_03",
            "]": "2_03",
        };
        this.keyDownDic = {}; // 防止按下疯狂播放
        this.allKeyDic = {};  //  2_05 : element
        this.pageInit();
        this.addEvent();
    }

    pageInit() {
        // 填充全键盘界面
        let ww = 20;
        let whiteArr = [1, 3, 5, 6, 8, 10, 12];
        let blackArr = [2, 4, 7, 9, 11];
        let blackLeftArr = [1, 2, 4, 5, 6];
        let allKeyEle = $(".allKey");
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < whiteArr.length; ++j) {
                // 填充白
                let whiteEle = div("whiteKey");
                whiteEle.style.left = `${(i * ww * 7) + (j * ww)}px`;
                allKeyEle.appendChild(whiteEle);
                console.log(whiteArr[j]);
                this.allKeyDic[`${i}_${to2Str(whiteArr[j])}`] = whiteEle;
            }
            for (let j = 0; j < 5; j++) {
                // 填充黑键
                let blackEle = div("blackKey");
                blackEle.style.left = `${(i * ww * 7) + (blackLeftArr[j] * ww)}px`;
                allKeyEle.appendChild(blackEle);
                this.allKeyDic[`${i}_${to2Str(blackArr[j])}`] = blackEle;
            }
        }
        // 设置小界面的白键位置
        let whiteKeyWidth = 50;
        let x = 0;
        for (let ele of document.querySelectorAll(".pianoWhiteKey")) {
            ele.style.left = `${x * whiteKeyWidth}px`;
            x++;
        }
        console.log(this.allKeyDic);
    }

    addEvent() {

        // 添加键盘事件
        window.addEventListener("keypress", (e) => {
            if (!this.keyToFileName[e.key]) {  // 阻止其他键事件影响
                return;
            }
            console.log(e.code)
            if (!this.keyDownDic[e.key]) {
                // 音频播放
                let audio = new Audio(`../audio/${this.keyToFileName[e.key]}.mp3`);
                audio.play();
                // 特效渲染
                $(`.keyCode-${e.code}`).classList.add("keyboardDown");
                console.log("---", this.keyToFileName[e.key]);
                this.allKeyDic[this.keyToFileName[e.key]].classList.add("keyDown");
            }

            // 防止按下疯狂触发
            this.keyDownDic[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            if (!this.keyToFileName[e.key]) { // 阻止其他键事件影响
                return;
            }
            this.keyDownDic[e.key] = false;

            // 特效渲染
            $(`.keyCode-${e.code}`).classList.remove("keyboardDown");
            this.allKeyDic[this.keyToFileName[e.key]].classList.remove("keyDown");
        })
    }
}
