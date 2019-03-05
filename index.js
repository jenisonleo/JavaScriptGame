
var renderArea;
var renderCanvas;
var boxX=20;
var boxY=20;
const   EVENT_UP    = 0,
        EVENT_ODWN  = 1,
        EVENT_LEFT  = 2,
        EVENT_RIGHT = 3;

function loadGame(){
    console.log("jenison");
    alignButtons();
    renderArea=document.getElementById("gameContainer");
    console.log("jenison1");
    renderCanvas=renderArea.getContext("2d");
    renderCanvas.fillStyle = "#FF0000";
    renderCanvas.fillRect(boxX,boxY,50,50);
}
function upclicked(){
    settimer(EVENT_UP)
    console.log("up")
}

function stopMovement(){
    clearInterval(timer)
    console.log("stop")
}
function downclicked(){
    settimer(EVENT_ODWN)
    console.log("down")
}

function leftclicked(){
    settimer(EVENT_LEFT)
    console.log("left")
}

function rightclicked(){
    settimer(EVENT_RIGHT)
    console.log("right")
}

function alignButtons(){
    document.getElementById("upDiv").style.marginLeft=150;
    document.getElementById("upDiv").style.marginTop=50;
    document.getElementById("leftDiv").style.marginLeft=120;
    document.getElementById("leftDiv").style.marginTop=20;
    document.getElementById("downDiv").style.marginLeft=140;
    document.getElementById("downDiv").style.marginTop=20;
}

function settimer(event){
    timer=setInterval(function(){
        drawGameArea(event)
    },10)
}
var timer;

function drawGameArea(event){
    switch(event){
        case EVENT_UP:
            boxY=boxY-1;
            break;
        case EVENT_ODWN:
            boxY=boxY+1;
            break;
        case EVENT_LEFT:
            boxX=boxX-1;
            break;
        case EVENT_RIGHT:
            boxX=boxX+1;
            break;
        default:

    }

    renderCanvas.clearRect(0,0,renderArea.width,renderArea.height);
    renderCanvas.fillStyle = "#FF0000";
    renderCanvas.fillRect(boxX,boxY,50,50);
}