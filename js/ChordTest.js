/**
 * 旋律类 用于做题用
 * let SETTINGS_DATA = {
    len: 1,  // 旋律长度
    chordLevel: 1,  // 和弦等级
    min: 3,
    max: 4,
    mood: "cMajor"
};
 * by littlefean
 */

class ChordTest {
    constructor() {
        /**
         *
         * @type {String[]}
         */
        this.arr = [];  // 存放和弦数组

    }

    /// 随机一道题
    randTest() {
        this.arr = []; // 先清空原有的
        if (SETTINGS_DATA.chordLevel !== 1) {
            console.warn("和弦模式还没做");
            return;
        }
        for (let i = 0; i < SETTINGS_DATA.len; i++) {
            let g = randint(SETTINGS_DATA.min, SETTINGS_DATA.max);
            let i = randint(1, 7 + 1);
            let note = Note.eval(`${g}_${to2Str(i)}`);
            this.arr.push(note.fileName());
            // let audio = new Audio(`../audio/${note.fileName()}.mp3`);
            // audio.play().then(r => {
            // });
        }

    }

    /// 播放
    play() {
        let i = 0;
        for (let noteName of this.arr) {
            setTimeout(() => {
                console.log(noteName);
                let audio = new Audio(`../audio/${noteName}.mp3`);
                audio.play().then(r => {
                });
            }, i * 500);
            i++;
        }
    }

}
