var irisData = varirisData=nj.array([
    [	5.1	,	3.5	,	1.4	,	0.2	,	0	,	],
    [	4.9	,	3	,	1.4	,	0.2	,	0	,	],
    [	4.7	,	3.2	,	1.3	,	0.2	,	0	,	],
    [	4.6	,	3.1	,	1.5	,	0.2	,	0	,	],
    [	5	,	3.6	,	1.4	,	0.2	,	0	,	],
    [	5.4	,	3.9	,	1.7	,	0.4	,	0	,	],
    [	4.6	,	3.4	,	1.4	,	0.3	,	0	,	],
    [	5	,	3.4	,	1.5	,	0.2	,	0	,	],
    [	4.4	,	2.9	,	1.4	,	0.2	,	0	,	],
    [	4.9	,	3.1	,	1.5	,	0.1	,	0	,	],
    [	5.4	,	3.7	,	1.5	,	0.2	,	0	,	],
    [	4.8	,	3.4	,	1.6	,	0.2	,	0	,	],
    [	4.8	,	3	,	1.4	,	0.1	,	0	,	],
    [	4.3	,	3	,	1.1	,	0.1	,	0	,	],
    [	5.8	,	4	,	1.2	,	0.2	,	0	,	],
    [	5.7	,	4.4	,	1.5	,	0.4	,	0	,	],
    [	5.4	,	3.9	,	1.3	,	0.4	,	0	,	],
    [	5.1	,	3.5	,	1.4	,	0.3	,	0	,	],
    [	5.7	,	3.8	,	1.7	,	0.3	,	0	,	],
    [	5.1	,	3.8	,	1.5	,	0.3	,	0	,	],
    [	5.4	,	3.4	,	1.7	,	0.2	,	0	,	],
    [	5.1	,	3.7	,	1.5	,	0.4	,	0	,	],
    [	4.6	,	3.6	,	1	,	0.2	,	0	,	],
    [	5.1	,	3.3	,	1.7	,	0.5	,	0	,	],
    [	4.8	,	3.4	,	1.9	,	0.2	,	0	,	],
    [	5	,	3	,	1.6	,	0.2	,	0	,	],
    [	5	,	3.4	,	1.6	,	0.4	,	0	,	],
    [	5.2	,	3.5	,	1.5	,	0.2	,	0	,	],
    [	5.2	,	3.4	,	1.4	,	0.2	,	0	,	],
    [	4.7	,	3.2	,	1.6	,	0.2	,	0	,	],
    [	4.8	,	3.1	,	1.6	,	0.2	,	0	,	],
    [	5.4	,	3.4	,	1.5	,	0.4	,	0	,	],
    [	5.2	,	4.1	,	1.5	,	0.1	,	0	,	],
    [	5.5	,	4.2	,	1.4	,	0.2	,	0	,	],
    [	4.9	,	3.1	,	1.5	,	0.1	,	0	,	],
    [	5	,	3.2	,	1.2	,	0.2	,	0	,	],
    [	5.5	,	3.5	,	1.3	,	0.2	,	0	,	],
    [	4.9	,	3.1	,	1.5	,	0.1	,	0	,	],
    [	4.4	,	3	,	1.3	,	0.2	,	0	,	],
    [	5.1	,	3.4	,	1.5	,	0.2	,	0	,	],
    [	5	,	3.5	,	1.3	,	0.3	,	0	,	],
    [	4.5	,	2.3	,	1.3	,	0.3	,	0	,	],
    [	4.4	,	3.2	,	1.3	,	0.2	,	0	,	],
    [	5	,	3.5	,	1.6	,	0.6	,	0	,	],
    [	5.1	,	3.8	,	1.9	,	0.4	,	0	,	],
    [	4.8	,	3	,	1.4	,	0.3	,	0	,	],
    [	5.1	,	3.8	,	1.6	,	0.2	,	0	,	],
    [	4.6	,	3.2	,	1.4	,	0.2	,	0	,	],
    [	5.3	,	3.7	,	1.5	,	0.2	,	0	,	],
    [	5	,	3.3	,	1.4	,	0.2	,	0	,	],
    [	7	,	3.2	,	4.7	,	1.4	,	1	,	],
    [	6.4	,	3.2	,	4.5	,	1.5	,	1	,	],
    [	6.9	,	3.1	,	4.9	,	1.5	,	1	,	],
    [	5.5	,	2.3	,	4	,	1.3	,	1	,	],
    [	6.5	,	2.8	,	4.6	,	1.5	,	1	,	],
    [	5.7	,	2.8	,	4.5	,	1.3	,	1	,	],
    [	6.3	,	3.3	,	4.7	,	1.6	,	1	,	],
    [	4.9	,	2.4	,	3.3	,	1	,	1	,	],
    [	6.6	,	2.9	,	4.6	,	1.3	,	1	,	],
    [	5.2	,	2.7	,	3.9	,	1.4	,	1	,	],
    [	5	,	2	,	3.5	,	1	,	1	,	],
    [	5.9	,	3	,	4.2	,	1.5	,	1	,	],
    [	6	,	2.2	,	4	,	1	,	1	,	],
    [	6.1	,	2.9	,	4.7	,	1.4	,	1	,	],
    [	5.6	,	2.9	,	3.6	,	1.3	,	1	,	],
    [	6.7	,	3.1	,	4.4	,	1.4	,	1	,	],
    [	5.6	,	3	,	4.5	,	1.5	,	1	,	],
    [	5.8	,	2.7	,	4.1	,	1	,	1	,	],
    [	6.2	,	2.2	,	4.5	,	1.5	,	1	,	],
    [	5.6	,	2.5	,	3.9	,	1.1	,	1	,	],
    [	5.9	,	3.2	,	4.8	,	1.8	,	1	,	],
    [	6.1	,	2.8	,	4	,	1.3	,	1	,	],
    [	6.3	,	2.5	,	4.9	,	1.5	,	1	,	],
    [	6.1	,	2.8	,	4.7	,	1.2	,	1	,	],
    [	6.4	,	2.9	,	4.3	,	1.3	,	1	,	],
    [	6.6	,	3	,	4.4	,	1.4	,	1	,	],
    [	6.8	,	2.8	,	4.8	,	1.4	,	1	,	],
    [	6.7	,	3	,	5	,	1.7	,	1	,	],
    [	6	,	2.9	,	4.5	,	1.5	,	1	,	],
    [	5.7	,	2.6	,	3.5	,	1	,	1	,	],
    [	5.5	,	2.4	,	3.8	,	1.1	,	1	,	],
    [	5.5	,	2.4	,	3.7	,	1	,	1	,	],
    [	5.8	,	2.7	,	3.9	,	1.2	,	1	,	],
    [	6	,	2.7	,	5.1	,	1.6	,	1	,	],
    [	5.4	,	3	,	4.5	,	1.5	,	1	,	],
    [	6	,	3.4	,	4.5	,	1.6	,	1	,	],
    [	6.7	,	3.1	,	4.7	,	1.5	,	1	,	],
    [	6.3	,	2.3	,	4.4	,	1.3	,	1	,	],
    [	5.6	,	3	,	4.1	,	1.3	,	1	,	],
    [	5.5	,	2.5	,	4	,	1.3	,	1	,	],
    [	5.5	,	2.6	,	4.4	,	1.2	,	1	,	],
    [	6.1	,	3	,	4.6	,	1.4	,	1	,	],
    [	5.8	,	2.6	,	4	,	1.2	,	1	,	],
    [	5	,	2.3	,	3.3	,	1	,	1	,	],
    [	5.6	,	2.7	,	4.2	,	1.3	,	1	,	],
    [	5.7	,	3	,	4.2	,	1.2	,	1	,	],
    [	5.7	,	2.9	,	4.2	,	1.3	,	1	,	],
    [	6.2	,	2.9	,	4.3	,	1.3	,	1	,	],
    [	5.1	,	2.5	,	3	,	1.1	,	1	,	],
    [	5.7	,	2.8	,	4.1	,	1.3	,	1	,	],
    [	6.3	,	3.3	,	6	,	2.5	,	2	,	],
    [	5.8	,	2.7	,	5.1	,	1.9	,	2	,	],
    [	7.1	,	3	,	5.9	,	2.1	,	2	,	],
    [	6.3	,	2.9	,	5.6	,	1.8	,	2	,	],
    [	6.5	,	3	,	5.8	,	2.2	,	2	,	],
    [	7.6	,	3	,	6.6	,	2.1	,	2	,	],
    [	4.9	,	2.5	,	4.5	,	1.7	,	2	,	],
    [	7.3	,	2.9	,	6.3	,	1.8	,	2	,	],
    [	6.7	,	2.5	,	5.8	,	1.8	,	2	,	],
    [	7.2	,	3.6	,	6.1	,	2.5	,	2	,	],
    [	6.5	,	3.2	,	5.1	,	2	,	2	,	],
    [	6.4	,	2.7	,	5.3	,	1.9	,	2	,	],
    [	6.8	,	3	,	5.5	,	2.1	,	2	,	],
    [	5.7	,	2.5	,	5	,	2	,	2	,	],
    [	5.8	,	2.8	,	5.1	,	2.4	,	2	,	],
    [	6.4	,	3.2	,	5.3	,	2.3	,	2	,	],
    [	6.5	,	3	,	5.5	,	1.8	,	2	,	],
    [	7.7	,	3.8	,	6.7	,	2.2	,	2	,	],
    [	7.7	,	2.6	,	6.9	,	2.3	,	2	,	],
    [	6	,	2.2	,	5	,	1.5	,	2	,	],
    [	6.9	,	3.2	,	5.7	,	2.3	,	2	,	],
    [	5.6	,	2.8	,	4.9	,	2	,	2	,	],
    [	7.7	,	2.8	,	6.7	,	2	,	2	,	],
    [	6.3	,	2.7	,	4.9	,	1.8	,	2	,	],
    [	6.7	,	3.3	,	5.7	,	2.1	,	2	,	],
    [	7.2	,	3.2	,	6	,	1.8	,	2	,	],
    [	6.2	,	2.8	,	4.8	,	1.8	,	2	,	],
    [	6.1	,	3	,	4.9	,	1.8	,	2	,	],
    [	6.4	,	2.8	,	5.6	,	2.1	,	2	,	],
    [	7.2	,	3	,	5.8	,	1.6	,	2	,	],
    [	7.4	,	2.8	,	6.1	,	1.9	,	2	,	],
    [	7.9	,	3.8	,	6.4	,	2	,	2	,	],
    [	6.4	,	2.8	,	5.6	,	2.2	,	2	,	],
    [	6.3	,	2.8	,	5.1	,	1.5	,	2	,	],
    [	6.1	,	2.6	,	5.6	,	1.4	,	2	,	],
    [	7.7	,	3	,	6.1	,	2.3	,	2	,	],
    [	6.3	,	3.4	,	5.6	,	2.4	,	2	,	],
    [	6.4	,	3.1	,	5.5	,	1.8	,	2	,	],
    [	6	,	3	,	4.8	,	1.8	,	2	,	],
    [	6.9	,	3.1	,	5.4	,	2.1	,	2	,	],
    [	6.7	,	3.1	,	5.6	,	2.4	,	2	,	],
    [	6.9	,	3.1	,	5.1	,	2.3	,	2	,	],
    [	5.8	,	2.7	,	5.1	,	1.9	,	2	,	],
    [	6.8	,	3.2	,	5.9	,	2.3	,	2	,	],
    [	6.7	,	3.3	,	5.7	,	2.5	,	2	,	],
    [	6.7	,	3	,	5.2	,	2.3	,	2	,	],
    [	6.3	,	2.5	,	5	,	1.9	,	2	,	],
    [	6.5	,	3	,	5.2	,	2	,	2	,	],
    [	6.2	,	3.4	,	5.4	,	2.3	,	2	,	],
    [	5.9	,	3	,	5.1	,	1.8	,	2	,	],
    
]);// end of iris data




