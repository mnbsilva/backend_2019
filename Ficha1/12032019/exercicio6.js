var meses = [0, "Janeiro", "Fevereiro", "Março", "Abril",
"Maio", "Junho", "Julho", "Agosto",
"Setembro", "Outubro", "Novembro", "Dezembro"];

function mes(mesN){
    if (mesN <1 || mesN >12){
        return("mes incorreto");
    }
    else{
        return (meses[mesN]);
    }
}

var m = meses[mesN];
console.log(m);