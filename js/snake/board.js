class Board extends GameContainer {
   constructor(eventEmitter){
       super();
       
       this.squareSize = 50;
       this.borders ={};
       this.width = 900;
       this.height = 600;
   
       this.emitter= eventEmitter;
       this.points =[];
       this.point ={}
       this.DrawBoard();
       this.DrawMatrix();
       this.DrawPoints();
       this.DrawSnake();
       this.EventListen();
   }
}
 
Board.prototype.StartGame=function(){
  var me= this;

  setInterval(function(){me.Tick()},200)
}

Board.prototype.EventListen=function(){
   var me = this;
    this.emitter.on("canvas_resize",function(evt){
        me.Resize(evt);
    }); 

    this.emitter.on("key_down",function(evt){
        me.KeyDown(evt);
    }); 
}

Board.prototype.KeyDown=function(e){
    if (e.keyCode == '38') {
        this.snake.ChangeDir(0,-1);
    }
    else if (e.keyCode == '40') {
        this.snake.ChangeDir(0,1);
    }
    else if (e.keyCode == '37') {
        this.snake.ChangeDir(-1,0);
    }
    else if (e.keyCode == '39') {
        this.snake.ChangeDir(1,0);
    }
}

Board.prototype.Tick=function(){
  var location = this.CheckBorders();
  this.CheckInteraction();
  this.snake.MoveSnake(location);
}

Board.prototype.CheckBorders=function(){
  var location = this.snake.GetNextPosition();

  if(location.x>=this.borders.width){
    location.x=0; 
  }

  if(location.x<0){
    location.x=this.borders.width-1; 
  }

  if(location.y<0){
    location.y=this.borders.height-1; 
  }

  if(location.y>=this.borders.height){
    location.y=0; 
  }

  return location;
}

Board.prototype.DrawMatrix=function(){
    var verticalCount = this.width/this.squareSize;
    var horizontalCount = this.height/this.squareSize;

    this.borders.width = verticalCount;
    this.borders.height = horizontalCount;

  for(var i = 1;i<verticalCount;i++){
    var startX = this.squareSize*i;
    this.drawLine(startX,0,startX,this.height,"#ffffff");
  }

  for(var i = 1;i<horizontalCount;i++){
    var startY= this.squareSize*i;
    this.drawLine(0,startY,this.width,startY,"#ffffff");
  }
 } 

Board.prototype.Resize = function(scale){ 
    this.x=0;
    this.y=0; 
     
    var pt =  this.globalToLocal(window.innerWidth, window.innerHeight);   
    console.log(pt);

   this.x=pt.x/2-this.width/2;
   this.y=pt.y/2-this.height/2;
}

Board.prototype.DrawSnake=function(){
    this.snake = new Snake(this.squareSize,4);
    this.addChild(this.snake);
  }
 
Board.prototype.CheckInteraction = function(){
  for(var i = this.points.length-1; i>=0 ; i--){
     var bonus = this.points[i];
     if(this.snake.CheckInteraction(this.points[i])){
        //this.points.splice(i,1);
       // this.removeChild(bonus);
        this.emitter.emit("play_sound","bet")
        this.point.SetRandomLocation( this.borders.width, this.borders.height); 
     }
  }
}

Board.prototype.DrawPoints=function(){
   this.point = new SnakeSquare();
    this.addChild(this.point);
    this.points.push(this.point);
    this.point.Draw(this.squareSize,"blue");
    this.point.SetRandomLocation( this.borders.width, this.borders.height); 
}


Board.prototype.DrawBoard=function(){
    this.background = new createjs.Shape();
    this.background.graphics.beginFill("#6666ff").drawRect(0,0, this.width, this.height);
    this.addChild(this.background); 
}