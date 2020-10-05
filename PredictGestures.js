

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
    for(var i =0; i < train0.size; i++){
        console.log(train0.shape[3]); 
    }

    trainingCompleted = true;
}

function Test(){
    //console.log("testing :" + test);
}