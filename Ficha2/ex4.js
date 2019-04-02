
function fraseLetra (frase, letra){
    var total = 0;
    for (i=0; i<frase.length; i++){
        if (frase[i] == letra){
            total+=1;
        }
    }
    return total;
}

console.log(fraseLetra("isto e frase", "e"));