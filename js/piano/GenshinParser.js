/**
 * 原琴脚本解析器
 *
 * by shikukuya
 */
class GenshinParser {
    // prettier-ignore
    static keys = [
        "q", "w", "e", "r", "t", "y", "u",
        "a", "s", "d", "f", "g", "h", "j",
        "z", "x", "c", "v", "b", "n", "m",
    ]
    static maps = {
        q: { type: 3, note: 1 },
        w: { type: 3, note: 2 },
        e: { type: 3, note: 3 },
        r: { type: 3, note: 4 },
        t: { type: 3, note: 5 },
        y: { type: 3, note: 6 },
        u: { type: 3, note: 7 },

        a: { type: 2, note: 1 },
        s: { type: 2, note: 2 },
        d: { type: 2, note: 3 },
        f: { type: 2, note: 4 },
        g: { type: 2, note: 5 },
        h: { type: 2, note: 6 },
        j: { type: 2, note: 7 },

        z: { type: 1, note: 1 },
        x: { type: 1, note: 2 },
        c: { type: 1, note: 3 },
        v: { type: 1, note: 4 },
        b: { type: 1, note: 5 },
        n: { type: 1, note: 6 },
        m: { type: 1, note: 7 },
    };

    /**
     * 解析原琴脚本谱
     * @param {string} data 要解析的脚本谱
     * @returns {object}
     */
    static parse(data) {
        let n = 1;
        /**
         * 是否有小括号没有闭合
         */
        let paren = false;
        /**
         * 小括号中的音符
         */
        let paren_data = [];
        /**
         * ```
         * {
         *    inv: 0.33, // inv = 60 / bpm
         *    data: [
         *        [ // array里面表示一起按
         *            {
         *                type: 2,
         *                note: 3
         *            },
         *            {
         *                type: 3,
         *                note: 1
         *            }
         *        ],
         *        {
         *            type: 1, // 低音3
         *            note: 3
         *        },
         *        {
         *            type: 2, // 中音4
         *            note: 4
         *        },
         *        null // null表示0
         *    ]
         * }
         * ``
         * @type {{ inv: number, data: [] }}
         */
        let result = { inv: 0.33, data: [] };
        data = data.toLowerCase();
        for (let line of data.split("\n")) {
            console.log(n, line);
            if (n === 1) {
                // 第一行
                if (line.startsWith("bpm")) {
                    // 第一种情况：bpm=180
                    result.inv = 60 / line.match(/bpm ?= ?([0-9]+)/)[1];
                } else {
                    // 第二种情况：0.33
                    result.inv = +line;
                }
            }
            if (n > 1) {
                for (let char of line) {
                    debugger;
                    if (["+", "-", "["].includes(char)) {
                        return `未实现的语法 行${n}`;
                    }
                    if ([" ", "0", "="].includes(char)) {
                        // 停一拍
                        if (paren) {
                            return `在小括号中停一拍 行${n}`;
                        } else {
                            result.data.push(null);
                        }
                    }
                    if (char.match(/[a-z]/)) {
                        // 音符
                        if (paren) {
                            // 在小括号里面
                            paren_data.push(this.maps[char]);
                        } else {
                            result.data.push(this.maps[char]);
                        }
                    }
                    if (char === "(") {
                        if (paren) {
                            return `嵌套的小括号 行${n}`;
                        }
                        paren = true;
                    }
                    if (char === ")") {
                        if (!paren) {
                            return `错误的小括号闭合 行${n}`;
                        }
                        paren = false;
                        result.data.push(paren_data);
                        paren_data = [];
                    }
                }
            }
            n++;
        }
        return result;
    }
}

export default GenshinParser;
