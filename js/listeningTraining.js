/**
 *听力
 * by littlefean
 */
let SETTINGS_DATA = {
    len: 1,  // 旋律长度
    chordLevel: 1,  // 和弦等级
    min: 3,
    max: 4,
    mood: "cMajor"
};
// [[ Note{} ], [ Note{} ] [ Note{} ]]
let USER_ANSWER = [];
window.onload = function () {
    init();
}


function init() {


    // 生成钢琴界面
    let pianoListEle = $(".pianoList");
    let pianoRollNumber = SETTINGS_DATA.len;
    let whiteWidth = 20;

    USER_ANSWER = [];

    for (let n = 0; n < pianoRollNumber; n++) {
        let chordArr = [];
        USER_ANSWER.push(chordArr);

        let pianoRollEle = div("pianoRoll");
        pianoListEle.appendChild(pianoRollEle);

        let x = 0;

        for (let i = 0; i < 7; i++) {
            // 白
            for (let j = 0; j < 7; j++) {
                let whiteEle = div("white");
                whiteEle.style.width = whiteWidth + "px";
                whiteEle.style.left = x * whiteWidth + "px";

                pianoRollEle.appendChild(whiteEle);
                let name = `${i}_${to2Str(Note.whiteArrGroup[j])}`;
                whiteEle.onclick = function () {
                    if (this.classList.contains("selected")) {
                        this.classList.remove("selected");
                        chordArr = chordArr.filter((v) => {
                            return v !== name;
                        })
                    } else {
                        this.classList.add("selected");
                        chordArr.push(name);

                    }
                }
                x++;
            }
            // 黑
            for (let j = 0; j < 7; j++) {
                if (j === 0 || j === 3) continue;
                let blackEle = div("black");
                blackEle.style.width = whiteWidth + "px";
                blackEle.style.left = (i * whiteWidth * 7) + (j * whiteWidth) + "px";
                blackEle.style.marginLeft = `${-whiteWidth / 2}px`;
                let name = `${i}_${to2Str(Note.blackArrGroup[j])}`;
                blackEle.onclick = function () {
                    console.log(USER_ANSWER);
                    if (this.classList.contains("selected")) {
                        this.classList.remove("selected");
                        chordArr = chordArr.filter((v) => {
                            return v !== name;
                        })
                    } else {
                        chordArr.push(name);
                        this.classList.add("selected");

                    }
                }
                pianoRollEle.appendChild(blackEle);
            }
        }
    }
    // 生成钢琴界面完毕

    // 设置开始
    let trainingEle = $(".training");
    trainingEle.style.display = "none";
    //
    $(".start").onclick = function () {
        trainingEle.style.display = "block";
    }

    let ct = new ChordTest()
    ct.randTest();
    // 播放
    let playEle = $(".play");
    playEle.onclick = function () {
        ct.play();
        console.log("播放了");
    }

}

