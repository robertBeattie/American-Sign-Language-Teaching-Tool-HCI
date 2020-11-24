var imgWaiting;

var imgArrowLeft;
var imgArrowRight;
var imgArrowUp;
var imgArrowDown;
var imgArrowToward;
var imgArrowAway;

var imgASL0;
var imgASL1;
var imgASL2;
var imgASL3;
var imgASL4;
var imgASL5;
var imgASL6;
var imgASL7;
var imgASL8;
var imgASL9;

var imgNum0;
var imgNum1;
var imgNum2;
var imgNum3;
var imgNum4;
var imgNum5;
var imgNum6;
var imgNum7;
var imgNum8;
var imgNum9;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    imgWaiting = loadImage('https://i.imgur.com/NeU32F6.jpg');

    imgArrowLeft = loadImage('https://i.imgur.com/Uu8oUMu.jpg');
    imgArrowRight = loadImage('https://i.imgur.com/v2Pt65l.jpg');
    imgArrowUp = loadImage('https://i.imgur.com/B6eICtn.jpg');
    imgArrowDown = loadImage('https://i.imgur.com/kGu3VSI.jpg');
    imgArrowToward = loadImage('https://i.imgur.com/dgu1WzN.jpg');
    imgArrowAway = loadImage('https://i.imgur.com/IE70bTB.jpg');

    imgASL0 = loadImage('https://i.imgur.com/mnpZA0D.jpg');
    imgASL1 = loadImage('https://i.imgur.com/wE0fNaQ.jpg');
    imgASL2 = loadImage('https://i.imgur.com/gttkkFU.jpeg');
    imgASL3 = loadImage('https://i.imgur.com/1JsppTJ.jpeg');
    imgASL4 = loadImage('https://i.imgur.com/tJOXp1p.jpeg');
    imgASL5 = loadImage('https://i.imgur.com/RJU7U2F.jpeg');
    imgASL6 = loadImage('https://i.imgur.com/ywbgmm1.jpeg');
    imgASL7 = loadImage('https://i.imgur.com/Gi0WW0f.jpeg');
    imgASL8 = loadImage('https://i.imgur.com/cIxtxaE.jpeg');
    imgASL9 = loadImage('https://i.imgur.com/GGKn4y1.jpeg');

    imgNum0 = loadImage('https://i.imgur.com/LmOJlav.jpg');
    imgNum1 = loadImage('https://i.imgur.com/16ILUMj.jpg');
    imgNum2 = loadImage('https://i.imgur.com/GnStmhn.jpg');
    imgNum3 = loadImage('https://i.imgur.com/lDpPZhv.jpg');
    imgNum4 = loadImage('https://i.imgur.com/IfsmlL0.jpg');
    imgNum5 = loadImage('https://i.imgur.com/EuHS4KM.jpg');
    imgNum6 = loadImage('https://i.imgur.com/8yuUESq.jpg');
    imgNum7 = loadImage('https://i.imgur.com/PbE0h5s.jpg');
    imgNum8 = loadImage('https://i.imgur.com/0wbipLg.jpg');
    imgNum9 = loadImage('https://i.imgur.com/2OWuPJX.jpg');

    imgASLA = loadImage('https://i.imgur.com/IoFS1Nm.jpeg');
    imgASLB = loadImage('https://i.imgur.com/lszT6dQ.jpeg');
    imgASLC = loadImage('https://i.imgur.com/34FBa6K.jpeg');
    imgASLD = loadImage('https://i.imgur.com/biLX82K.jpeg');
    imgASLE = loadImage('https://i.imgur.com/ONweaKj.jpeg');
    imgASLF = loadImage('https://i.imgur.com/3PMbqyH.jpeg');
    imgASLG = loadImage('https://i.imgur.com/oioPLeg.jpeg');
    imgASLH = loadImage('https://i.imgur.com/C9QZ7tR.jpg');
    imgASLI = loadImage('https://i.imgur.com/6JhrqCY.jpeg');
    imgASLJ = loadImage('https://i.imgur.com/iABwJ1y.jpeg');
    imgASLK = loadImage('https://i.imgur.com/uLLoBH0.jpg');
    imgASLL = loadImage('https://i.imgur.com/TUEpekq.jpeg');
    imgASLM = loadImage('https://i.imgur.com/YWcmtBJ.jpeg');
    imgASLN = loadImage('https://i.imgur.com/VGwAqxC.jpeg');
    imgASLO = loadImage('https://i.imgur.com/YIgcXYU.jpeg');
    imgASLP = loadImage('https://i.imgur.com/YEnZ4cz.jpg');
    imgASLQ = loadImage('https://i.imgur.com/yszWVfU.jpg');
    imgASLR = loadImage('https://i.imgur.com/urdcgdF.jpeg');
    imgASLS = loadImage('https://i.imgur.com/3jpSFL2.jpg');
    imgASLT = loadImage('https://i.imgur.com/EwnRMJ9.jpeg');
    imgASLU = loadImage('https://i.imgur.com/rbofSJo.jpeg');
    imgASLV = loadImage('https://i.imgur.com/WYClJ12.jpeg');
    imgASLW = loadImage('https://i.imgur.com/2HWKy3u.jpeg');
    imgASLX = loadImage('https://i.imgur.com/78q1Nr5.jpg');
    imgASLY = loadImage('https://i.imgur.com/qiDX4vD.jpg');
    imgASLZ = loadImage('https://i.imgur.com/1MewczF.jpeg');



    imgLA = loadImage('https://i.imgur.com/GYo5VL4.jpg');
    imgLB = loadImage('https://i.imgur.com/IAoyTmA.jpg');
    imgLC = loadImage('https://i.imgur.com/MUGLC0g.jpg');
    imgLD = loadImage('https://i.imgur.com/haYwNUR.jpg');
    imgLE = loadImage('https://i.imgur.com/nFmT2wA.jpg');
    imgLF = loadImage('https://i.imgur.com/GemlFTv.jpg');
    imgLG = loadImage('https://i.imgur.com/MnAXlxP.jpg');
    imgLH = loadImage('https://i.imgur.com/7SXJcrQ.jpg');
    imgLI = loadImage('https://i.imgur.com/jOFthXA.jpg');
    imgLJ = loadImage('https://i.imgur.com/IzsXFPr.jpg');
    imgLK = loadImage('https://i.imgur.com/uezjrGe.jpg');
    imgLL = loadImage('https://i.imgur.com/YU02vMr.jpg');
    imgLM = loadImage('https://i.imgur.com/5bBQyuO.jpg');
    imgLN = loadImage('https://i.imgur.com/Fb5BFHG.jpg');
    imgLO = loadImage('https://i.imgur.com/rgiP1d2.jpg');
    imgLP = loadImage('https://i.imgur.com/KkviBBD.jpg');
    imgLQ = loadImage('https://i.imgur.com/ZRaMpxp.jpg');
    imgLR = loadImage('https://i.imgur.com/1u1syMg.jpg');
    imgLS = loadImage('https://i.imgur.com/C63Ve2A.jpg');
    imgLT = loadImage('https://i.imgur.com/jTAMwel.jpg');
    imgLU = loadImage('https://i.imgur.com/k37BSZJ.jpg');
    imgLV = loadImage('https://i.imgur.com/AzmneRT.jpg');
    imgLW = loadImage('https://i.imgur.com/528LvKp.jpg');
    imgLX = loadImage('https://i.imgur.com/VefJGg5.jpg');
    imgLY = loadImage('https://i.imgur.com/0ItnFao.jpg');
    imgLZ = loadImage('https://i.imgur.com/VvLedTV.jpg');
}