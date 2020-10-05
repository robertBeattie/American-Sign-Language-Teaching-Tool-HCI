

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
    //console.log("size :" + train0.shape[3]);
    for(var i =0; i < train0.shape[3]; i++){
        console.log(train0.pick(null,null,null,i,null).reshape(120).toString());
        features = train0.pick(null,null,null,i,null).reshape(120); 
    }

    trainingCompleted = true;
}

function Test(){
    //console.log("testing :" + test);
}