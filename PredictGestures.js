const knnClassifier = ml5.KNNClassifier();

var controllerOptions = {};

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;

var oneFrameOfData = nj.zeros([5,4,6]);

var predictedClassLabels = nj.zeros(3);

//cheaty hack vvv
var extenedArray = nj.zeros(5);
//predicton accuracy
var n = 0;
var m = 1;
var c;
var d = "0";

//(a) 0 = the program is waiting to see the user’s hand.
//(b) 1 = the user’s hand is present but not centered.
//(c) 2 = the user’s hand is present and centered.
var programState = 0;

var uncenteredX;
var uncenteredY;
var uncenteredZ;

Leap.loop(controllerOptions, function(frame)
{
    clear();
    DetermineState(frame);
    if (programState==0) {
        HandleState0(frame);
    }
    else if (programState==1) {
        HandleState1(frame);
    }else if (programState==2) {
        HandleState2(frame);
    }

});
function DetermineState(frame){
    if (frame.hands.length == 0){
        programState = 0;
    }else if(frame.hands.length >= 1 && HandIsUncentered()){
        programState = 1;
    }else {
        programState = 2;
    }
    //console.log(programState);
}
function HandleState0(frame){
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
}
function HandleState1(frame){
    if(HandIsTooFarToTheLeft()){ DrawArrowRight()}else
    if(HandIsTooFarToTheRight()){ DrawArrowLeft()}else
    if(HandIsTooFarToTheLow()){ DrawArrowUp()}else
    if(HandIsTooFarToTheHigh()){ DrawArrowDown()}else
    if(HandIsTooFarToTheClose()){ DrawArrowAway()}else
    if(HandIsTooFarToTheFar()){ DrawArrowToward()};
    HandleFrame(frame);
    //Test();
   
}
function HandleState2(frame){
    HandleFrame(frame);
    //Test();
}
function HandIsUncentered(){
    return HandIsTooFarToTheLeft() || 
    HandIsTooFarToTheRight() ||
    HandIsTooFarToTheLow() ||
    HandIsTooFarToTheHigh() ||
    HandIsTooFarToTheClose() ||
    HandIsTooFarToTheFar();
}
function HandIsTooFarToTheLeft(){
    return uncenteredX < 0.46;
}
function HandIsTooFarToTheRight(){
    return uncenteredX > 0.54;
}
function HandIsTooFarToTheLow(){
    return uncenteredY < 0.46;
}
function HandIsTooFarToTheHigh(){
    return uncenteredY > 0.54;
}
function HandIsTooFarToTheClose(){
    return uncenteredZ > 0.54;
}
function HandIsTooFarToTheFar(){
    return uncenteredZ < 0.46;
}

