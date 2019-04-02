function operacaoArit(num1, num2, operador) {
    var resultado = 0;
    if (operador == "+") {
        resultado = num1 + num2;
    } else if(operador =="-"){
        resultado = num1 - num2;
    } else if(operador =="/"){
        resultado = num1 / num2;
    } else if(operador =="*")
        resultado = num1 * num2;
    return resultado;
}

var r = operacaoArit(9, 1, "*");
console.log(r);
