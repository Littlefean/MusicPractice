import HandLocation from "./HandLocation.js";
import Note from "./Note.js";
import config from "./config.js";

/**
 * 钢琴类单例
 */
class Piano {
    // -- ** -- ** -- -- ** -- ** -- ** --
    // 01 02 03 04 05 06 07 08 09 10 11 12
    constructor() {
        this.fingerToKey = {}; // r1 : a
        this.keyToName = {}; // a : 2_05
        this.keyDownDic = {}; // 防止按下疯狂播放
        this.nameToEleDic = {}; //  2_05 : element
        this.rightHandLoc = new HandLocation(this); // 当前右手手位，大拇指位置 第三组的C位

        this.rightHandLShiftKey = null;
        this.rightHandRShiftKey = null;

        this.mood = 0; // 0表示C大调，1表示C#大调，以此类推到11表示B大调

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
                whiteEle.style.left = `${i * ww * 7 + j * ww}px`;
                allKeyEle.appendChild(whiteEle);
                this.nameToEleDic[`${i}_${to2Str(whiteArr[j])}`] = whiteEle;
            }
            if (!($("#keybind").value === "genshin")) {
                // 原琴没有黑键
                for (let j = 0; j < 5; j++) {
                    // 填充黑键
                    let blackEle = div("blackKey");
                    blackEle.style.left = `${
                        i * ww * 7 + blackLeftArr[j] * ww
                    }px`;
                    allKeyEle.appendChild(blackEle);
                    this.nameToEleDic[`${i}_${to2Str(blackArr[j])}`] = blackEle;
                }
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
        window.addEventListener("keypress", (e) => {
            console.log(e.code, e.key);
        });
        // 添加键盘事件
        window.addEventListener("keypress", (e) => {
            if ($("#keybind").value === "twohands") {
                // 双手模式，用左手移动窗口
                // 是否是移动 todo
                if (e.key === this.rightHandLShiftKey) {
                    this.rightHandLoc.rightShift();
                    this.updateHandLoc();
                    return;
                }
                if (e.key === this.rightHandRShiftKey) {
                    this.rightHandLoc.leftShift();
                    this.updateHandLoc();
                    return;
                }
                if (!this.keyToName[e.key]) {
                    // 阻止其他键参与进来报错
                    return;
                }
                if (this.keyDownDic[e.key]) {
                    return; // 防止变成机关枪
                }
                // 防止按下疯狂触发
                this.keyDownDic[e.key] = true;
                this.play(e);
            } else if ($("#keybind").value === "genshin") {
                // 原琴模式，按键对应固定音符
                // if ("qwertyu".includes(e.key)) {
                //     // 键盘第一行，高音
                //     this.rightHandLoc.rightShift();
                // } else if ("asdfghj".includes(e.key)) {
                //     // 第二行，重置loc
                //     this.rightHandLoc.reset();
                // } else if ("zxcvbnm".includes(e.key)) {
                //     // 第三行，低音
                //     this.rightHandLoc.leftShift();
                // } else {
                //     return;
                // }
                if (this.keyDownDic[e.key]) {
                    return; // 防止变成机关枪
                }
                this.updateHandLoc();
                this.keyDownDic[e.key] = true;
                this.play(e);
                this.rightHandLoc.reset();
            }
        });

        window.addEventListener("keyup", (e) => {
            if (!this.keyToName[e.key]) {
                // 阻止其他键参与进来报错
                return;
            }
            this.keyDownDic[e.key] = false;

            this.rendByKeyUp(e);
        });
    }

    /**
     * 根据按键播放音频
     * @param e {KeyboardEvent}
     */
    play(e) {
        console.log(e.key);
        $(`#keys_genshin .key.${e.key}`).classList.add("animate");
        $(`#keys_genshin .key.${e.key}`).classList.add("pressed");
        setTimeout(() => {
            $(`#keys_genshin .key.${e.key}`).classList.remove("animate");
        }, 600);
        // 音频播放
        let note = Note.eval(this.keyToName[e.key]);
        // 加入转调
        if (!($("#keybind").value === "genshin")) {
            note.changeMode(this.mood);
        }
        // 转调完成
        let path = `../audio/${$("#source").value}/${note.fileName()}.mp3`;
        console.log(path);
        let audio = new Audio(path);
        audio.play().then((r) => {});
        // 钢琴键盘渲染
        this.nameToEleDic[note.fileName()].classList.add("keyDown");
    }

