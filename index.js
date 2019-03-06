
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
    startGame();
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
    clearInterval(boxTimer)
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
    boxTimer=setInterval(function(){
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
    },10)
}
var gameTimer;
var boxTimer;
var datalist;
function startGame(){
    datalist = [ { height: 70, x:300,orientation:true }];
    gameTimer=setInterval(function(){
        var limit=datalist.length-4;
        if(limit<0){
            limit=0;
        }
        for(var i=datalist.length-1;i>=limit;i--){
            datalist[i].x=datalist[i].x-1;
        } 
        drawGameArea();
    },10);
    var prev=true;
    setInterval(function(){
        var size=datalist.length;
        datalist[size]={height: (Math.random()*140), x:300 ,orientation:!prev};
        prev=!prev;
        
    },1000);
}

//Game control variables


function drawGameArea(){

    renderCanvas.clearRect(0,0,renderArea.width,renderArea.height);
    renderCanvas.fillStyle = "#FF0000";
    renderCanvas.fillRect(boxX,boxY,50,50);
    var limit=datalist.length-4;
    if(limit<0){
        limit=0;
    }
    for(var i=datalist.length-1;i>=limit;i--){
        renderCanvas.fillStyle ="#000000";
        if(datalist[i].orientation){
            renderCanvas.fillRect(datalist[i].x,0,20,datalist[i].height)
        }else{
            renderCanvas.fillRect(datalist[i].x,(200-datalist[i].height),20,datalist[i].height)
        }
        console.log("jenison")
    }
    var bbox={ left: boxX, right:boxX+50,top:boxY,bottom: boxY+50}
    var res=true;
    for(var i=datalist.length-1;i>=limit;i--){
        if(datalist[i].orientation){
            res=res && intersectRect({ left:datalist[i].x , right:(datalist[i].x)+20,top:0,bottom:datalist[i].height },bbox)
        }else{
            res=res && intersectRect({ left:datalist[i].x , right:(datalist[i].x)+20,top:(200-datalist[i].height),bottom:200},bbox)
        }
    }
    if(!res){
        console.log("faliued");
        clearInterval(gameTimer);
        alert("GAME OVER");
    }

}


function intersectRect(r1, r2) {
    return (r2.left > r1.right || 
             r2.right < r1.left || 
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }