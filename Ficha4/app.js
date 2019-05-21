var obj = {
    name: "Marco", 
    age: "50", 
    gender:"Male",
};
var objstr = JSON.stringify(obj);
console.log (objstr);

var obj2 = JSON.parse(objstr);
console.log (obj2.name);
console.log (obj2.gender);


//alinea-5
//Emitter

var Emitter = require("./emmiter");

//var eventConstants = require('./constants');
var emtr = new Emitter();

emtr.on ('start', function(){
    console.log ("A file was saved 1");
});

emtr.on ('greet', function(){
    console.log ("A file was saved 2");
});

// invocar todas as funções que foram adicionadas com o tipo greet
//emtr.emit(eventConstants.GREET);
emtr.emit('start');
emtr.emit('greet');