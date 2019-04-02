function tempo (entrada, saida){
    var array_entrada = entrada.split(':');
    var array_saida = saida.split(':');

    var horas = Math.abs(parseInt(array_entrada[0])-parseInt(array_saida[0]));
    var minutos = Math.abs(parseInt(array_entrada[1])-parseInt(array_saida[1]));
    var segundos = Math.abs(parseInt(array_entrada[2])-parseInt(array_saida[2]));
    return horas + ":" + minutos  + ":" + segundos;
}
console.log (tempo ("08:00:00", "12:10:20"));