import Piano from "./Piano.js";

/**
 * 原琴脚本解析器
 *
 * by shikukuya
 */
class GenshinParser {
    static keys = [
        "q", "w", "e", "r", "t", "y", "u",
        "a", "s", "d", "f", "g", "h", "j",
        "z", "x", "c", "v", "b", "n", "m"
    ]

    /**
     * 解析原琴脚本谱
     * @param {string} data 要解析的脚本谱
     * @returns {object}
     */
    static parse(data) {
        let n = 0;
        /**
         * {
         *    bpm: 180,
         *    data: [
         *        [ // array里面一起按
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
         *        {
         *            type: -1, // 这个表示0
         *            note: -1
         *        }
         *    ]
         * }
         */
        let result = { bpm: 180, data: [] };
        data = data.toLowerCase();
        for (let line of data.split("\n")) {
            console.log(line);
            if (n === 0) {
                if (line.startsWith("bpm")) {
                    result.bpm = +line.match(/(bpm|BPM) ?= ?([0-9]+)/)[2];
                } else {
                    result.bpm = 60 / line;
                }
                continue;
            }
            if (line.length <= 0) {
                continue;
            }
            for (let char in line) {
                if (char.match(/[a-z]/)) {
                    
                }
            }
        }
    }
}
