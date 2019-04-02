function desenhaRetangulo(altura) {
    var line = '';
    for (let i = 0; i < altura; i++) {
            line = line + '*';
        console.log(line);
    }
}


desenhaRetangulo(5, 5);
