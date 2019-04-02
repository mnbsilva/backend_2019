function numeroVogais (frase){
    var total = 0;
    for (i=0; i<frase.length; i++){
        if (frase[i] =='a' || frase[i] =='e' || frase[i] =='i' || frase[i] =='o' || frase[i] =='u'){
            total+=1;
        }
    }
    return total;
}

console.log(numeroVogais("isto e frase"))