const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 1;

var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;
var numSamples = irisData.shape[0];
var numFeatures = irisData.shape[1];

var predictedClassLabels = nj.zeros(numSamples);
function draw(){
    clear();
    
    if(!trainingCompleted){
        Train();
    }
    Test();
    DrawCircles();
    /*
    if(frameIndex >= 100){
        frameIndex = 0;
        if(frameflip == 0){
            frameflip = 1;
        }else{
            frameflip = 0;
        }
    } 
    for(var i =0; i < oneFrameOfData.shape[0]; i++){
        for(var j =0; j < oneFrameOfData.shape[1]; j++){
            if(frameflip % 2 == 1){
                var StartX = oneFrameOfData.get(i,j,0);
                var StartY = oneFrameOfData.get(i,j,1);
                var StartZ = oneFrameOfData.get(i,j,2);
                
                var EndX = oneFrameOfData.get(i,j,3);
                var EndY = oneFrameOfData.get(i,j,4);
                var EndZ = oneFrameOfData.get(i,j,5);
    
                line(StartX, StartY, EndX, EndY);
            }else{
                var StartX = anotherFrameOfData.get(i,j,0);
            var StartY = anotherFrameOfData.get(i,j,1);
            var StartZ = anotherFrameOfData.get(i,j,2);
            
            var EndX = anotherFrameOfData.get(i,j,3);
            var EndY = anotherFrameOfData.get(i,j,4);
            var EndZ = anotherFrameOfData.get(i,j,5);

            line(StartX, StartY, EndX, EndY);
            }            
        }
    }
    frameIndex++;
*/
}

