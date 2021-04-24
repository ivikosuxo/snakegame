function GameSlider() {
   GameContainer.call(this);
    var that = this;  
    var sliderWidth = 200;  


    that.bg = new GameImage(loader.getResult("cash_bg"));
    that.bg.regX = 0;
    that.bg.x = -30;
    that.bg.y = -2;
    that.bg.scaleX = 2.3;
    that.addChild(that.bg);    
 

    that.minusButton = new BaseButton("cash_minus");
    that.minusButton.x = -45;
    that.addChild(that.minusButton);

    that.plusButton = new BaseButton("cash_plus");
    that.plusButton.x = 245;
    that.addChild(that.plusButton);

    that.minusButton.on("click", function () {
        that.increaseByKon(-1);
    });
    that.plusButton.on("click", function () {
        that.increaseByKon(1);
    });


    that.shapeBG = new createjs.Shape();
    that.shapeBG.graphics.beginFill("#686667").drawRect(0, -2, sliderWidth, 4); 
    
    that.addChild(that.shapeBG); 


    that.shape = new createjs.Shape();
    that.addChild(that.shape); 

    that.sliderButton = new BaseButton("cash_circle");  
    that.addChild(that.sliderButton);

    that.sliderButton.on("mousedown", function () {
        if (Config.minbet > 0 && game.me.balance > 0) {
            game.slide = that;
        }
    })


    that.slide = function (stageX, stageY) {
        var slide = that.globalToLocal(stageX, 0).x; 
        that.slidePoint(slide, true);
    }

    that.slidePoint = function (slideX, hand) {

        slideX = parseInt(slideX);
        if (slideX < 0) {
            slideX = 0;
        } else if (slideX > sliderWidth) {
            slideX = sliderWidth;
        }

        that.sliderButton.x = slideX;
        that.shape.graphics.clear();
        that.shape.graphics.beginFill(green_color).drawRect(0, -2, slideX, 4); 

        if (hand) { 
         var   amount=  roundToTwo(game.room.maxBalance * (slideX / sliderWidth));

          that.setAmount (amount);
        }
    } 

    that.setStartState = function () { 
            that.slidePoint(sliderWidth/10,false)  
            var  amount = roundToTwo(game.room.maxBalance /10);

            that.setAmount ( amount); 
    }   

    that.increaseByKon = function (coeficient) {
        
        var delta = that.sliderButton.x + sliderWidth * (1 / 100) * coeficient;
        that.slidePoint(delta,false);

        var amount = roundToTwo(parseFloat($("#money-input").val()) + game.room.bet_kon * coeficient);
        amount = Math.min(amount, game.room.maxBalance);
        that.setAmount(amount); 
    }

    that.setAmount = function (amount) {
        $("#money-input").val(parseFloat(amount).toFixed(Config.digit));  
    }

    that.setStartState();
}
GameSlider.prototype = new GameContainer();
GameSlider.prototype.constructor = GameSlider;