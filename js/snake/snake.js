class Snake extends GameContainer {
    constructor(size, count){
        super();
        this.size = size;
        this.count = count;
        this.width = 300;
        this.height = 300;
        this.shapes =[];

        this.vx =1;
        this.vy=0;

        this.DrawSnake();        
    }
 }
 
 Snake.prototype.MoveSnake=function(nextPt){
   var tail = this.shapes.shift(); 

   tail.setPosition(nextPt.x,nextPt.y);   

   this.shapes.push(tail);
}

Snake.prototype.ChangeDir=function(dirX,dirY){
    this.vx = dirX;
    this.vy = dirY
}

Snake.prototype.GetNextPosition =function(){

    var head = this.shapes[this.shapes.length-1];

   var pt ={};
   pt.x= head.location.x+this.vx;
   pt.y=  head.location.y+this.vy; 
    
    return pt;
}

 Snake.prototype.DrawSnake=function(){
      
     for(var i = 0 ; i < this.count; i++){
        
        var body = new SnakeSquare();
        body.Draw(this.size,"yellow");
        body.setPosition(i,0); 

        this.addChild(body);
        this.shapes.push(body);
     }
 }


 class SnakeSquare extends GameContainer {
    constructor(){
        super();
        this.location={}; 
        this.color;
    }
}

 SnakeSquare.prototype.Draw=function(size,color){
        this.size = size;
        this.color = color;
        var shape  = new createjs.Shape();
        shape.graphics.beginFill(color).drawRect(0, 0, this.size,this.size);
        this.addChild(shape)
  }

  Snake.prototype.CheckInteraction=function(bonus){
    var tail = this.shapes[0]; 
     
    var head = this.shapes[this.shapes.length-1];
    if(head.isSamePosition(bonus.location)){
     
      var newTail = tail.Copy();
   
      this.addChild(newTail);
      this.shapes.unshift(newTail);

      return true;
    }

    return false;
 }

 SnakeSquare.prototype.isSamePosition=function(pt){

   return this.location.x ==pt.x && this.location.y ==pt.y;
 }

 SnakeSquare.prototype.Copy=function(){
   var square = new SnakeSquare();
   square.Draw(this.size,this.color);
   square.setPosition(this.location.x,this.location.y);

   return square;
 }
 
 SnakeSquare.prototype.setPosition=function(x,y){
    this.location.x =x;
    this.location.y= y;

    this.x = this.size*x;
    this.y = this.size*y;
 }

 SnakeSquare.prototype.SetRandomLocation=function(maxX,maxY){
  
  var y =   Math.floor(Math.random() * maxY); 
  var x =   Math.floor(Math.random() * maxX);  
  this.setPosition(x,y);
}