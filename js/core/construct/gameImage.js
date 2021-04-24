class GameImage extends createjs.Bitmap {
     
    initialize(that) {
        that.arrow1 = {};
        that.arrow2 = {};
        addConstructorListener(that);
    }

    drag(mouseX, mouseY) {
        var pt = this.parent.globalToLocal(mouseX, mouseY);
        this.x = pt.x + this.dragX;
        this.y = pt.y + this.dragY;
    }

    mouseUp() {
        //console.log(this.x, this.y);
    }


    constructor(image) {
        super(image);
        this.type = "image";
        this.dragX = 0;
        this.dragY = 0;
        this.initialize(this);
        if (image) {
            this.regX = image.width / 2;
            this.regY = image.height / 2;
        }
    };
} 

GameImage.prototype.addConstructorListener = addConstructorListener;
GameImage.prototype.drag = dragGameObject; 
GameImage.prototype.mouseUp = mouseUpGameObject; 
GameImage.prototype.mouseDown = mousesDownStarted;