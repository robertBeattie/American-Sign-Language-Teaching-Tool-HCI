oneFrameOfData = nj.array([[[0.63562,0.23947, 1,0.63562,0.23947, 1],
    [0.63562,0.23947, 1,0.50139,0.36941, 1],
    [0.50139,0.36941, 1,0.40402,0.45585, 1],
    [0.40402,0.45585, 1,0.33871,0.51585, 1]],
   [[0.66436,0.3229, 1,0.59239,0.53631, 1],
    [0.59239,0.53631, 1,0.53856,0.67003,0.97548],
    [0.53856,0.67003,0.97548,0.50846,0.74089,0.87642],
    [0.50846,0.74089,0.87642,0.48736,0.78822,0.80156]],
   [[0.71184,0.33963, 1,0.68219,0.5479, 1],
    [0.68219,0.5479, 1,0.68877,0.69589,0.93462],
    [0.68877,0.69589,0.93462,0.69108,0.77439,0.79771],
    [0.69108,0.77439,0.79771,0.69175,0.82109,0.70033]],
   [[0.76136,0.34414, 1,0.77345,0.53233, 1],
    [0.77345,0.53233, 1,0.7442,0.47157,0.8902],
    [0.7442,0.47157,0.8902,0.72259,0.36127,0.86568],
    [0.72259,0.36127,0.86568,0.71301,0.2911,0.91181]],
   [[0.81093,0.3224, 1,0.85508,0.50035, 1],
    [0.85508,0.50035, 1,0.81827,0.45857,0.95038],
    [0.81827,0.45857,0.95038,0.78644,0.38578,0.93414],
    [0.78644,0.38578,0.93414,0.76444,0.32397,0.97561]]]);

anotherFrameOfData = nj.array([[[0.5797,0.12838, 1,0.5797,0.12838, 1],
    [0.5797,0.12838, 1,0.56584,0.25904, 1],
    [0.56584,0.25904, 1,0.5913,0.33351,0.92283],
    [0.5913,0.33351,0.92283,0.63284,0.36795,0.81624]],
   [[0.61422,0.19567, 1,0.5199,0.4158, 1],
    [0.5199,0.4158, 1,0.47343,0.55818, 1],
    [0.47343,0.55818, 1,0.44538,0.63287, 1],
    [0.44538,0.63287, 1,0.4247,0.68162,0.95595]],
   [[0.65581,0.21135, 1,0.59976,0.42627, 1],
    [0.59976,0.42627, 1,0.57556,0.59158, 1],
    [0.57556,0.59158, 1,0.55677,0.68293,0.96495],
    [0.55677,0.68293,0.96495,0.54201,0.73888,0.90501]],
   [[0.69802,0.21707, 1,0.68167,0.41152, 1],
    [0.68167,0.41152, 1,0.68603,0.56079, 1],
    [0.68603,0.56079, 1,0.68194,0.64456,0.91877],
    [0.68194,0.64456,0.91877,0.67539,0.69454,0.84458]],
   [[0.73714,0.2019, 1,0.75287,0.38388, 1],
    [0.75287,0.38388, 1,0.79489,0.48629,0.98081],
    [0.79489,0.48629,0.98081,0.8103,0.53634,0.90249],
    [0.8103,0.53634,0.90249,0.81771,0.57413,0.82244]]]);

var frameIndex = 0;
var frameflip = 0;

function draw(){
    clear();
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
                [StartX,StartY] = TransformCoordinates(StartX,StartY);

                var EndX = oneFrameOfData.get(i,j,3);
                var EndY = oneFrameOfData.get(i,j,4);
                var EndZ = oneFrameOfData.get(i,j,5);
                [EndX,EndY] = TransformCoordinates(EndX,EndY);

                line(StartX, StartY, EndX, EndY);
            }else{
                var StartX = anotherFrameOfData.get(i,j,0);
                var StartY = anotherFrameOfData.get(i,j,1);
                var StartZ = anotherFrameOfData.get(i,j,2);
                [StartX,StartY] = TransformCoordinates(StartX,StartY);

                var EndX = anotherFrameOfData.get(i,j,3);
                var EndY = anotherFrameOfData.get(i,j,4);
                var EndZ = anotherFrameOfData.get(i,j,5);
                [EndX,EndY] = TransformCoordinates(EndX,EndY);

            line(StartX, StartY, EndX, EndY);
            }            
        }
    }
    frameIndex++;
}

function TransformCoordinates (x,y){
    // Convert the normalized coordinates to span the canvas
    x = window.innerWidth * x;
    y = window.innerHeight * (1- y);

    return[x,y];
}