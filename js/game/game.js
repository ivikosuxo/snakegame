class Game {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.soundManager = new SoundManager(eventEmitter);
        this.socketManager = new SocketManager(eventEmitter);       
        this.mobile = false;
        this.RegisterEvents();
    }
}

Game.prototype.RegisterEvents = function () {  
    var me = this;
    this.eventEmitter.on("load_complete", function(evt){me.handleComplete(evt);});
}

Game.prototype.handleComplete = function (evt) {
    this.board = new Board(this.eventEmitter);
    app.stage.addChild(this.board);

    this.eventEmitter.emit("window_resize",{});
    this.board.StartGame();
    $('canvas').css('background-color', "#21232e");
}