const x = document.querySelector("#mainCanvas");
const ctx = x.getContext("2d");


let tenWidth = 10;
let tenHeight = 10;
let tenOrigWidth = tenWidth;
let tenOrigHeight = tenHeight;

let growth = 0.2;

let timer = 0;

let color = "#c80000"


x.width = tenWidth
x.height = tenHeight
x.style.width = tenWidth + "px";
x.style.height = tenHeight + "px";


///https://www.youtube.com/embed/

let player

function shuffleVideoID(){
    let videoIDs = ["DZCFDMJHyvU", "bZ-Gz2Pp5h4", "R-_B4Jd_nDM", "b8igizq6oUE"]
    let videoNum = Math.floor(Math.random() * (videoIDs.length))
    console.log(videoNum)
    ytVideoId = videoIDs[videoNum]
    console.log(ytVideoId)
    return ytVideoId
}

function clickShuffle(){
    player.loadVideoById(shuffleVideoID())
}

// YouTube APIが読み込まれたら自動で呼ばれる
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '200',
    width: '250',
    videoId: shuffleVideoID(),  // 最初に再生する動画ID
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

function onPlayerStateChange(event) {
    // プレイヤーの状態変化（再生・一時停止・終了など）を検知する
    console.log("プレイヤー状態:", event.data);
}


function onPlayerReady(event) {
    event.target.playVideo(); // 自動再生したい場合
}

function long(){
    x.width = tenWidth
    x.height = tenHeight
    x.style.width = tenWidth + "px";
    x.style.height = tenHeight + "px";

    ctx.fillStyle = "rgb(255 255 255)"
    ctx.fillRect(0, 0, 2000, 2000)

    ctx.fillStyle = color
    ctx.fillRect(0, 0, tenWidth, tenHeight)

    ctx.fillStyle = "rgb(0 0 0)"
    ctx.fillRect(tenWidth * 0.7, tenHeight * 0.1, tenWidth * 0.1, tenHeight * 0.3)
    ctx.fillRect(tenWidth *0.9,tenHeight * 0.1, tenWidth * 0.1, tenHeight * 0.3)
}

function short(){
    x.width = tenWidth
    x.height = tenHeight
    x.style.width = tenWidth + "px";
    x.style.height = tenHeight + "px";

    let tenShortHeight = tenHeight/2;
    ctx.fillStyle = "rgb(255 255 255)"
    ctx.fillRect(0, 0, 2000, 2000)

    ctx.fillStyle = color
    ctx.fillRect(0, tenShortHeight, tenWidth, tenShortHeight)

    ctx.fillStyle = "rgb(0 0 0)"
    ctx.fillRect(tenWidth * 0.7, tenShortHeight + tenShortHeight * 0.1, tenWidth * 0.1, tenShortHeight * 0.3)
    ctx.fillRect(tenWidth *0.9,tenShortHeight + tenShortHeight * 0.1, tenWidth * 0.1, tenShortHeight * 0.3)
}

function addSize(){
    tenOrigWidth+=growth
    tenOrigHeight+=growth
    tenWidth = Math.floor(tenOrigWidth)
    tenHeight = Math.floor(tenOrigWidth)
    console.log(tenHeight)
    console.log(tenWidth)
}

window.addEventListener("blur", () =>{
    tenWidth = 10;
    tenHeight = 10;
    tenOrigWidth = tenWidth;
    tenOrigHeight = tenHeight;
    timer = 0;
})

window.addEventListener("focus", () =>{
    tenWidth = 10;
    tenHeight = 10;
    tenOrigWidth = tenWidth;
    tenOrigHeight = tenHeight;
    timer = 0;
})


function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}

const input = document.getElementById('inputText');

input.addEventListener('input', () => {
    const value = input.value;
    if(value == ""){
        color = "#c80000"
    }else{
        color = stringToColor(value);
    }
    console.log(color)
});


setInterval(() => {
    timer+=1;
    document.querySelector("#growSec").innerHTML = timer;
    long();
    addSize();
    setTimeout(() => {
        timer+=1
        document.querySelector("#growSec").innerHTML = timer;
        console.log("hoge")
        short();
    }, (1000));
    console.log("fuga")
}, 2000);