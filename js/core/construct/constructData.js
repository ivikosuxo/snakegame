var development = {}; 

function setDevelopment(container,text,image) { 
    development.text = text;
    development.container = container;
    development.image = image; 
}

setDevelopment(false,false,false);

function GetArrayLocation(array)
{
    var data = {};
    data.arrayX = [];
    data.arrayY = [];

    array.forEach(function (dealer) {
        data.arrayX.push( roundToTwo(dealer.x));
        data.arrayY.push(roundToTwo(dealer.y));
    });

    return data;
}


function dragGameObject(x, y) { 
 
    var pt = this.parent.globalToLocal(x, y);
    this.x = pt.x + this.dragX;
    this.y = pt.y + this.dragY;

}

function mouseUpGameObject(that) {
   

    setTimeout(function(){
       that._listeners.click = that.clickArray; 
    }, 300)


    
    if (that.arrow) {
        that.arrow.visible = false;
        that.arrow1.visible = false;
    }
}


function mousesDownStarted(evt,type) {
    if (development[type] && !game.drag) { 
        checkClickEvetListener(this); 
        ///this.removeAllEventListeners();
        //this.addConstructorListener(this);
        var pt = this.parent.globalToLocal(evt.stageX, evt.stageY);
        this.dragX = this.x - pt.x;
        this.dragY = this.y - pt.y;
        game.drag = this;
    }
}

function addConstructorListener(that) {  
    that.on("mousedown", function (evt) {
        that.mouseDown(evt, that.type);
    });  
}

function checkClickEvetListener(that) {

    try {

        that.clickArray = that._listeners.click;
        if (!that.clickArray) {
            that.clickArray = [];
        }
        that._listeners.click = [];
    } catch (exception)
    {
      //  console.log(exception)
    }
   
}