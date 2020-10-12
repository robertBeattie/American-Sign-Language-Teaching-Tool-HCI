const knnClassifier = ml5.KNNClassifier();

var controllerOptions = {};

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;

var oneFrameOfData = nj.zeros([5,4,6]);

var predictedClassLabels = nj.zeros(3);

//predicton accuracy
var n = 0;
var m = 1;
var c;
var d = "2";

Leap.loop(controllerOptions, function(frame)
{
    clear();
    if(!trainingCompleted){
        Train();
    }
    //console.log(oneFrameOfData.toString());
    HandleFrame(frame);
});

function Train(){
    console.log("training :");
    //console.log("size :" + train0.shape[3]);
    
    TrainHelper(train0,0);
    TrainHelper(train1,1);
    TrainHelper(train2,2);
    TrainHelper(train3,3);
    TrainHelper(train4,4);
    TrainHelper(train5,5);
    TrainHelper(train6,6);
    TrainHelper(train7,7);
    TrainHelper(train8,8);
    TrainHelper(train9,9);

    trainingCompleted = true;
}

function Test(){
    //console.log("testing :");
    var currentFeatures = oneFrameOfData.reshape(120);
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);  
    currentLabel = currentFeatures.get(currentFeatures.shape -1);
}

function GotResults(err, result){
    PredictionAccuracy(result.label);
    console.log(n , m , c, d);
  //predictedClassLabels.set(testingSampleIndex,result.label);
}

function TrainHelper(train,n){
    CenterData();
    for(var i =0; i < train.shape[3]; i++){
        //console.log(train.pick(null,null,null,i,null).reshape(120).toString());
        features = train.pick(null,null,null,i,null).reshape(120).tolist(); 
        knnClassifier.addExample(features,n);
    }
}

function HandleFrame(frame){
    if(frame.hands.length >= 1){
     var hand = frame.hands[0];
     var interactionBox = frame.interactionBox;
     HandleHand(hand, interactionBox);    
     }
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
    oneFrameOfData.set(fingerIndex,bone.type,0,normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex,bone.type,1,normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex,bone.type,2,normalizedPrevJoint[2]);

    px = bone.prevJoint[0];  
    py = bone.prevJoint[1];  
    pz = bone.prevJoint[2]; 

    [px,py] = TransformCoordinates(normalizedPrevJoint);

    var normalizedNextJoint = interactionBox.normalizePoint(bone.nextJoint, true); 
    oneFrameOfData.set(fingerIndex,bone.type,3,normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex,bone.type,4,normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex,bone.type,5,normalizedNextJoint[2]);

    nx = bone.nextJoint[0];  
    ny = bone.nextJoint[1];  
    nz = bone.nextJoint[2]; 
    
    [nx,ny] = TransformCoordinates(normalizedNextJoint);
    
    //color grey
    stroke(strokeW * 35);
    
    //line width
    strokeWeight(strokeW * 10);
    line(nx,-ny + innerHeight,px, -py + innerHeight);
 
    CenterData();
    Test();
 }

 function TransformCoordinates (normalizedPosition){
    // Convert the normalized coordinates to span the canvas
    x = window.innerWidth * normalizedPosition[0];
    y = window.innerHeight * (normalizedPosition[1]);

    return[x,y];
}
function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();
}
function CenterXData(){
    var xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    var horizontalShift = 0.5 - currentMean;
    for(var currentRow = 0; currentRow < 5; currentRow++){
        for(var currentColumn = 0; currentColumn < 4; currentColumn++){
            currentX = oneFrameOfData.get(currentRow,currentColumn,0);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,0, shiftedX);

            currentX = oneFrameOfData.get(currentRow,currentColumn,3);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,3, shiftedX);
        }
    }
    xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentMeanAfter = xValues.mean();
}
function CenterYData(){
    var yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    var horizontalShift = 0.5 - currentMean;
    for(var currentRow = 0; currentRow < 5; currentRow++){
        for(var currentColumn = 0; currentColumn < 4; currentColumn++){
            currentY = oneFrameOfData.get(currentRow,currentColumn,2);
            shiftedY = currentY + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,2, shiftedY);

            currentY = oneFrameOfData.get(currentRow,currentColumn,4);
            shiftedY = currentY + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,4, shiftedY);
        }
    }
    yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentMeanAfter = yValues.mean();
}
function CenterZData(){
    var zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    var horizontalShift = 0.5 - currentMean;
    for(var currentRow = 0; currentRow < 5; currentRow++){
        for(var currentColumn = 0; currentColumn < 4; currentColumn++){
            currentZ = oneFrameOfData.get(currentRow,currentColumn,2);
            shiftedZ = currentZ + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,2, shiftedZ);

            currentZ = oneFrameOfData.get(currentRow,currentColumn,5);
            shiftedZ = currentZ + horizontalShift;
            oneFrameOfData.set(currentRow,currentColumn,5, shiftedZ);
        }
    }
    zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentMeanAfter = zValues.mean();
}



function PredictionAccuracy(predicted){
    c = predicted;
    n++;
    var cd;
    if(c==d) {
        cd = 1; 
    }else{
        cd = 0;
    }

    m = (((n-1) * m + cd)/n);
}