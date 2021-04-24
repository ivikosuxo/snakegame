class SocketManager {
    constructor(eventEmitter) {
        this.uri = "ws://" + window.location.host + "/ws?token=383eaaa9-c541-46e5-a205-dc6d97892aee";
        this.socket = null;
        this.emitter = eventEmitter; 
        this.emitter.on("send", this.send);
    }
}

SocketManager.prototype.connect = function () {
    var me = this;

    this.socket = new WebSocket(this.uri);

    this.socket.onopen = function (event) {
        me.emitter.emit("connect", event);
    };

    this.socket.onclose = function(event) {
        console.log(event);
        me.emitter.emit("disconnect", event);
    };

    this.socket.onmessage = function (event) {

        var data = JSON.parse(event.data);
        console.log(data);
        me.emitter.emit(data.command, data.data);
    };

    this.socket.onerror = function (event) {
        console.log("error: " + event.data);
    };
}

SocketManager.prototype.send = function (message) {

    var textMessage = JSON.stringify(message);

    this.socket.send(textMessage);
}