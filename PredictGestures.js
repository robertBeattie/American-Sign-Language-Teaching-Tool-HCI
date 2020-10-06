

const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 0;

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;


var predictedClassLabels = nj.zeros(3);
function draw(){
    clear();
    
    if(!trainingCompleted){
        Train();
    }
    Test();    
}

function Train(){
    console.log("training :");
    //console.log("size :" + train0.shape[3]);
    TrainHelper(train0,0);
    TrainHelper(train1,1);
    TrainHelper(train3,3);
    TrainHelper(train4,4);

    trainingCompleted = true;
}

function Test(){
    console.log("testing :");
    //console.log(test.pick(null,null,null,testingSampleIndex,null).reshape(120).tolist());
    var currentFeatures = test.pick(null,null,null,testingSampleIndex,null).reshape(120);
    currentLabel = currentFeatures.get(currentFeatures.shape -1);
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);  
   
}

function GotResults(err, result){
    console.log(testingSampleIndex + ": " + result.label);
    predictedClassLabels.set(testingSampleIndex,result.label);
    
    testingSampleIndex++;
    if(testingSampleIndex >= test.shape[3]){
       testingSampleIndex = 0;
    }
}

function TrainHelper(train,n){
    for(var i =0; i < train.shape[3]; i++){
        //console.log(train.pick(null,null,null,i,null).reshape(120).toString());
        features = train.pick(null,null,null,i,null).reshape(120).tolist(); 
        knnClassifier.addExample(features,n);
    }
}