var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;


Leap.loop(controllerOptions, function(frame)
{
    clear();
    var cir = circle(x,y,50);
    //adds -1 or 0 or 1 to x
    x += Math.floor(Math.random() * 3) -1;
    y += Math.floor(Math.random() * 3) -1;
}
);