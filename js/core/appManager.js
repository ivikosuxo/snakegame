class ApplicationManager {

    constructor(eventEmitter) {
        this.emitter = eventEmitter;
        this.imageLoaded = false;
        this.soundLoaded = true;
        this.soundCount = 0;
        this.queueCount = 2;
        this.update = true;
        this.addEventListeners();
        this.scale = 1;
    }
}

ApplicationManager.prototype.initialize = function (canvas) {

    var me = this;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.mobile = true;
    }

    this.canv = new createjs.Stage(canvas);

    createjs.Ticker.addEventListener("tick", function (evt) {
        me.tick(evt);
    });

    createjs.Ticker.setFPS(60);

    createjs.Touch.enable(this.canv);
    this.canv.enableMouseOver(10);
    this.canv.mouseMoveOutside = true

    this.stage = new createjs.Container();
    this.canv.addChild(this.stage);
    this.stage.visible = false;

    this.loadingBar = new LoadingBar(this.emitter);
    this.canv.addChild(this.loadingBar);

    this.resizeListener();
    this.startLoading()
}

ApplicationManager.prototype.startLoading = function () {

    var me = this;

    this.loader = new createjs.LoadQueue(false);

    this.loader.on("progress", function (evt) {
        eventEmitter.emit("progress", evt);
    });

    this.loader.setMaxConnections(8);
    this.loader.addEventListener("complete", function (evt) { me.QueueLoad(evt); });
    this.loader.loadManifest(manifest, true, "../images/");

    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
    createjs.Sound.alternateExtensions = ["mp3"];
    var preload = new createjs.LoadQueue(false);

    preload.installPlugin(createjs.Sound);
    preload.on("complete", function (evt) { me.QueueLoad(evt); });
    preload.setMaxConnections(3);
    preload.loadManifest(soundManifest, true, "../sounds/");
};

ApplicationManager.prototype.QueueLoad = function (evt) {
    this.queueCount--;
    if (this.queueCount == 0) {
        this.emitter.emit("load_complete", {});
        this.addEvents();
        this.stage.visible = true;
        this.loadingBar.visible = false;
    }
}

ApplicationManager.prototype.addEvents = function () {
    var that = this;
    that.canv.on("stagemousemove", function (evt) {
        that.emitter.emit("mouse_move", evt);
    });

    that.canv.on("stagemousedown", function (evt) {
        that.emitter.emit("mouse_down", evt);
    });

    that.canv.on("stagemouseup", function (evt) {
        that.emitter.emit("mouse_up", evt);
    });
};

ApplicationManager.prototype.addEventListeners = function () {
    var me = this;
    this.emitter.on("window_resize", function myfunction(evt) {
        me.resizeListener(evt);
    });
}

ApplicationManager.prototype.resizeListener = function (evt) {
    var canvas = document.getElementById("main-board");
    var height = 1080;
    var width = 1920;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    this.canv.scaleX = window.devicePixelRatio;
    this.canv.scaleY = window.devicePixelRatio;

    this.scale = (window.innerHeight / height) / window.devicePixelRatio;

    this.stage.scaleX = this.stage.scaleY = this. scale;
    
    this.emitter.emit("canvas_resize", this.scale);
}

ApplicationManager.prototype.tick = function (evt) {
    if (this.update) {
        this.canv.update(evt);
    }
}

ApplicationManager.prototype.stop = function (evt) {
    createjs.Ticker.removeEventListener("tick", this.tick);
}