function DrawArrowRight(){
   image(imgArrowRight,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowLeft(){
    image(imgArrowLeft,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawArrowUp(){
    image(imgArrowUp,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
 }
 function DrawArrowDown(){
     image(imgArrowDown,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
 }
 function DrawArrowToward(){
    image(imgArrowToward,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
 }
 function DrawArrowAway(){
     image(imgArrowAway,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
 }
function TrainKNNIfNotDoneYet(){
    //if(!trainingCompleted){Train();}
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(imgWaiting,0,0,window.innerWidth/2,window.innerHeight/2);
}


function Train(){
    var start = new Date().getTime();
    console.log("training :");
    //console.log("size :" + train0.shape[3]);
    
    /*
    Attempt 1
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

    TrainHelper(train0Robby,0);
    TrainHelper(train0Bongard,0);
    TrainHelper(train0Allison,0);

    TrainHelper(train1Robby,1);
    TrainHelper(train1Allison,1);
    TrainHelper(train1Bongard,1);
    TrainHelper(train1Davis,1);
    TrainHelper(train1McLaughlin,1);
    TrainHelper(train1Jimmo, 1);
    TrainHelper(train1Li, 1);
    TrainHelper(train1Rice, 1);
    TrainHelper(train1Riofrio, 1);
    TrainHelper(train1Nimako, 1);
    TrainHelper(train1Hunt, 1);

    TrainHelper(train2Banaszewski, 2);
    TrainHelper(train2Bongard, 2);
    TrainHelper(train2Downs, 2);
    TrainHelper(train2Robby, 2);
    TrainHelper(train2Jing, 2);

    TrainHelper(train3Banaszewski, 3);
    TrainHelper(train3Bongard, 3);
    TrainHelper(train3Jing, 3);

    TrainHelper(train4Bertschinger, 4);
    TrainHelper(train4Bongard, 4);
    TrainHelper(train4Faucher, 4);
    TrainHelper(train4Kiely, 4);
    TrainHelper(train4Liu, 4);
    TrainHelper(train4Makovsky, 4);
    TrainHelper(train4OBrien, 4);
    TrainHelper(train4Makovsky, 4);
    TrainHelper(train4OBrien, 4);
    TrainHelper(train4Sheboy, 4);
    TrainHelper(train4Socia, 4);
    TrainHelper(train4Robby, 4);

    TrainHelper(train5Bertschinger, 5);
    TrainHelper(train5Faucher, 5);
    TrainHelper(train5Blewett, 5);
    TrainHelper(train5Fekert, 5);
    TrainHelper(train5Robby, 5);

    TrainHelper(train7Bongard, 7);
    TrainHelper(train7Laquerre, 7);
    TrainHelper(train7Manian, 7);
    TrainHelper(train7Vega, 7);

    TrainHelper(train8Bongard, 8);
    TrainHelper(train8Goldman, 8);
    TrainHelper(train8ILee, 8);
    TrainHelper(train8JClark, 8);

    TrainHelper(train9Bongard, 9);
    TrainHelper(train9Goldman, 9);
    TrainHelper(train9ILee, 9);
*/


    TrainHelper(train_0, 0);
    TrainHelper(train0Allison,0);
    TrainHelper(train_1, 1);
    TrainHelper(train1Robby,1);
    TrainHelper(train1Allison,1);
    TrainHelper(train1Bongard,1);
    TrainHelper(train1McLaughlin,1);

    TrainHelper(train_2, 2);
    TrainHelper(train2Banaszewski, 2);
    TrainHelper(train2Bongard, 2);
    TrainHelper(train2Downs, 2);

    TrainHelper(train_3, 3);
    TrainHelper(train3Bongard, 3);

    TrainHelper(train_4, 4);
    TrainHelper(train4Robby, 4);
    TrainHelper(train4, 4);
    TrainHelper(train4OBrien, 4);
    //TrainHelper(train4Bongard, 4);

    TrainHelper(train_5, 5);
    //TrainHelper(train5Bongard, 5);

    TrainHelper(train_6, 6);
    TrainHelper(train6,6);

    TrainHelper(train_7, 7);
    TrainHelper(train_8, 8);
    TrainHelper(train_9, 9);
    
   TrainHelper(train0Bongard, 0);
   TrainHelper(train1Davis, 1);
   TrainHelper(train2Liu, 2);
   TrainHelper(train3Li, 3);
   TrainHelper(train4Liu, 4);
   TrainHelper(train5Shi, 5);
   TrainHelper(train6Bongard, 6);
   TrainHelper(train7, 7);
   TrainHelper(train8Bongard, 8);
   TrainHelper(train9JClark, 9);

   TrainHelper(train7Bongard, 7);
   TrainHelper(train7Laquerre, 7);
  // TrainHelper(train7Manian, 7);
   //TrainHelper(train7Vega, 7);

   //TrainHelper(train8Goldman, 8);
   TrainHelper(train8ILee, 8);
   //TrainHelper(train8JClark, 8);
   
    trainingCompleted = true;
    var end = new Date().getTime();
    var time = end - start;
    console.log("training complete it took: ", time );
}

function Test(){
    //console.log("testing :");
    var currentFeatures = oneFrameOfData.reshape(120);
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);  
    currentLabel = currentFeatures.get(currentFeatures.shape -1);
}

function TestExtended(){
    //0
    if( extenedArray.get(0) === 0 &&
        extenedArray.get(1) === 0 &&
        extenedArray.get(2) === 0 &&
        extenedArray.get(3) === 0 &&
        extenedArray.get(4) === 0 ){
            return 0;
        }else
    //1
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        return 1;
    }else
    //2
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        return 2;
    }else
    //3
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        return 3;
    }else
    //4
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        return 4;
    }else
    //5
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        return 5;
    }else
    //6
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 0 ){
        return 6;
    }else
    //7
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 1 ){
        return 7;
    }else
    //8
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        return 8;
    }else
    //9
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 0 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        return 9;
    }else{
        return 5;
    }
    
}

function GotResults(err, result){
    PredictionAccuracy(result.label);
   // console.log(c);
    console.log(TestExtended());
  //predictedClassLabels.set(testingSampleIndex,result.label);
}

function TrainHelper(train,n){
    CenterData();
    for(var i =0; i < train.shape[3]; i++){
        //console.log(train.pick(null,null,null,i,null).reshape(120).toString());
        features = train.pick(null,null,null,i,null).reshape(120).tolist(); 
        knnClassifier.addExample(features,n);
        
        MirrorHand(train);
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
             if(finger.extended){
                extenedArray.set(finger.type, 1);
             }else{
                extenedArray.set(finger.type, 0);
             }
             
         });
     }
    // console.log(extenedArray.toString());
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
 }

 function TransformCoordinates (normalizedPosition){
    // Convert the normalized coordinates to span the canvas
    //scale to top left 
    x = window.innerWidth/2 * normalizedPosition[0];
    y = (window.innerHeight/2 * (normalizedPosition[1])) + window.innerHeight/2;

    return[x,y];
}
function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();
}
function MirrorHand(frame){
    var xValues = frame.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    var horizontalShift = 0.5 - currentMean;
    for(var currentRow = 0; currentRow < 5; currentRow++){
        for(var currentColumn = 0; currentColumn < 4; currentColumn++){
            currentX = frame.get(currentRow,currentColumn,0);
            shiftedX = currentX + horizontalShift;
            frame.set(currentRow,currentColumn,0, 1 - shiftedX);

            currentX = frame.get(currentRow,currentColumn,3);
            shiftedX = currentX + horizontalShift;
            frame.set(currentRow,currentColumn,3,1 - shiftedX);
        }
    }
    xValues = frame.slice([],[],[0,6,3]);
    var currentMeanAfter = xValues.mean();
}
function CenterXData(){
    var xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    uncenteredX = currentMean;
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
    uncenteredY = currentMean;
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
    uncenteredZ = currentMean;
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
function SignIn(){
    console.log("yo gamer gamer");
}