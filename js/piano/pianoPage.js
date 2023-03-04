import Piano from "./piano.js";
import preventInit from "./preventDefaultKey.js";
import config from "./config.js";

/**
 *
 * by littlefean
 */
window.onload = function () {
    preventInit();
    const piano = new Piano();
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
    $("#source").innerHTML = "";
    for (let source of config.sources) {
        $("#source").innerHTML += `<option>${source}</option>`;
    }
    $("#source").onchange = piano.cache;
    piano.cache();
}
