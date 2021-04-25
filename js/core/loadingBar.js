function LoadingBar(eventEmitter) {
    createjs.Container.call(this);

    this.emitter = eventEmitter;
    var that = this;
    var me = this;

    this.background = new createjs.Shape();
    this.background.graphics.beginFill("#21232e").drawRect(0, 0, 10, 10);
    this.background.x = 0;
    this.background.y = 0;
    this.addChild(this.background);


    var centerContainer = new createjs.Container();
    this.centerContainer = centerContainer;
    this.addChild(centerContainer);

    this.gameText = new createjs.Text("snake", "25px ExtraSquare", "white");
    this.gameText.textAlign = "center";
    this.gameText.textBaseline = "middle";
    this.gameText.x = 2;
    this.gameText.y = -45;
    centerContainer.addChild(this.gameText);

    this.timer = new LoaderLine();
    centerContainer.addChild(this.timer);


    this.loading = function (evt) {
        this.timer.loader(evt.progress * 100);
    }

    this.resizeContainer = function (scale) {
         this.scaleX = this.scaleY = scale;
      
         this.centerContainer.x=0;
         this.centerContainer.y=0; 

        var pt =  this.centerContainer.globalToLocal(window.innerWidth, window.innerHeight);
         
        centerContainer.x = pt.x/2;
        centerContainer.y = pt.y/2;
        this.background.scaleX=  pt.x/10;
        this.background.scaleY=  pt.y/10;
    }

    this.emitter.on("progress", function (evt) { me.loading(evt) });
    this.emitter.on("canvas_resize", function (evt) { me.resizeContainer(evt) });

    this.resizeContainer(app.scale);
}
LoadingBar.prototype = new createjs.Container;
LoadingBar.prototype.constructor = LoadingBar


function LoaderLine() {
    createjs.Container.call(this);
     
    this.timerBg = new createjs.Shape();
    this.timerBg.x = 0;
    this.timerBg.y = 0;
    this.addChild(this.timerBg);

    this.timerBg.graphics.beginFill("#5c6180").drawRect(-150, -2, 300, 4);

    this.timer = new createjs.Shape();
    this.timer.x = 0;
    this.timer.y = 0;
    this.addChild(this.timer);

    this.loader = function (percent) {
        if (percent < 8) {
            percent = 8;
        }

        this.timer.graphics.beginFill("#ffb400").drawRect(-150, -2, (3 * percent), 4);
    }
}
LoaderLine.prototype = new createjs.Container;
LoaderLine.prototype.constructor = LoaderLine;