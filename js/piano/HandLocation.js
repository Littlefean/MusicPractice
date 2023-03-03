import Note from "./Note.js";

/**
 *
 * by littlefean
 */
class HandLocation {
    // --    --    -- --    --    --    --
    // 01 02 03 04 05 06 07 08 09 10 11 12
    constructor(bindPiano) {
        this.locNote = new Note(3, 1);
        this.bindPiano = bindPiano;  // 绑定的键盘
        // 先只考虑C手位和F手位
        this.rendRefresh();
        console.log(this.locNote.leftCount(), "zuo")
    }


    // 外层调用移位
    leftShift() {
        this.locNote.leftShift();
        this.rendRefresh();
    }

    // 处理特效的移位
    rendRefresh() {
        $(".allKey .rightHand").style.left = `${(this.locNote.leftCount() - 3) * 20}px`;
    }

    // 外层调用移位
    rightShift() {
        this.locNote.rightShift();
        this.rendRefresh();
    }

    /**
     * 重置到3_01
     */
    reset() {
        this.locNote = new Note(3, 1);
    }

    // 向右移动n位置
    right(n) {

    }

    left(n) {

    }
}

export default HandLocation;
