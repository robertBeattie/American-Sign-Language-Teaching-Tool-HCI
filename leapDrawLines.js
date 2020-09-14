var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var z = 0;

var rawXMin = -250;
var rawXMax = 250;

var rawYMin = 75;
var rawYMax = 300;

Leap.loop(controllerOptions, function(frame)
{ 
    clear();
     
    HandleFrame(frame);  
});

function HandleFrame(frame){
   if(frame.hands.length === 1){
    var hand = frame.hands[0];
    HandleHand(hand);    
    }
}
function HandleHand(hand){
    var fingers = hand.fingers;
    fingers.forEach( finger => {
        HandleFinger(finger);
    });     
}
function HandleFinger(finger){
    var bones = finger.bones;
    bones.forEach( bone => {
        HandleBone(bone);
    });          
}

function HandleBone(bone){
    px = bone.prevJoint[0];  
    py = bone.prevJoint[1];  
    pz = bone.prevJoint[2]; 

    //check bounds
    if(px > rawXMax){ px = rawXMax;}
    if(px < rawXMin){ px = rawXMin;}
    px = Scale(px, rawXMin, rawXMax, 0, window.innerWidth);
    if(py > rawYMax){ py = rawYMax;}
    if(py < rawYMin){ py = rawYMin;}
    py = Scale(py, rawYMin, rawYMax, 0, window.innerHeight);

    nx = bone.nextJoint[0];  
    ny = bone.nextJoint[1];  
    nz = bone.nextJoint[2]; 
    //check bounds
    if(nx > rawXMax){ nx = rawXMax;}
    if(nx < rawXMin){ nx = rawXMin;}
    nx = Scale(nx, rawXMin, rawXMax, 0, window.innerWidth);
    if(ny > rawYMax){ ny = rawYMax;}
    if(ny < rawYMin){ ny = rawYMin;}
    ny = Scale(ny, rawYMin, rawYMax, 0, window.innerHeight);


    // console.log(x + "," + y);
    //var cir = circle(px,-py + innerHeight,50);  
    //line(px,py,nx,ny); upside down
    line(nx,-ny + innerHeight,px, -py + innerHeight);

}
function Scale (OldValue, OldMin, OldMax, NewMin, NewMax){
    return((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
}