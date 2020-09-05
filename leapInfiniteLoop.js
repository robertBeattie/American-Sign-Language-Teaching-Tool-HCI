var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var z = 0;

var rawXMin = -250;
var rawXMax = 250;

var rawYMin = 25;
var rawYMax = 300;

Leap.loop(controllerOptions, function(frame)
{ 
    clear();
     
    HandleFrame(frame);  
});

function HandleFrame(frame){
   if(frame.hands.length === 1){
    var hand = frame.hands[0];
    HandleHand(hand);    
    }
}
function HandleHand(hand){
        var fingers = hand.fingers;
        fingers.forEach( finger => {
            HandleFinger(finger);
        });     
}
function HandleFinger(finger){
    //checks if finger id {0-4} ends in 1 if so its an index finger
        if(finger.id % 10 === 1){
           x = finger.tipPosition[0];  
           y = finger.tipPosition[1];  
           z = finger.tipPosition[2]; 

           //check bounds
           if(x > rawXMax){ x = rawXMax;}
           if(x < rawXMin){ x = rawXMin;}
           x = Scale(x, rawXMin, rawXMax, 0, window.innerWidth);
           if(y > rawYMax){ y = rawYMax;}
           if(y < rawYMin){ y = rawYMin;}
           y = Scale(y, rawYMin, rawYMax, 0, window.innerHeight);

           console.log(x + "," + y);
           var cir = circle(x,-y + innerHeight,50);   

        }
}

function Scale (OldValue, OldMin, OldMax, NewMin, NewMax){
    return((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
}