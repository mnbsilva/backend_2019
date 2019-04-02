function inverte(frase){
    var frase_invertida=frase.split(" ");
    var output='';
    for (i=0; i<frase_invertida.length; i++){
        for (j=frase_invertida[i].length-1; j>=0; j--){
            output+=frase_invertida[i][j];
        }
        output+=" ";
    }
    return output;
}
console.log(inverte("hoje e domingo"));