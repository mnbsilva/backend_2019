var arrayutils = require('./ArrayUtils.js');

function started (){
    console.log('Started Download');
}
function update(){
    for (i=0; i<=100; i++)
    console.log (i + '% of Download');
    
}
function complete(){
    console.log ('Download Complete');
   
}

function performDownload(started, update, complete){
    started();
    update();
    complete();
}

performDownload(started, update, complete);


// alinea 4
var array = [1,2,3,4,5];
var array1 = [1,2,3,4,5];
var array2 = [1,2,3,4];

var isEmpty = arrayutils.isEmpty(array);
console.log(isEmpty);
var max = arrayutils.max(array);
console.log(max);
var min = arrayutils.min(array);
console.log(min);
var average = arrayutils.average(array);
console.log(average);
var  indexOf = arrayutils. indexOf(array, 1);
console.log(indexOf);
// var  subArray = arrayutils. subArray(array,3 ,4);
// console.log(subArray);
var  isSameLength = arrayutils. isSameLength(array1,array2);
console.log(isSameLength);
// var  reverseArray = arrayutils. reverseArray(array);
// console.log(reverseArray);

subArray
// incompleto


