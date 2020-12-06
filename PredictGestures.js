const knnClassifier = ml5.KNNClassifier();

var controllerOptions = {};

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;
var initSignIn = false;

var oneFrameOfData = nj.zeros([5,4,6]);

var predictedClassLabels = nj.zeros(3);

//cheaty hack vvv
var extenedArray = nj.zeros(5);
//predicton accuracy
// number of frames looked at
var n = 0;
//meanPredictionAccuracy
var m = 0;
//current predicted digit 
var c;
//not in use v was current digit being guessed.
var d = "0";

//(a) 0 = the program is waiting to see the user’s hand.
//(b) 1 = the user’s hand is present but not centered.
//(c) 2 = the user’s hand is present and centered.
var programState = 0;

var uncenteredX;
var uncenteredY;
var uncenteredZ;


var digitToShow = 0;
var timeSinceLastDigitChange = new Date();
var timeToSwitchDigits = 5;

var digitsLearned = -1;
var currentUser = "";
var isShowingNumbers = true;

var letterToShow = 0;
var lettersLearned = -1;

var previousDigitPercents = nj.zeros(10);
var previousLetterPercents = nj.zeros(26);

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
    }else if (programState==3) {
        HandleState3(frame);
    }

});

function DetermineState(frame){
    if (frame.hands.length == 0){
        programState = 0;
    }else if(frame.hands.length >= 1 && HandIsUncentered()){
        programState = 1;
    }else if(frame.hands.length >= 1 && !HandIsUncentered() && !KnowsTheLetters()){
        programState = 2;
    }else {
        programState = 3;
    }
    //console.log(programState);
}
function HandleState0(frame){
    SignInIfNotDoneYet();
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
    if(isShowingNumbers){
        TestExtended();
    }else{
        TestExtendedLetters();
    }
    
   
}
function HandleState2(frame){
    HandleFrame(frame);
    DrawLowerRightPanel();
    DrawLowerLeftPanel();
    if(isShowingNumbers){
        DetermineWhetherToSwitchDigits();
    }else{
        DetermineWhetherToSwitchLetters();
    }
   
    if(isShowingNumbers){
        TestExtended();
    }else{
        TestExtendedLetters();
    }
}
function HandleState3(frame){
    HandleFrame(frame);
    DrawLowerRightPanel();
    DrawLowerLeftPanel();
    DrawUpperRightPanelSpelling();
    if(isShowingNumbers){
        DetermineWhetherToSwitchDigits();
    }else{
        DetermineWhetherToSwitchLetters();
    }
   
    if(isShowingNumbers){
        TestExtended();
    }else{
        TestExtendedLetters();
    }
}

