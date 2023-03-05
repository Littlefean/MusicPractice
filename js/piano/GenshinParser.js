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
        q: { type: 3, note: 1, key: "q", file: "4_01" },
        w: { type: 3, note: 2, key: "w", file: "4_03" },
        e: { type: 3, note: 3, key: "e", file: "4_05" },
        r: { type: 3, note: 4, key: "r", file: "4_06" },
        t: { type: 3, note: 5, key: "t", file: "4_08" },
        y: { type: 3, note: 6, key: "y", file: "4_10" },
        u: { type: 3, note: 7, key: "u", file: "4_12" },

        a: { type: 2, note: 1, key: "a", file: "3_01" },
        s: { type: 2, note: 2, key: "s", file: "3_03" },
        d: { type: 2, note: 3, key: "d", file: "3_05" },
        f: { type: 2, note: 4, key: "f", file: "3_06" },
        g: { type: 2, note: 5, key: "g", file: "3_08" },
        h: { type: 2, note: 6, key: "h", file: "3_10" },
        j: { type: 2, note: 7, key: "j", file: "3_12" },

        z: { type: 1, note: 1, key: "z", file: "2_01" },
        x: { type: 1, note: 2, key: "x", file: "2_03" },
        c: { type: 1, note: 3, key: "c", file: "2_05" },
        v: { type: 1, note: 4, key: "v", file: "2_06" },
        b: { type: 1, note: 5, key: "b", file: "2_08" },
        n: { type: 1, note: 6, key: "n", file: "2_10" },
        m: { type: 1, note: 7, key: "m", file: "2_12" },
    };

    /**
     * 播放json琴谱
     * @param {object} data json琴谱
     * @param {boolean} animate 是否播放按键动画，默认true
     * @returns {number[]} timeouts列表
     */
    static play(data, animate = true) {
        let timeouts = [];
        let inv_ms = data.inv * 1000;
        /**
         * 这个n得从0开始，否则第一个音符有延迟
         */
        let n = 0;
        for (let note of data.data) {
            if (note instanceof Array) {
                // 括号里面视为单个音符
                for (let note_paren of note) {
                    if (note_paren !== null) {
                        timeouts.push(
                            setTimeout(() => {
                                new Audio(
                                    `../audio/${$("#source").value}/${
                                        note_paren.file
                                    }.mp3`
                                ).play();
                                if (animate) {
                                    $(
                                        `#keys_genshin .key.${note_paren.key}`
                                    ).classList.add("animate");
                                    $(
                                        `#keys_genshin .key.${note_paren.key}`
                                    ).classList.add("pressed");
                                    setTimeout(() => {
                                        $(
                                            `#keys_genshin .key.${note_paren.key}`
                                        ).classList.remove("animate");
                                    }, 600);
                                    setTimeout(() => {
                                        $(
                                            `#keys_genshin .key.${note_paren.key}`
                                        ).classList.remove("pressed");
                                    }, 150);
                                }
                            }, inv_ms * n)
                        );
                    }
                }
            } else {
                if (note !== null) {
                    timeouts.push(
                        setTimeout(() => {
                            new Audio(
                                `../audio/${$("#source").value}/${
                                    note.file
                                }.mp3`
                            ).play();
                            if (animate) {
                                $(
                                    `#keys_genshin .key.${note.key}`
                                ).classList.add("animate");
                                $(
                                    `#keys_genshin .key.${note.key}`
                                ).classList.add("pressed");
                                setTimeout(() => {
                                    $(
                                        `#keys_genshin .key.${note.key}`
                                    ).classList.remove("animate");
                                }, 600);
                                setTimeout(() => {
                                    $(
                                        `#keys_genshin .key.${note.key}`
                                    ).classList.remove("pressed");
                                }, 150);
                            }
                        }, inv_ms * n)
                    );
                }
            }
            n++;
        }
        return timeouts;
    }

    /**
     * 解析原琴脚本谱
     * @param {string} data 要解析的脚本谱
     * @returns {string|object} json琴谱，或者错误信息
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
        console.log(result);
        return result;
    }
}

export default GenshinParser;
