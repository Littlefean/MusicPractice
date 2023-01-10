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
        this.arr = [];  // 存放和弦数组

    }

    /// 随机一道题
    randTest() {
        for (let i = 0; i < SETTINGS_DATA.len; i++) {
            let chord = [];
            if (SETTINGS_DATA.chordLevel === 1) {

            } else {
                console.warn("和弦模式还没做");
            }
            this.arr.push(chord);
        }
    }

}