function Train(){
    //console.log("I am being trained");
    for(var i =1; i < numSamples; i+=2){
        var currentFeatures = irisData.pick(i);
        var currentLabel = currentFeatures.get(currentFeatures.shape -1);
        //console.log(currentFeatures.slice([1]).tolist());
        
        knnClassifier.addExample(currentFeatures.slice([3]).tolist(),currentLabel);
    }

    trainingCompleted = true;
}

function Test(){
    //console.log("I am being test");

    var currentFeatures = irisData.pick(testingSampleIndex);
    var currentLabel = currentFeatures.get(currentFeatures.shape -1);
    var predictedLabel = knnClassifier.classify(currentFeatures.slice([3]).tolist(),GotResults);  
    //console.log("index " + i + ", row " +currentFeatures.toString()+", Predicted " + predictedLabel + ", Current " + currentLabel);  

}

function GotResults(err, result){
    console.log(testingSampleIndex + ": " + result.label);
    predictedClassLabels.set(testingSampleIndex,result.label);

    testingSampleIndex +=2;
    if(testingSampleIndex >= 150){
        testingSampleIndex = 1;
    }
}

function DrawCircles() {
    for(var i =1; i < numSamples; i++){
        
        var x = irisData.get(i,0);
        var y = irisData.get(i,1);

        var c = irisData.get(i,4);
        if(c == 0){
            fill('red');
        }else if (c == 1){
            fill('blue');
        }else{
            fill('green');
        }
        
        if(i % 2 == 0){
            stroke('black');
        }else{
            if(predictedClassLabels.get(i) == 0){
                stroke('red');
            }else if (predictedClassLabels.get(i) == 1){
                stroke('blue');
            }else{
                stroke('green');
            }
        }
        //console.log(predictedClassLabels.tolist());
        circle(x * 100,y * 100,8);
    }
}