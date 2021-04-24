var canv;
var game;
var app;
var eventEmitter = new EventEmitter();

function ready() {
    game = new Game(eventEmitter);
    app = new ApplicationManager(eventEmitter);
    app.initialize("main-board");

    setInterval(function () { window.scrollTo(0, 1); }, 1000)
}

$(document).ready(
    function (evt) {
        ready();
    }
);

$(window).resize(
    function (evt) {
        eventEmitter.emit("window_resize", evt);
    });  

    $(window).keydown(
        function (evt) {
            eventEmitter.emit("key_down", evt);
        });  
    
    document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}