class SoundManager {

    constructor(eventEmitter) {
        this.mute = false;
        this.volume = 100;
        this.emitter = eventEmitter;
        this.addListeners();
    }
}

SoundManager.prototype.addListeners = function () {
    var me = this;

    this.emitter.on("play_sound", function (evt) {
        me.playsound(evt);
    });

    this.emitter.on("mute", function (evt) {
        me.muteSound(evt);
    });
}

SoundManager.prototype.muteSound = function (mute) {
    this.mute = mute;
}

SoundManager.prototype.playsound = function (name) {
    try {
        if (!this.mute) {
            createjs.Sound.play(name);
        }
    } catch (ex) {
        console.log(ex);
    }
}