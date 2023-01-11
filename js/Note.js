/**
 * 音符类
 * by littlefean
 */
class Note {
    // 所有白健
    static whiteArr = [
        "0_01", "0_03", "0_05", "0_06", "0_08", "0_10", "0_12",
        "1_01", "1_03", "1_05", "1_06", "1_08", "1_10", "1_12",
        "2_01", "2_03", "2_05", "2_06", "2_08", "2_10", "2_12",
        "3_01", "3_03", "3_05", "3_06", "3_08", "3_10", "3_12",
        "4_01", "4_03", "4_05", "4_06", "4_08", "4_10", "4_12",
        "5_01", "5_03", "5_05", "5_06", "5_08", "5_10", "5_12",
        "6_01", "6_03", "6_05", "6_06", "6_08", "6_10", "6_12",
    ];
    static whiteArrGroup = [1, 3, 5, 6, 8, 10, 12];
    static blackArrGroup = [null, 2, 4, null, 7, 9, 11];


    /**
     *
     * @param group 第几组 1234567
     * @param high 相当于简谱 1234567
     */
    constructor(group, high) {
        this.group = group;
        this.high = high;
    }

    /**
     * 转化成 "4_02" 这样的字符串
     * @return {string}
     */
    fileName() {
        return `${this.group}_${to2Str(this.high)}`;
    }

    /**
     * 随机一个音符
     * @param left  左侧音符 组
     * @param right  右侧音符 在第几组
     * @constructor
     */
    static Random(left, right) {

    }

    /**
     * 当前这个键位距离左边有多少个白健
     */
    leftCount() {
        let idx = 0;
        for (let str of Note.whiteArr) {
            if (this.fileName() === str) {
                break;
            } else {
                idx++;
            }
        }
        return idx + 1;
    }

    /**
     * 将字符串解析回一个对象
     * @param str
     * @return {Note}
     */
    static eval(str) {
        let splitArr = str.split("_");
        let group = +splitArr[0];
        let note = +(splitArr[1]);
        return new Note(group, note);
    }

    // 左侧移动
    leftShift() {
        if (this.high === 1) {
            this.high = 6;
            this.group--;
        } else {
            this.high = 1;
        }
    }

    // 右侧移动
    rightShift() {
        if (this.high === 1) {
            this.high = 6;
        } else {
            this.high = 1;
            this.group++;
        }
    }

    /**
     * 按白标准往右平移多少个单位 会返回新对象
     * 目前还没有做越界处理，也不能传入黑键
     * @param n
     * @return {Note}
     */
    moveWhite(n) {
        let idx = 0;
        for (let str of Note.whiteArr) {
            if (this.fileName() === str) {
                break;
            } else {
                idx++;
            }
        }
        idx += n;
        return Note.eval(Note.whiteArr[idx]);
    }

    /**
     * 从C调转
     * @param n {Number} 0 1 2 ... 0 表示C调
     */
    changeMode(n) {
        this.high += n;
        if (this.high > 12) {
            this.group++;
            this.high -= 12;
        }

    }
}


let n = new Note(3, 1);
n.rightShift();
console.log("3,1 >>>", n.fileName());
