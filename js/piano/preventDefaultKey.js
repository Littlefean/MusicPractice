/**
 * 阻止默认键盘的操作
 */
function preventInit() {
    document.addEventListener('keydown', function (event) {
        return !(
            event.ctrlKey && 82 === event.keyCode ||        //禁止ctrl+R
            event.ctrlKey && 18 === event.keyCode ||        //禁止ctrl+N
            event.ctrlKey && (event.key === "W" || event.key === "w") ||        //禁止ctrl+W todo 失败了
            event.ctrlKey && (event.key === "j" || event.key === "J") ||        //禁止ctrl+W todo 失败了
            event.shiftKey && 121 === event.keyCode ||      //禁止shift+F10
            event.altKey && 115 === event.keyCode ||        //禁止alt+F4
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === " " ||
            event.key === "Tab" ||
            event.key === "Alt" ||
            event.key === "Home" ||
            event.key === "End" ||
            event.key === "Control" ||
            "A" === event.srcElement.tagName && event.shiftKey        //禁止shift+点击a标签
        ) || (event.returnValue = false);
    });

}

// ==== 阻止浏览器的上下滚动屏幕
export default preventInit;
