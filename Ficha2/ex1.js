function imc(peso, altura){
    valor=peso/((altura)*(altura));
    console.log (valor);
        if (valor <= 18.5){
            console.log("Abaixo do Peso");
        }
        if (valor >= 18.5 && valor <= 25){
            console.log("No peso Normal");
        }
        if (valor >= 25 && valor <= 30){
            console.log("Acima do peso");
        }
        if (valor > 30){
            console.log("OBESO!");   
        }
}
imc(75,1.75);