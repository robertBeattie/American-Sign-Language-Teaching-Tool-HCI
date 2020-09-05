var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var z = 0;


Leap.loop(controllerOptions, function(frame)
{
    
    clear();
    /*
    var cir = circle(x,y,50);
    //adds -1 or 0 or 1 to x
    x += Math.floor(Math.random() * 3) -1;
    y += Math.floor(Math.random() * 3) -1;
    */
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
           x = finger.tipPosition.x;  
           y = finger.tipPosition.y;  
           z = finger.tipPosition.z;  
        }
}