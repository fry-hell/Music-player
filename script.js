const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const progressText = document.getElementById("progressText")
const durationText = document.getElementById("durationText")
const title = document.getElementById("title")
const musicCover = document.getElementById("music-cover")


// 音乐信息
const songs = ["打上花火", "Mojito", "Super_Star", "离人"]
// 默认从第一首开始
let songIndex = 0;
// 将歌曲细节加载到DOM
loadSong(songs[songIndex])
// 更新歌曲细节
function loadSong(song) {
    title.innerHTML = song
    audio.src = `music/${song}.mp3`;      // 路径为 music/打上花火.mp3
    musicCover.src = `img/${song}.jpg`;
}

// 播放歌曲
function playSong() {
    // 元素添加类名
    musicContainer.classList.add("play")
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
    
}

// 停止播放
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// 上一首
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    // 加载歌曲信息并播放
    loadSong(songs[songIndex])
    playSong()
}
// 下一首
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// 进度条更新
function updateProgress(e) {
    // audio.duration: 音频长度
    // audio.currentTime: 音频播放位置
    // 对象解构操作
    const {
        duration,
        currentTime
    } = e.target;
    // e.target = {
    //     duration: 225,  // 当前音频时间长度 
    //     currentTime:0  // 当前播放时间
    // }
    const progressPercent = (currentTime / duration) * 100
    // console.log(currentTime, duration)
    // 进度条
    progress.style.width = `${progressPercent}%`

    // 显示播放进度的时间
    progressText.innerHTML = convertToTime(currentTime)

}
// 设置进度条
function setProgress(e) {
    // progressContainer代理视图宽度
    const width = this.clientWidth
    // 鼠标点击时处于progressContainer里的水平偏移量
    const clickX = e.offsetX

    // audio.duration: 音频长度
    const duration = audio.duration

    // audio.currentTime: 音频播放位置
    audio.currentTime = (clickX / width) * duration
}
// 转为标准的时间格式
function convertToTime(time) {
    // 分钟
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    // 秒
    var second = time % 60;
    var seconds = Math.round(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}` + ":" + `${seconds}`
}
// 事件监听
// 1.播放歌曲
playBtn.onclick = function () {
    // 判断当前是否是正在播放

    // const isPlaying = musicContainer.classList.contains('play')
    // if (isPlaying) {
    //     pauseSong()
    // } else {
    //     playSong()
    // }
    musicContainer.classList.contains('play') ? pauseSong() : playSong()
}
// 2.切换歌曲
prevBtn.onclick = prevSong
nextBtn.onclick = nextSong

// 3.播放器进度条相关
// 3.1 加载完毕允许播放时获取歌曲的总时长
audio.oncanplay = function(){
    durationText.innerHTML = convertToTime(audio.duration)
}
// 3.2 设置播放进度
progressContainer.onclick = setProgress
// 3.3 进度条更新
audio.ontimeupdate = updateProgress
// 3.4 歌曲结束后自动下一首
// 3.4.1 更新歌曲细节和自动播放
audio.onended = nextSong
// 3.4.2 切换歌曲后，触发总时长发生的事件，改变总时长显示
audio.ondurationchange = function(){
    var duration = audio.duration
    durationText.innerHTML = convertToTime(duration)
}
