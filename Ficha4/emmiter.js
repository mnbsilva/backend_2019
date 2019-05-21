function Emitter() {
    this.events = {};
}

//adicionar eventos
Emitter.prototype.on = function (event_name, listener) {
    if (this.events[event_name] == undefined) {
        this.events[event_name] = [];
    }
    this.events[event_name].push(listener);
}

// for (var i=0; i<Array.length; i++){
//     array[i]();
// }

Emitter.prototype.emit = function (event_name) {
    if (this.events[event_name] != undefined) {
        this.events[event_name].forEach(function (listener) {
            listener();
        });
    }
}

module.exports = Emitter;



