const x = document.querySelector("#mainCanvas");
const ctx = x.getContext("2d");

let tenDataSize = 1000;
let tenWidth = tenDataSize/100;
let tenHeight = tenDataSize/100;
let growth = 1;
let timer = 0;
let color = "#c80000"
const KEY = 'connectedAt';
const EXPIRATION_MINUTES = 86400; // 例：60分 = 1時間

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
    tenDataSize+=growth
    localStorage.setItem("dataSize", tenDataSize)
    tenWidth = tenDataSize/100
    tenHeight = tenDataSize/100
    console.log(localStorage.getItem("dataSize"))
}

function afkAddSize(sec){
    let wholeGrowth = growth * sec
    console.log("時間経過によって、", wholeGrowth, "秒分成長しました。")
    tenDataSize+=wholeGrowth
    localStorage.setItem("dataSize", tenDataSize)
    tenWidth = tenDataSize/100
    tenHeight = tenDataSize/100
    console.log(tenDataSize)
}

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

    localStorage.setItem("color", color)
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

function now() {
    return Math.floor(Date.now() / 1000);
}

// 初回接続時 or 再訪問時に呼ぶ
function initialConnectionCheck() {
    const stored = localStorage.getItem(KEY);
    const storedDataSize = localStorage.getItem("dataSize");
    const storedColor = localStorage.getItem("color");
    console.log("last time, it was ", parseInt(localStorage.getItem(KEY)))
    console.log("now it's ",now())
    if (!storedColor){
        localStorage.setItem("color", "#c80000")
    }else{
        color = localStorage.getItem("color");
    }

    if (!storedDataSize){
        localStorage.setItem("dataSize",1000)
    }else{
        tenDataSize = parseInt(storedDataSize, 10)
        const elapsed = now() - parseInt(stored, 10);
        afkAddSize(elapsed)
        console.log(storedDataSize)
        console.log("this is a data size:", tenDataSize)
    }

    if (!stored) {
        console.log('初回訪問。');
    } else {
        const elapsed = now() - parseInt(stored, 10);
        console.log(`接続後の経過時間：${elapsed} 秒`);
        if (elapsed >= EXPIRATION_MINUTES) {
            console.log('指定時間を超えたので、記録を削除します。');
            localStorage.removeItem(KEY);
            localStorage.removeItem(storedDataSize)
        // ここでUIを更新してもOK（例：メッセージ表示）
        }
    }
}

function leaveSite(){
    console.log("leaving at ", now())
    localStorage.setItem(KEY,now())
}

function setSize(){
    let doc = document.querySelector("#tenSize")
    doc.innerHTML = tenDataSize/100;
}

function resetDataSize(){
    tenDataSize = 1000;
    localStorage.setItem("dataSize", 1000)
}

window.addEventListener("blur",leaveSite)
window.addEventListener("beforeunload",leaveSite)
window.addEventListener("focus",initialConnectionCheck)
window.addEventListener("load",initialConnectionCheck)

setInterval(() => {
    long();
    addSize();
    setSize();
    setTimeout(() => {
        addSize();
        setSize();
        short();
    }, (1000));
}, 2000);