    /**
     * 松开某个键之后渲染特效
     * @param e {KeyboardEvent}
     */
    rendByKeyUp(e) {
        $(`#keys_genshin .key.${e.key}`).classList.remove("pressed");
        // 特效渲染
        // $(`.keyCode-${e.code}`).classList.remove("keyboardDown");
        let note = Note.eval(this.keyToName[e.key]);
        // 加入转调
        note.changeMode(this.mood);
        // 转调完成
        // 钢琴键盘渲染
        this.nameToEleDic[note.fileName()].classList.remove("keyDown");
    }

    /**
     * 更新设置
     */
    refreshSettings() {
        $("#source").innerHTML = "";
        for (let source of config.sources) {
            $("#source").innerHTML += `<option>${source}</option>`;
        }
        this.fingerToKey = {};
        this.keyToName = {};
        if ($("#keybind").value === "twohands") {
            let rhe = $(".settings .rightHand"); // 右手的设置面板
            let rk1 = rhe.querySelector(".f1").value;
            let rk2 = rhe.querySelector(".f2").value;
            let rk3 = rhe.querySelector(".f3").value;
            let rk4 = rhe.querySelector(".f4").value;
            let rk5 = rhe.querySelector(".f5").value;
            let rk6 = rhe.querySelector(".f6").value;
            let rk7 = rhe.querySelector(".f7").value;
            let rk8 = rhe.querySelector(".f8").value;
            let rk9 = rhe.querySelector(".f9").value;
            this.fingerToKey["r1"] = rk1;
            this.fingerToKey["r2"] = rk2;
            this.fingerToKey["r3"] = rk3;
            this.fingerToKey["r4"] = rk4;
            this.fingerToKey["r5"] = rk5;
            this.fingerToKey["r6"] = rk6;
            this.fingerToKey["r7"] = rk7;
            this.fingerToKey["r8"] = rk8;
            this.fingerToKey["r9"] = rk9;
            this.keyToName[rk1] = "2_10";
            this.keyToName[rk2] = "2_12";
            this.keyToName[rk3] = "3_01";
            this.keyToName[rk4] = "3_03";
            this.keyToName[rk5] = "3_05";
            this.keyToName[rk6] = "3_06";
            this.keyToName[rk7] = "3_08";
            this.keyToName[rk8] = "3_10";
            this.keyToName[rk9] = "3_12";
            this.rightHandLShiftKey = rhe.querySelector(".lshift").value;
            this.rightHandRShiftKey = rhe.querySelector(".rshift").value;
        } else if ($("#keybind").value === "genshin") {
            this.keyToName["q"] = "4_01";
            this.keyToName["w"] = "4_03";
            this.keyToName["e"] = "4_05";
            this.keyToName["r"] = "4_06";
            this.keyToName["t"] = "4_08";
            this.keyToName["y"] = "4_10";
            this.keyToName["u"] = "4_12";
            //
            this.keyToName["a"] = "3_01";
            this.keyToName["s"] = "3_03";
            this.keyToName["d"] = "3_05";
            this.keyToName["f"] = "3_06";
            this.keyToName["g"] = "3_08";
            this.keyToName["h"] = "3_10";
            this.keyToName["j"] = "3_12";
            //
            this.keyToName["z"] = "2_01";
            this.keyToName["x"] = "2_03";
            this.keyToName["c"] = "2_05";
            this.keyToName["v"] = "2_06";
            this.keyToName["b"] = "2_08";
            this.keyToName["n"] = "2_10";
            this.keyToName["m"] = "2_12";
        }
    }

    // 根据手位更换音源
    updateHandLoc() {
        let handNote = this.rightHandLoc.locNote;
        this.keyToName[this.fingerToKey["r1"]] = handNote
            .moveWhite(-2)
            .fileName();
        this.keyToName[this.fingerToKey["r2"]] = handNote
            .moveWhite(-1)
            .fileName();
        this.keyToName[this.fingerToKey["r3"]] = handNote.fileName();
        this.keyToName[this.fingerToKey["r4"]] = handNote
            .moveWhite(1)
            .fileName();
        this.keyToName[this.fingerToKey["r5"]] = handNote
            .moveWhite(2)
            .fileName();
        this.keyToName[this.fingerToKey["r6"]] = handNote
            .moveWhite(3)
            .fileName();
        this.keyToName[this.fingerToKey["r7"]] = handNote
            .moveWhite(4)
            .fileName();
        this.keyToName[this.fingerToKey["r8"]] = handNote
            .moveWhite(5)
            .fileName();
        this.keyToName[this.fingerToKey["r9"]] = handNote
            .moveWhite(6)
            .fileName();
    }
}

export default Piano;
