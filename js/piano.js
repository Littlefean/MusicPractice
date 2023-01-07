/**
 * 钢琴类单例
 */
class Piano {
    // -- ** -- ** -- -- ** -- ** -- ** --
    // 01 02 03 04 05 06 07 08 09 10 11 12
    constructor() {
        this.keyToName = {};  // a : 2_05
        this.keyDownDic = {}; // 防止按下疯狂播放
        this.nameToEleDic = {};  //  2_05 : element
        this.rightHandLoc = [3, 1];  // 当前右手手位，大拇指位置 第三组的C位

        this.rightHandLShiftKey = null;
        this.rightHandRShiftKey = null;
        this.pageInit();
        this.refreshSettings();
        this.addEvent();
    }

    pageInit() {
        this._fillFullKey();
    }

    // 填充div全钢琴界面
    _fillFullKey() {
        // 填充全键盘界面
        let ww = 20; // LESS 中有同样定义，注意保持同步
        let whiteArr = [1, 3, 5, 6, 8, 10, 12];
        let blackArr = [2, 4, 7, 9, 11];
        let blackLeftArr = [1, 2, 4, 5, 6];
        let allKeyEle = $(".allKey");
        // 7 组
        for (let i = 0; i < 7; i++) {
            // 白健
            for (let j = 0; j < whiteArr.length; ++j) {
                // 填充白
                let whiteEle = div("whiteKey");
                whiteEle.style.left = `${(i * ww * 7) + (j * ww)}px`;
                allKeyEle.appendChild(whiteEle);
                this.nameToEleDic[`${i}_${to2Str(whiteArr[j])}`] = whiteEle;
            }
            for (let j = 0; j < 5; j++) {
                // 填充黑键
                let blackEle = div("blackKey");
                blackEle.style.left = `${(i * ww * 7) + (blackLeftArr[j] * ww)}px`;
                allKeyEle.appendChild(blackEle);
                this.nameToEleDic[`${i}_${to2Str(blackArr[j])}`] = blackEle;
            }
        }
    }


    /**
     * 添加键盘事件
     * e.code 是比较全面的名字 e.key 是书写名字
     * 横着 Digit5  小键盘 Numpad5
     * 字母 KeyQ
     * ` Backquote
     */
    addEvent() {
        window.addEventListener("keypress", e => {
            console.log(e.code, e.key);
        })
        // 添加键盘事件
        window.addEventListener("keypress", (e) => {
            // 是否是移动 todo
            if (e.key === this.rightHandLShiftKey) {

            }
            if (e.key === this.rightHandRShiftKey) {

            }

            if (!this.keyToName[e.key]) {  // 阻止其他键参与进来报错
                return;
            }
            if (this.keyDownDic[e.key]) {
                return;  // 防止变成机关枪
            }
            // 防止按下疯狂触发
            this.keyDownDic[e.key] = true;
            // 音频播放
            let audio = new Audio(`../audio/${this.keyToName[e.key]}.mp3`);
            audio.play().then(r => {
            });
            this.rendByKeyDown(e);
        });

        window.addEventListener("keyup", (e) => {
            if (!this.keyToName[e.key]) { // 阻止其他键参与进来报错
                return;
            }
            this.keyDownDic[e.key] = false;

            this.rendByKeyUp(e);
        });

    }

    /**
     * 按下某个键盘之后渲染特效
     * @param e {KeyboardEvent}
     */
    rendByKeyDown(e) {
        // 特效渲染
        // $(`.keyCode-${e.code}`).classList.add("keyboardDown");
        // 钢琴键盘渲染
        this.nameToEleDic[this.keyToName[e.key]].classList.add("keyDown");
    }

    /**
     * 松开某个键之后渲染特效
     * @param e {KeyboardEvent}
     */
    rendByKeyUp(e) {
        // 特效渲染
        // $(`.keyCode-${e.code}`).classList.remove("keyboardDown");
        // 钢琴键盘渲染
        this.nameToEleDic[this.keyToName[e.key]].classList.remove("keyDown");
    }

    // 右手右移动
    rightHandRShift() {
        // 动画移动

        // 对应数据更改;

    }

    // 右手左移动
    rightHandLshift() {

    }

    /**
     * 更新设置
     */
    refreshSettings() {
        let rightHandEle = $(".settings .rightHand");  // 右手的设置面板
        this.keyToName[rightHandEle.querySelector(".f1").value] = "2_10"
        this.keyToName[rightHandEle.querySelector(".f2").value] = "2_12"
        this.keyToName[rightHandEle.querySelector(".f3").value] = "3_01"
        this.keyToName[rightHandEle.querySelector(".f4").value] = "3_03"
        this.keyToName[rightHandEle.querySelector(".f5").value] = "3_05"
        this.keyToName[rightHandEle.querySelector(".f6").value] = "3_06"
        this.keyToName[rightHandEle.querySelector(".f7").value] = "3_08"
        this.keyToName[rightHandEle.querySelector(".f8").value] = "3_10"
        this.keyToName[rightHandEle.querySelector(".f9").value] = "3_12";
        this.rightHandLShiftKey = rightHandEle.querySelector(".lshift").value;
        this.reftHandRShiftKey = rightHandEle.querySelector(".rshift").value;

    }

}
