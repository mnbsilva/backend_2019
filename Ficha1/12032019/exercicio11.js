
function max(array){
    var  m=array[0];
    for (var i=0; i<array.length; i++){
        if(array[i]>m){
            m=array[i];
        }
    }
    return m;
}

function min(array){
    var  n=array[0];
    for (var i=0; i<array.length; i++){
        if(array[i]<n){
            n=array[i];
        }
    }
    return n;
}

function med(array){
    var  o=0;
    for (var i=0; i<array.length; i++){
        o=array[i]+o;
        }
    return o / array.length;
}



var m=max([2,5,6,7]);
console.log(m);

var n=min([2,5,6,7]);
console.log(n);

var o=med([2,5,6,7]);
console.log(m);