function HandIsUncentered(){
    return HandIsTooFarToTheLeft() || 
    HandIsTooFarToTheRight() ||
    HandIsTooFarToTheLow() ||
    HandIsTooFarToTheHigh() ||
    HandIsTooFarToTheClose() ||
    HandIsTooFarToTheFar();
}
function KnowsTheLetters(){
    return Math.trunc(CalculateUserSessionAverage(currentUser) * 100) > 90;
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
    if(!trainingCompleted){
      //  Train();
      trainingCompleted = true;
    }
}
function SignInIfNotDoneYet(){
    if(!initSignIn){
        SignIn();
        initSignIn = true;
    }
    
}
function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(imgWaiting,0,0,window.innerWidth/2,window.innerHeight/2);
}
function Train(){
    var start = new Date().getTime();
    console.log("training :");
    //console.log("size :" + train0.shape[3]);
    
    
    //Attempt 1
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
/*
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
   */
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
    var r;
    //0
    if( extenedArray.get(0) === 0 &&
        extenedArray.get(1) === 0 &&
        extenedArray.get(2) === 0 &&
        extenedArray.get(3) === 0 &&
        extenedArray.get(4) === 0 ){
            r = 0;
        }else
    //1
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r = 1;
    }else
    //2
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r = 2;
    }else
    //3
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r = 3;
    }else
    //4
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r = 4;
    }else
    //5
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r = 5;
    }else
    //6
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 0 ){
        r = 6;
    }else
    //7
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 1 ){
        r = 7;
    }else
    //8
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r = 8;
    }else
    //9
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 0 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r = 9;
    }else{
        r = Math.floor(Math.random() * 5) + 1 + Math.floor(Math.random() * 5);
    }
    PredictionAccuracy(r);
    return r;
}
function TestExtendedLetters(){
    //console.log(extenedArray.tolist());
    var r = '';
    //acemnost
    if( extenedArray.get(0) === 0 &&
        extenedArray.get(1) === 0 &&
        extenedArray.get(2) === 0 &&
        extenedArray.get(3) === 0 &&
        extenedArray.get(4) === 0 ){
            r += 'acemnost';
        }else
    //dgxz
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r += 'dgxz';
    }else
    //hkruv
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r += 'hkruv';
    }else
    //3
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r += '';
    }else
    //b
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r += 'b';
    }else
    //5
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r += '';
    }else
    //w
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 0 ){
        r += 'w';
    }else
    //7
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 1 ){
        r += '';
    }else
    //8
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r += '';
    }else
    //f
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 0 &&
    extenedArray.get(2) === 1 &&
    extenedArray.get(3) === 1 &&
    extenedArray.get(4) === 1 ){
        r += 'f';
    }else
    //ij
    if( extenedArray.get(0) === 0 &&
    extenedArray.get(1) === 0 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 1 ){
        r += 'ij';
    }else
    //lpq
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 1 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 0 ){
        r += 'lpq';
    }else
    //y
    if( extenedArray.get(0) === 1 &&
    extenedArray.get(1) === 0 &&
    extenedArray.get(2) === 0 &&
    extenedArray.get(3) === 0 &&
    extenedArray.get(4) === 1 ){
        r += 'y';
    }
    PredictionAccuracyLetters(r);
    return r;
}
function GotResults(err, result){
    //PredictionAccuracy(result.label);
    //PredictionAccuracy(TestExtended());
    //console.log(m,n,c,digitToShow);
    //console.log();
    predictedClassLabels.set(testingSampleIndex,result.label);
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
    //stroke(strokeW * 35);
    //color scaled based on m -> meanPredictionAccuracy
    var red = (1 - m) * 255;
    var green = m * 255;
    stroke(color(red, green, 0));
    
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
    if(c==digitToShow) {
        cd = 1; 
    }else{
        cd = 0;
    }
    
    

    m = (((n-1) * m + cd)/n);
}
function PredictionAccuracyLetters(predicted){
    c = predicted;
    n++;
    var cd;
    if(c.toString().includes(String.fromCharCode(97 + letterToShow))) {
        cd = 1; 
    }else{
        cd = 0;
    }

    m = (((n-1) * m + cd)/n);
}
function SignIn(){
    username = document.getElementById('username').value;
    var list = document.getElementById('users');
    currentUser = username;
    //check for new user
    if(IsNewUser(username,list)){
        CreateNewUser(username,list);
        CreateSignInItem(username,list);
        CreateDigitsLearnedItem(username,list);
        CreateDigitsPercentsItem(username,list);
        CreateLettersLearnedItem(username,list);
        CreateLettersPercentsItem(username,list);
    }else{
        ID = String(username) + "_signins";
        listItem = document.getElementById(ID);
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;

        ID = String(username) + "_digitslearned";
        digitsLearned = parseInt(document.getElementById(ID).innerHTML);

        ID = String(username) + "_letterslearned";
        lettersLearned = parseInt(document.getElementById(ID).innerHTML);
        StorePreviousSesstionValue();
    }
    digitToShow = 0;
    letterToShow = 0;
    console.log(list.innerHTML);
    return false;
}
function Letters(){
    isShowingNumbers = false;
    return false;
}
function Numbers(){
    isShowingNumbers = true;
    return false;
}
function IsNewUser(username,list){
    var usernameFound = false;
    var users = list.children;
    for(var i = 0; i < users.length; i++){
        if(username == users[i].innerHTML){
            usernameFound = true;
        }
    }
    return usernameFound == false;
}
function CreateNewUser(username,list){
    var itemName = document.createElement('li');
    itemName.id = String(username) + "_name";
    itemName.innerHTML = String(username);
    list.appendChild(itemName);
}
function CreateSignInItem(username,list){
    var itemSignIns = document.createElement('li');
    itemSignIns.id = String(username) + "_signins";
    itemSignIns.innerHTML = String(0);
    list.appendChild(itemSignIns);
}
function CreateDigitsLearnedItem(username,list){
    var itemDigitsLearned = document.createElement('li');
    itemDigitsLearned.id = String(username) + "_digitslearned";
    itemDigitsLearned.innerHTML = String(-1);
    list.appendChild(itemDigitsLearned);
    digitsLearned = -1;
}
function CreateDigitsPercentsItem(username,list){
    for(var i=0; i < 10; i++){
        var itemDigitsPercents = document.createElement('li');
        itemDigitsPercents.id = String(username) + "_digitsPercents_" + String(i);
        itemDigitsPercents.innerHTML = String(0);
        list.appendChild(itemDigitsPercents);
    }
}
function CreateLettersLearnedItem(username,list){
    var itemLettersLearned = document.createElement('li');
    itemLettersLearned.id = String(username) + "_letterslearned";
    itemLettersLearned.innerHTML = String(-1);
    list.appendChild(itemLettersLearned);
    lettersLearned = -1;
}
function CreateLettersPercentsItem(username,list){
    for(var i=0; i < 26; i++){
        var itemLettersPercents = document.createElement('li');
        itemLettersPercents.id = String(username) + "_lettersPercents_" + String(i);
        itemLettersPercents.innerHTML = String(0);
        list.appendChild(itemLettersPercents);
    }
}
function DrawUpperRightPanelSpelling(){
    image(imgASL3,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}
function DrawLowerRightPanel(){
    if(isShowingNumbers){
        if(!TimeToSwitchDigitImage()){
            if(digitToShow == 0){
                image(imgASL0,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 1){
                image(imgASL1,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 2){
                image(imgASL2,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 3){
                image(imgASL3,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 4){
                image(imgASL4,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 5){
                image(imgASL5,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 6){
                image(imgASL6,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 7){
                image(imgASL7,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 8){
                image(imgASL8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 9){
                image(imgASL9,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }
        }else{
            if(digitToShow == 0){
                image(imgNum0,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 1){
                image(imgNum1,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 2){
                image(imgNum2,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 3){
                image(imgNum3,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 4){
                image(imgNum4,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 5){
                image(imgNum5,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 6){
                image(imgNum6,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 7){
                image(imgNum7,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 8){
                image(imgNum8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(digitToShow == 9){
                image(imgNum9,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }
        }
    }else {
        if(!TimeToSwitchLetterImage()){
            if(letterToShow == 0){
                image(imgASLA,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 1){
                image(imgASLB,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 2){
                image(imgASLC,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 3){
                image(imgASLD,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 4){
                image(imgASLE,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 5){
                image(imgASLF,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 6){
                image(imgASLG,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 7){
                image(imgASLH,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 8){
                image(imgASLI,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 9){
                image(imgASLJ,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 10){
                image(imgASLK,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 11){
                image(imgASLL,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 12){
                image(imgASLM,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 13){
                image(imgASLN,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 14){
                image(imgASLO,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 15){
                image(imgASLP,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 16){
                image(imgASLQ,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 17){
                image(imgASLR,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 18){
                image(imgASLS,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 19){
                image(imgASLT,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 20){
                image(imgASLU,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 21){
                image(imgASLV,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 22){
                image(imgASLW,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 23){
                image(imgASLX,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 24){
                image(imgASLY,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 25){
                image(imgASLZ,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }
        }else{
            if(letterToShow == 0){
                image(imgLA,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 1){
                image(imgLB,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 2){
                image(imgLC,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 3){
                image(imgLD,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 4){
                image(imgLE,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 5){
                image(imgLF,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 6){
                image(imgLG,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 7){
                image(imgLH,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 8){
                image(imgLI,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 9){
                image(imgLJ,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 10){
                image(imgLK,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 11){
                image(imgLL,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 12){
                image(imgLM,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 13){
                image(imgLN,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 14){
                image(imgLO,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 15){
                image(imgLP,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 16){
                image(imgLQ,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 17){
                image(imgLR,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 18){
                image(imgLS,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 19){
                image(imgLT,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 20){
                image(imgLU,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 21){
                image(imgLV,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 22){
                image(imgLW,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 23){
                image(imgLX,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 24){
                image(imgLY,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }else if(letterToShow == 25){
                image(imgLZ,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
            }
        }
    }
    
}
function DrawLowerLeftPanel(){
    var digitOrLetter = "Letter";
    if(isShowingNumbers){
        digitOrLetter = "Digit"
    }
    rectMode(CORNER);
    textAlign(CENTER,CENTER);
    stroke(0);
    strokeWeight(2);
    
    //x y width height
    textSize(40);
    //Top Right Side Header---------------------------------------------------------------------------------------------------
    fill(100);
    rect(0, window.innerHeight/2, window.innerWidth/4, window.innerHeight/12);
    fill(0);
    text("Current ".concat(digitOrLetter),0, window.innerHeight/2, window.innerWidth/4, window.innerHeight/12);
    

    //Top Right Side Value---------------------------------------------------------------------------------------------------
    textSize(80);
    fill(155);
    rect(0, window.innerHeight * 7/12, window.innerWidth/4, window.innerHeight/6);
    fill(0);
    var currentSignedAverage = Math.trunc(m * 100).toString();
    text(currentSignedAverage.concat("%"),0, window.innerHeight * 7/12, window.innerWidth/4, window.innerHeight/6);
    

    //Bottom Right Side Header---------------------------------------------------------------------------------------------------
    textSize(40);
    fill(100);
    rect(0, window.innerHeight * 3/4, window.innerWidth/4, window.innerHeight/12);
    fill(0);
    text("Previous Session ".concat(digitOrLetter),0, window.innerHeight * 3/4, window.innerWidth/4, window.innerHeight/12);
    

    //Bottom Right Side Value---------------------------------------------------------------------------------------------------
    textSize(80);
    fill(155);
    rect(0, window.innerHeight * 10/12, window.innerWidth/4, window.innerHeight/6);
    fill(0);
    var previousValueAverage = Math.trunc(PreviousSesstionValue() * 100).toString();
    text(previousValueAverage.concat("%"),0, window.innerHeight * 10/12, window.innerWidth/4, window.innerHeight/6);
    

    
    //Top Left Side Header
    textSize(40);
    fill(100);
    rect(window.innerWidth/4, window.innerHeight/2, window.innerWidth/4, window.innerHeight/12);
    fill(0);
    text("Current Session Average",window.innerWidth/4, window.innerHeight/2, window.innerWidth/4, window.innerHeight/12);
    
    //Top Left Side Value
    textSize(80);
    fill(155);
    rect(window.innerWidth/4, window.innerHeight * 7/12, window.innerWidth/4, window.innerHeight/6);
    fill(0);
    var currentSessionAverage = Math.trunc(CalculateUserSessionAverage(currentUser) * 100).toString();
    text(currentSessionAverage.concat("%"),window.innerWidth/4, window.innerHeight * 7/12, window.innerWidth/4, window.innerHeight/6);
    
    //Bottom Left Side Header
    textSize(40);
    fill(100);
    rect(window.innerWidth/4, window.innerHeight * 3/4, window.innerWidth/4, window.innerHeight/12);
    fill(0);
    text("All User's Session",window.innerWidth/4, window.innerHeight * 3/4, window.innerWidth/4, window.innerHeight/12);
    
    
    //Bottom Left Side Value
    textSize(80);
    fill(155);
    rect(window.innerWidth/4, window.innerHeight * 10/12, window.innerWidth/4, window.innerHeight/6);
    fill(0);
    var allUsersAverage = Math.trunc(CalculateAllUsersSessionsAverage() * 100).toString();
    text(allUsersAverage.concat("%"),window.innerWidth/4, window.innerHeight * 10/12, window.innerWidth/4, window.innerHeight/6);

    
}
//returns a float
function PreviousSesstionValue(){

    if(isShowingNumbers){
        return previousDigitPercents.get(digitToShow);
    }else{
        return previousLetterPercents.get(letterToShow);
    }
}
function StorePreviousSesstionValue(){
    for(var i =0;i<10;i++){
        ID = String(currentUser) + "_digitsPercents_" + String(i);
        digitPercent = parseFloat(document.getElementById(ID).innerHTML);
        previousDigitPercents.set(i, digitPercent);
    }
    for(var i =0;i<26;i++){
        ID = String(currentUser) + "_lettersPercents_" + String(i);
        letterPercent = parseFloat(document.getElementById(ID).innerHTML);
        previousLetterPercents.set(i, letterPercent);
    }
}
//takes current username returns a float
function CalculateUserSessionAverage(username){
    var sum = 0;
    if(isShowingNumbers){
        for(var i =0;i<10;i++){
            ID = String(username) + "_digitsPercents_" + String(i);
            digitPercent = parseFloat(document.getElementById(ID).innerHTML);
            sum += digitPercent;
            //console.log(digitPercent);
        }
        sum /= 10;
    }else{
        for(var i =0;i<26;i++){
            ID = String(username) + "_lettersPercents_" + String(i);
            digitPercent = parseFloat(document.getElementById(ID).innerHTML);
            sum += digitPercent;
        }
        sum /= 26;
    }
    return sum;
}
//returns a float
function CalculateAllUsersSessionsAverage(){
    var sum = 0;
    var names = new Array();

    let list = document.getElementById("users").querySelectorAll('li');
    list.forEach((item, index) => {
        if(item.id.includes("_name")){
            var res = item.id.split("_");
            names.push(res[0]);
        }
    });

    for(var j =0;j<names.length;j++){
        sum += CalculateUserSessionAverage(names[j]);
    }
    
    return  sum / names.length;
}
function DetermineWhetherToSwitchDigits(){
    if(TimeToSwitchDigits()){
        console.log("Time to Switch: ", m);
        DigitLearned();
        SwitchDigits();
        CalculateReduceTime();
    }
   
}
function DetermineWhetherToSwitchLetters(){
    if(TimeToSwitchDigits()){
        console.log("Time to Switch: ", m);
        LetterLearned();
        SwitchLetters();
        CalculateReduceTimeLetters();
    }
   
}
function SwitchDigits() {
    timeSinceLastDigitChange = new Date();
    //store there last result
  //  if(currentUser != ""){
        ID = String(currentUser) + "_digitsPercents_" + digitToShow;
        listItem = document.getElementById(ID);
        listItem.innerHTML = String(m);
  //  }
    //resets mean accuracy 
    m=1;
    //resets count of frames
    n=0;
    

    if(digitsLearned != -1 && digitToShow != 9 && digitToShow <= digitsLearned){
        digitToShow++;
    }else{
        digitToShow = 0;
    }
}
function SwitchLetters() {
    timeSinceLastDigitChange = new Date();
    ID = String(currentUser) + "_lettersPercents_" + letterToShow;
    listItem = document.getElementById(ID);
    listItem.innerHTML = String(m);
    //resets mean accuracy 
    m=1;
    //resets count of frames
    n=0;
    

    if(lettersLearned != -1 && letterToShow != 25 && letterToShow <= lettersLearned){
        letterToShow++;
    }else{
        letterToShow = 0;
    }
}
function DigitLearned(){
    if(digitsLearned != 9 && digitsLearned + 1 == digitToShow && m >= 0.5){
        digitsLearned++;
        console.log("learned new digit: ", digitsLearned);
       // if(currentUser != ""){
            ID = String(currentUser) + "_digitslearned";
            listItem = document.getElementById(ID);
            listItem.innerHTML = String(digitsLearned);
      //  }
    }
}
function LetterLearned(){
    if(lettersLearned != 26 && lettersLearned + 1 == letterToShow && m >= 0.5){
        lettersLearned++;
        console.log("learned new letter: ", String.fromCharCode(97 + lettersLearned));
            ID = String(currentUser) + "_letterslearned";
            listItem = document.getElementById(ID);
            listItem.innerHTML = String(digitsLearned);
    }
}
function TimeToSwitchDigits() {
    var currentTime = new Date();
    var timeInMilliseconds = currentTime.getTime() - timeSinceLastDigitChange.getTime();
    var timeInSeconds = timeInMilliseconds / 1000;
    return timeInSeconds >= timeToSwitchDigits;
}
function TimeToSwitchDigitImage() {
    var currentTime = new Date();
    var timeInMilliseconds = currentTime.getTime() - timeSinceLastDigitChange.getTime();
    var timeInSeconds = timeInMilliseconds / 1000;
    return timeInSeconds >= CalculateTimeDeltaToSwitchDigitImage();
}
function TimeToSwitchLetterImage() {
    var currentTime = new Date();
    var timeInMilliseconds = currentTime.getTime() - timeSinceLastDigitChange.getTime();
    var timeInSeconds = timeInMilliseconds / 1000;
    return timeInSeconds >= CalculateTimeDeltaToSwitchLetterImage();
}
function CalculateTimeDeltaToSwitchDigitImage(){
   // if(currentUser == ""){ return  timeToSwitchDigits * 2}

    ID = String(currentUser) + "_digitsPercents_" + digitToShow;
    listItem = document.getElementById(ID);
    previousPercent = parseFloat(listItem.innerHTML);
    console.log(previousPercent);
    if(previousPercent >= 0.95){
        return 0;
    }else if(previousPercent >= 0.80){
        return timeToSwitchDigits * .4;
    }else if(previousPercent >= 0.60){
        return timeToSwitchDigits * .8;
    }else{
        return timeToSwitchDigits * 2;
    }
}
function CalculateTimeDeltaToSwitchLetterImage(){
    // if(currentUser == ""){ return  timeToSwitchDigits * 2}
 
     ID = String(currentUser) + "_lettersPercents_" + letterToShow;
     listItem = document.getElementById(ID);
     previousPercent = parseFloat(listItem.innerHTML);
     console.log(previousPercent);
     if(previousPercent >= 0.95){
         return 0;
     }else if(previousPercent >= 0.80){
         return timeToSwitchDigits * .4;
     }else if(previousPercent >= 0.60){
         return timeToSwitchDigits * .8;
     }else{
         return timeToSwitchDigits * 2;
     }
}
function CalculateReduceTime(){
    // if(currentUser == ""){ return  timeToSwitchDigits * 2}
 
     ID = String(currentUser) + "_digitsPercents_" + digitToShow;
     listItem = document.getElementById(ID);
     previousPercent = parseFloat(listItem.innerHTML);
     console.log(previousPercent);
     if(previousPercent >= 0.95){
        timeToSwitchDigits = 2;
     }else if(previousPercent >= 0.80){
        timeToSwitchDigits = 3;
     }else if(previousPercent >= 0.60){
        timeToSwitchDigits = 4;
     }else{
        timeToSwitchDigits = 5;
     }
}
function CalculateReduceTimeLetters(){ 
     ID = String(currentUser) + "_lettersPercents_" + letterToShow;
     listItem = document.getElementById(ID);
     previousPercent = parseFloat(listItem.innerHTML);
     //console.log(previousPercent);
     if(previousPercent >= 0.95){
        timeToSwitchDigits = 2;
     }else if(previousPercent >= 0.80){
        timeToSwitchDigits = 3;
     }else if(previousPercent >= 0.60){
        timeToSwitchDigits = 4;
     }else{
        timeToSwitchDigits = 5;
     }
}