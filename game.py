import os
import random
import playsound

notes_1 = {
    "C4": "3_01.mp3",
    "C#4": "3_02.mp3",
    "D4": "3_03.mp3",
    "D#4": "3_04.mp3",
    "E4": "3_05.mp3",
    "F4": "3_06.mp3",
    "F#4": "3_07.mp3",
    "G4": "3_08.mp3",
    "G#4": "3_09.mp3",
    "A4": "3_10.mp3",
    "A#4": "3_11.mp3",
    "B4": "3_12.mp3"
}

notes_2 = {
    "C4": "3_01.mp3",
    "C#4": "3_02.mp3",
    "D4": "3_03.mp3",
    "D#4": "3_04.mp3",
    "E4": "3_05.mp3",
    "F4": "3_06.mp3",
    "F#4": "3_07.mp3",
    "G4": "3_08.mp3",
    "G#4": "3_09.mp3",
    "A4": "3_10.mp3",
    "A#4": "3_11.mp3",
    "B4": "3_12.mp3",
    "C5": "4_01.mp3",
    "C#5": "4_02.mp3",
    "D5": "4_03.mp3",
    "D#5": "4_04.mp3",
    "E5": "4_05.mp3",
    "F5": "4_06.mp3",
    "F#5": "4_07.mp3",
    "G5": "4_08.mp3",
    "G#5": "4_09.mp3",
    "A5": "4_10.mp3",
    "A#5": "4_11.mp3",
    "B5": "4_12.mp3"
}


def play_sound(note):
    """播放指定音符的声音"""
    file_path = os.path.join("audio", "default", notes.get(note, ""))
    if file_path:
        playsound.playsound(file_path)
    else:
        print("音符", note, "没有对应的音频文件，请检查您的设置。")


while True:
    print("=" * 30)
    print("欢迎使用音程猜谜游戏")
    print("请选择一个八度内还是两个八度内：")
    print("1. 一个八度内")
    print("2. 两个八度内")
    choice_1 = input("请选择（1 或 2），或输入 q 退出游戏：")
    if choice_1 == "q":
        break
    elif choice_1 not in ["1", "2"]:
        print("无效的选项，请重新输入")
        continue

    print("请选择第二个音符比第一个高、还是低、还是随机：")
    print("h - higher")
    print("l - lower")
    print("r - random")
    choice_2 = input("请选择（h、l 或 r），或输入 q 退出游戏：")
    if choice_2 == "q":
        break
    elif choice_2 not in ["h", "l", "r"]:
        print("无效的选项，请重新输入")
        continue

    notes = notes_2 if choice_1 == "2" else notes_1

    while True:
        print("\n请听这个音符的声音：")
        random_note = random.choice(list(notes.keys()))
        print("第一个音符是：", random_note)
        play_sound(random_note)

        if choice_2 == "h":
            interval = "higher"
            available_notes = [n for n in notes.keys() if notes[n] > notes[random_note]]
        elif choice_2 == "l":
            interval = "lower"
            available_notes = [n for n in notes.keys() if notes[n] < notes[random_note]]
        else:
            interval = "random"
            available_notes = [n for n in notes.keys() if n != random_note]

        random_unknown_note = random.choice(available_notes)
        print("请猜一猜第二个音符是哪个（例如 F4，输入 q 退出）：")
        play_sound(random_unknown_note)
        guess = input().strip().upper()
        if guess == "Q":
            break
        elif guess == random_unknown_note:
            print("恭喜你，猜对了！")
        else:
            print("很遗憾，猜错了。正确答案是", random_unknown_note)

        input("按 Enter 继续...\n")
