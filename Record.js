var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var z = 0;

var rawXMin = -250;
var rawXMax = 250;

var rawYMin = 75;
var rawYMax = 300;

var previousNumHands = 0;
var currentNumHands = 0;

var currentSample = 0;
var numSamples;
var oneFrameOfData = nj.zeros([5,4,6,numSamples]);



Leap.loop(controllerOptions, function(frame)
{     
    currentNumHands = frame.hands.length;
    clear();
    HandleFrame(frame);  
    RecordData();
    previousNumHands = currentNumHands;
    
});

function HandleFrame(frame){
   if(frame.hands.length >= 1){
    var hand = frame.hands[0];
    var interactionBox = frame.interactionBox;
    HandleHand(hand, interactionBox);    
    }
    //adding a second hand
    /*
    if(frame.hands.length == 2){
        var hand = frame.hands[1];
        HandleHand(hand);    
    }
    */
}
function HandleHand(hand, interactionBox){
    //Distal phalanges tips
    //Intermediate phalanges middle
    //Proximal phalanges cloest to palm
    //Metacapals in palm
    var fingers = hand.fingers;
    for (var i=3; i >= 0; i--){
        fingers.forEach( finger => {
            HandleFinger(finger, i, interactionBox);
        });
    }
}
function HandleFinger(finger, boneType, interactionBox){
    
    var bones = finger.bones;
    bones.forEach( bone => {
        if(bone.type == boneType){
            HandleBone(bone, (5 - bone.type), finger.id % 10, interactionBox);
        }
    }); 

}

function HandleBone(bone, strokeW, fingerIndex, interactionBox){
    var normalizedPrevJoint = interactionBox.normalizePoint(bone.prevJoint, true);
    oneFrameOfData.set(fingerIndex,bone.type,0,currentSample,normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex,bone.type,1,currentSample,normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex,bone.type,2,currentSample,normalizedPrevJoint[2]);

    px = bone.prevJoint[0];  
    py = bone.prevJoint[1];  
    pz = bone.prevJoint[2]; 

    [px,py] = TransformCoordinates(normalizedPrevJoint);

    var normalizedNextJoint = interactionBox.normalizePoint(bone.nextJoint, true); 
    oneFrameOfData.set(fingerIndex,bone.type,3,currentSample,normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex,bone.type,4,currentSample,normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex,bone.type,5,currentSample,normalizedNextJoint[2]);

    nx = bone.nextJoint[0];  
    ny = bone.nextJoint[1];  
    nz = bone.nextJoint[2]; 
    
    [nx,ny] = TransformCoordinates(normalizedNextJoint);
    
    //color
    if(currentNumHands == 1){
        stroke("".concat('rgb(0,',(strokeW * 35).toString(),',0)'));
    }else if(currentNumHands == 2){
        stroke("".concat('rgb(',(strokeW * 35).toString(),',0,0)'));
    }
    
    //line width
    strokeWeight(strokeW * 10);
    line(nx,-ny + innerHeight,px, -py + innerHeight);

    
}
function RecordData(){
    if(previousNumHands == 2 && currentNumHands == 1){
        console.log(oneFrameOfData.toString());
        background(51);
    }
}

function TransformCoordinates (normalizedPosition){

    //check bounds old scaling 
    /*
    if(x > rawXMax){ x = rawXMax;}
    if(x < rawXMin){ x = rawXMin;}
    x = Scale(x, rawXMin, rawXMax, 0, window.innerWidth);
    if(y > rawYMax){ y = rawYMax;}
    if(y < rawYMin){ y = rawYMin;}
    y = Scale(y, rawYMin, rawYMax, 0, window.innerHeight);
    */
    // Convert the normalized coordinates to span the canvas
    x = window.innerWidth * normalizedPosition[0];
    y = window.innerHeight * (normalizedPosition[1]);

    return[x,y];
}

//old scale not in use
function Scale (OldValue, OldMin, OldMax, NewMin, NewMax){
    return((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
}