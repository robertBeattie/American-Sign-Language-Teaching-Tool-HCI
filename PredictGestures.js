

const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 1;

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;

function draw(){
    clear();
    
    if(!trainingCompleted){
        Train();
    }
    Test();    
}

function Train(){
    //console.log("training :" + train0);

    trainingCompleted = true;
}

function Test(){
    //console.log("testing :" + test);
}