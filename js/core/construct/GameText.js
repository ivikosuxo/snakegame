class GameText extends createjs.Text
{  
    initialize(that) {  
        that.arrow1 = {};
        that.arrow2= {};
        addConstructorListener(that);
    }  

    drag(mouseX, mouseY)
    {
        var pt = this.parent.globalToLocal(mouseX, mouseY);
        this.x = pt.x + this.dragX;
        this.y = pt.y + this.dragY;
    }

    mouseUp() {
        //console.log(this.x, this.y);
    }
     

    constructor(text, font, color) {
        super(text, font, color);
        this.type = "text";
        this.textAlign = "center";
        this.textBaseline = "middle"
        this.dragX = 0;
        this.dragY = 0; 
        this.initialize(this);
    };  
} 


GameText.prototype.addConstructorListener = addConstructorListener; 
GameText.prototype.drag = dragGameObject; 
GameText.prototype.mouseUp = mouseUpGameObject; 
GameText.prototype.mouseDown = mousesDownStarted;


class GameTopText extends createjs.Text {


    initialize(that) { 
        addConstructorListener(that);
    }

    drag(mouseX, mouseY) {
        var pt = this.parent.globalToLocal(mouseX, mouseY);
        this.x = pt.x + this.dragX;
        this.y = pt.y + this.dragY;
    }

    mouseUp() {
       // console.log(this.x, this.y);
    }


    constructor(text, font, color) {
        super(text, font, color);
        this.type = "text";
        this.textAlign = "center"; 
        this.dragX = 0;
        this.dragY = 0;
        this.initialize(this);
    };
}


GameTopText.prototype.addConstructorListener = addConstructorListener;
GameTopText.prototype.drag = dragGameObject;
GameTopText.prototype.mouseUp = mouseUpGameObject;
GameTopText.prototype.mouseDown = mousesDownStarted;