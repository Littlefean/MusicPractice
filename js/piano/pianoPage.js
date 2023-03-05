import Piano from "./piano.js";
import preventInit from "./preventDefaultKey.js";
import config from "./config.js";
import GenshinParser from "./GenshinParser.js";

/**
 *
 * by littlefean
 */
window.onload = function () {
    preventInit();
    const piano = new Piano();
    let autoplay_timeouts = [];
    $("#keybind").onchange = function () {
        if (this.value === "twohands") {
            $("#keys_twohands").style.display = "block";
            $("#keys_genshin").style.display = "none";
            $(".allKey .leftHand").style.display = "block";
            $(".allKey .rightHand").style.display = "block";
        } else if (this.value === "genshin") {
            $("#keys_twohands").style.display = "none";
            $("#keys_genshin").style.display = "flex";
            $(".allKey .leftHand").style.display = "none";
            $(".allKey .rightHand").style.display = "none";
        }
        piano.refreshSettings();
        piano.pageInit();
    };
    $("#autoplay").onclick = function () {
        $("#autoplay_dlg").show();
    };
    $("#autoplay_dlg .close").onclick = function () {
        $("#autoplay_dlg").hide();
    };
    $("#autoplay_dlg .start").onclick = function () {
        let a = GenshinParser.parse($("#autoplay_dlg .input").value);
        if (typeof a === "string") {
            $("#autoplay_dlg .error").innerHTML = "错误 " + a;
            return;
        }
        autoplay_timeouts = GenshinParser.play(a);
        $("#autoplay_dlg .error").innerHTML = "编译成功，正在播放";
    };
    $("#autoplay_dlg .stop").onclick = function () {
        for (let i of autoplay_timeouts) {
            clearTimeout(i);
        }
        $("#autoplay_dlg .error").innerHTML = "停止";
    };
    $("#source").innerHTML = "";
    for (let source of config.sources) {
        $("#source").innerHTML += `<option>${source}</option>`;
    }
    $("#source").onchange = piano.cache;
    piano.cache();
}

window.testmusic = function () {
    GenshinParser.play(GenshinParser.parse(
        `0.4
        /LB  /B H /A S /
     
     (VND)   / L H /(BMS)  / L G /
     (CBMS)  /  LG /(CNA) M /B C /
     (VN)   / L D /(BMS)  / L G /
     (CBMS)  / L Q /(NADJ) G /(XBD) S /`
    ))
}
