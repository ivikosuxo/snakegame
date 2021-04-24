function PlayerTimer(index,sz,delta,hgt)
{
 createjs.Container.call(this);

 this.index = index; 

 this.timer_tween;
 this.timer_pointer;
 this.timer_seconds;

 this.size = sz;
 this.deltaSize = delta;
 this.timerHeight = hgt;

this.y = 15;
this.initialize();
}
 PlayerTimer.prototype = new createjs.Container();
 PlayerTimer.prototype.constructor = PlayerTimer;

 PlayerTimer.prototype.initialize =function()
 {
    
    this.timer_bg = new createjs.Shape();
    this.timer_bg.graphics.beginFill(grey_color).drawRect(0, 0, this.size, this.timerHeight);
    this.timer_bg.x=0;
    this.timer_bg.y=0;
    this.timer_bg.alpha = 0.2;

    this.timer = new createjs.Shape();  
    this.timer.graphics.beginFill(yellow_color).drawRect(0, 0, this.size, this.timerHeight);

    this.timer_text = new createjs.Text("00:00", "20px Arial", "white");
    this.timer_text.alpha = 0;
    this.timer_text.x=-70;
    this.timer_text.y=-9;  


    this.addChild(this.timer_bg);
    this.addChild(this.timer);
    this.addChild(this.timer_text);
 }
 

 
 PlayerTimer.prototype.stop = function( )
 {
     clearTimeout(this.timer_pointer);
     createjs.Tween.removeTweens(this.timer);
  
     this.timer.scaleX=0;
     this.timer_seconds=0; 
     this.timer_text.text= getTimeString(0);
   
 }


 PlayerTimer.prototype.start = function (full_timer,timer_size,timer_color)
 {
   var that= this;
   this.stop();
   
   this.timer_seconds= timer_size;
   this.timer.graphics.clear();
    this.timer.graphics.beginFill(timer_color).drawRect(0, 0, this.size*(timer_size/full_timer), this.timerHeight+2);
    this.timer_text.text= getTimeString( this.timer_seconds);
   this.timer_pointer = setTimeout(function(){
               that.nextSecond();
            },1000);
   this.timer.scaleX=1.0;
   this.timer_tween = createjs.Tween.get( this.timer)
        .to({scaleX:0},(timer_size*1000));


    this.visible=true;            
    
 }

  PlayerTimer.prototype.nextSecond = function()
 {
    var that= this;
    this.timer_seconds--;
     clearTimeout(this.timer_pointer);

     if (this.index ==0 && this.timer_seconds==5) {
         //playSound("turn"); Todo add sound
     }
    if (this.timer_seconds>0) 
    {
            this.timer_pointer = setTimeout(function(){
               that.nextSecond();

            },1000);
    }if (this.timer_seconds>0) {
        this.timer_text.text= getTimeString( this.timer_seconds);       
    } else {

        this.stop(true);
        try {
            this.parent.timeOut();
        } catch (ex)
        {
            console.log("timeOut exception");
        }
       
      }
    
 }
  PlayerTimer.prototype.getSeconds = function()
  {

   return this.timer_seconds;
  }

 function getTimeString(time)
 {
    var decimal=  parseInt(time/60);
    var unit =  time%60;

    if (decimal<10) {
        decimal="0"+decimal;
     }
     if (unit<10) {
        unit="0"+unit;
     }
 
    return  decimal+":"+unit;
 }

