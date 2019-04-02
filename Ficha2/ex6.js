function desenhaRetangulo(altura, largura) {
    var line = '';
    for (let i = 0; i < altura; i++) {
        for (let i = 0; i < largura; i++) {
            line = line + '*';
        }
        console.log(line);
        line='';
    }
}


desenhaRetangulo(30, 30);