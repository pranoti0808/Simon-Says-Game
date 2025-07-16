let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0

let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2")
let startBtn = document.querySelector("#startBtn");

function startGame() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelup();
        if (startBtn) startBtn.style.display = "none"; // hide button if present
    }
}


document.addEventListener("keydown", startGame); // for laptop keyboard
document.addEventListener("touchstart", startGame, { once: true }); // for mobile tap anywhere
if (startBtn) {
    startBtn.addEventListener("click", startGame); // if you added a start button
}


// document.addEventListener("keypress" ,function(){
//     if(started == false){
//         console.log("Game is started");
//         started = true;

//         levelup();
//     }
    
// });

function gameFlash(btn){
    btn.classList.add("Flash");
    setTimeout(function(){
        btn.classList.remove("Flash");
    },250);

}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);

}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button choose
    let randIdx = Math.floor(Math.random()*4);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameFlash(randbtn);
    playSound();
}


function chkAns(idx){
    if (userSeq[idx]=== gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup, 1000);
            levelup();
        }
    }else{
        h2.innerHTML= `Game over! your Score was <b>${level} <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);

        playWrongSound();
        reset();
        if (startBtn) startBtn.style.display = "inline-block";
    }
}


function btnPress(){
    if (!started) return;
    
    let btn = this;
    userFlash(btn);
    playSound();

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

   // playButtonSound();

    chkAns(userSeq.length-1);
}



let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns){
    btn.addEventListener("click", btnPress);
}


function playSound() {
    let audio = new Audio("PlaySound/button.mp3");
    audio.play();
}


function playWrongSound() {
    let audio = new Audio("PlaySound/wrong.mp3");
    audio.play();
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level =0;
}