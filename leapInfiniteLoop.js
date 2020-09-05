var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var z = 0;

var rawXMin = 100;
var rawXMax = 0;

var rawYMin = 100;
var rawYMax = 0;

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

           console.log(finger);
           var cir = circle(x + window.innerWidth / 2,-y *2+ window.innerHeight ,50);   
        }
}