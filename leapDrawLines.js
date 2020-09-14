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
    /*
    x = finger.tipPosition[0];  
    y = finger.tipPosition[1];  
    z = finger.tipPosition[2]; 

    //check bounds
    if(x > rawXMax){ x = rawXMax;}
    if(x < rawXMin){ x = rawXMin;}
    x = Scale(x, rawXMin, rawXMax, 0, window.innerWidth);
    if(y > rawYMax){ y = rawYMax;}
    if(y < rawYMin){ y = rawYMin;}
    y = Scale(y, rawYMin, rawYMax, 0, window.innerHeight);

    console.log(x + "," + y);
    var cir = circle(x,-y + innerHeight,50);   
    */
        
}

function HandleBone(bone){
    x = bone.prevJoint[0];  
    y = bone.prevJoint[1];  
    z = bone.prevJoint[2]; 
    console.log("bone joints locations"+ x + ", " + y + ", " + z);
}
function Scale (OldValue, OldMin, OldMax, NewMin, NewMax){
    return((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
}