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
    //Distal phalanges tips
    //Intermediate phalanges middle
    //Proximal phalanges cloest to palm
    //Metacapals in palm
    var fingers = hand.fingers;
    for (var i=3; i >= 0; i--){
        fingers.forEach( finger => {
            HandleFinger(finger, i);
        });
    }
}
function HandleFinger(finger, boneType){
    
    var bones = finger.bones;
    bones.forEach( bone => {
        if(bone.type == boneType){
            HandleBone(bone, (5 - bone.type));
        }
    }); 

}

function HandleBone(bone, strokeW){
    px = bone.prevJoint[0];  
    py = bone.prevJoint[1];  
    pz = bone.prevJoint[2]; 

    [px,py] = TransformCoordinates(px,py);

    nx = bone.nextJoint[0];  
    ny = bone.nextJoint[1];  
    nz = bone.nextJoint[2]; 
    
    [nx,ny] = TransformCoordinates(nx,ny);

    // console.log(x + "," + y);
    //var cir = circle(px,-py + innerHeight,50);  
    //line(px,py,nx,ny); upside down
    stroke((strokeW * 35));
    strokeWeight(strokeW * 10);
    line(nx,-ny + innerHeight,px, -py + innerHeight);

}
function TransformCoordinates (x,y){
    //check bounds
    if(x > rawXMax){ x = rawXMax;}
    if(x < rawXMin){ x = rawXMin;}
    x = Scale(x, rawXMin, rawXMax, 0, window.innerWidth);
    if(y > rawYMax){ y = rawYMax;}
    if(y < rawYMin){ y = rawYMin;}
    y = Scale(y, rawYMin, rawYMax, 0, window.innerHeight);

    return[x,y];
}

function Scale (OldValue, OldMin, OldMax, NewMin, NewMax){
    return((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
}