class GameContainer extends createjs.Container{   

    constructor(){
        super();
        this.dragX = 0;
        this.dragY = 0;
        this.type = "container";
    }   
}

GameContainer.prototype.drawLine = function (startX, startY, endX, endY, color) {
 
    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(1);
    line.graphics.beginStroke(color);
    line.graphics.moveTo(startX, startY);
    startY++;
    line.graphics.lineTo(endX, endY);
    line.graphics.endStroke();
    this.addChild(line)

    return line; 
}

GameContainer.prototype.initializeConstructor = function (that) {  
    that.arrow = this.drawLine(-600, 0, 2000, 0, red_color);
    that.arrow1 = this.drawLine(0, -600, 0, 2000, yellow_color);      

    that.arrow1.visible = false;
    that.arrow.visible = false; 
}