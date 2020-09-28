var frameIndex = 0;
var frameflip = 0;
var trainingCompleted = false;
function draw(){
    clear();
    if(!trainingCompleted){
        Train();
    }

    Test();
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
}

function Train(){
    console.log("I am being trained");
    trainingCompleted = true;
}

function Test(){
    console.log("I am being test");
}