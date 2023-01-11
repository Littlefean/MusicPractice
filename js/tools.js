/**
 * 一些辅助小函数
 * by littlefean
 */
function $(queryStr) {
    if (document.querySelector(queryStr) === null) {
        console.warn("选择器没有找到");
    }
    return document.querySelector(queryStr);
}

/**
 * 在数组中随机选择一个元素并返回
 * @return {*}
 */
Array.prototype.choiceOne = function () {
    let r = Math.floor(Math.random() * this.length);
    return this[r];
}

to2Str = function (number) {
    if (number < 10) {
        return "0" + number.toString();
    } else {
        return number.toString();
    }
}
console.log(to2Str(2));

/**
 * 创建一个div
 * @param classNameString
 * @param content
 * @return {HTMLDivElement}
 */
function div(classNameString, content = "",) {

    let res = document.createElement("div");
    if (content !== "") {
        res.innerText = content;
    }
    for (let className of classNameString.split(" ")) {
        res.classList.add(className);
    }

    return res;
}


/**
 * 随机一个十六进制颜色
 */
function randomColor() {
    let strNormal = (str) => {
        if (str.length === 1) {
            return "0" + str;
        }
        return str;
    }
    let r = Math.floor(Math.random() * 256).toString(16);
    let g = Math.floor(Math.random() * 256).toString(16);
    let b = Math.floor(Math.random() * 256).toString(16);
    return `#${strNormal(r)}${strNormal(g)}${strNormal(b)}`;

}

/**
 * 随机整数，包括左边不包括右边
 * @param a
 * @param b
 * @return {number}
 */
function randint(a, b) {
    let r = Math.random();
    r *= Math.abs(b - a);
    r += a;
    return Math.floor(r);
}
