// IMPORTAÇÕES
const express       = require('express');
const fs            = require('fs');
const bodyParser    = require('body-parser');
const uuid          = require('uuid/v1');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// [PARTE A] ↓↓↓↓
// a. Listar todas as fotografias existentes no ficheiro JSON e devolver na resposta.
app.get('/galeria', function (req, res) {
    var obj_fotos = JSON.parse(readFile('./photos.json')); 
    res.send(obj_fotos);
});

// b. Adicionar uma nova imagem e atualizar o ficheiro (gravando o mesmo). O ID terá que ser um
// Universally Unique IDentifier (UUID) gerado de forma aleatória com a ajuda do módulo
// “'uuid/v1'”, pode ser necessário instalar o package. Deverá ser enviada uma mensagem de
// sucesso indicando que a fotografia foi adicionada.
app.post('/galeria/add', function(req, res) {
    var file = JSON.parse(readFile('./photos.json')); // ficheiro JSON -> object
    var body = req.body;//objeto introduzido pelo utilizador atraves do body
    var body_key = Object.keys(body); // obter o nome da chave do objeto



    body[body_key].id = uuid();
    file[body_key] = body[body_key];
    writeFile('./photos.json', JSON.stringify(file));
    res.send("Sucesso!");
});

// c. Selecionar todas as fotografias de um determinado uploader e devolver essa lista na resposta.
app.get('/galeria/:up', function(req, res) {
    var file = JSON.parse(readFile('./photos.json')); // ficheiro JSON -> object
    var file_size = Object.keys(file).length;
    var uploader = req.params.up; // uploader do utilizador
    var output = {};

    for (i = 1; i <= file_size; i++) {
        if (file['foto_'+i].uploader == uploader) { // Compara o uploader
            output['foto_'+i] = file['foto_'+i]; // coloca a foto dentro do objecto vazio para asseguir enviar como resposta
        };
    };
    if (objectSize(output) != 0) { // Verifica o tamanho do objeto através de uma função
        res.send(output);
    } else {
        res.send("Este Utilizador não submeteu fotografias.");
    }
});

// d. Incrementar o número de likes e atualizar o ficheiro. Devolver entrada atualizada na resposta. (2
// valores)
app.get('/galeria/like/:numero_da_fotografia/:numero_de_likes', function(req, res){
    var file = JSON.parse(readFile('./photos.json')); // ficheiro JSON -> object
    var n_fotografia = req.params.numero_da_fotografia; // numero da fotografia que se pretender escolher
    var foto_likes = req.params.numero_de_likes;        // Likes para incrementar

    file['foto_' + n_fotografia].likes = parseInt(file['foto_' + n_fotografia].likes) + parseInt(foto_likes); // Parse foi usado para não somar strings
    writeFile('./photos.json', JSON.stringify(file)); // Atualizar o Ficheiro
    res.send(file); // Devolver o ficheiro atualizado
});


// e. Listar todas as fotografias que contenham determinados tags e devolver a lista na resposta. (2
// valores)
app.get('/galeria/tags/:tags', function(req, res) {
    var tag = req.params.tags;
    var tags = [];
    var word = "";
    var file = JSON.parse(readFile('./photos.json')); // ficheiro JSON -> object
    var output = {};

    // Separar as tags por espaços
    for (char in tag) {
        if (tag[char] == ","){
            tags.push(word);    // guarda a palavra dentro de um array
            word = "";
        } else {
            word += tag[char];
        };
    };
    tags.push(word); // guarda a palavra dentro de um array


    // comparar as palavras com as tags que estao dentro do JSON
    for (word in tags) { // percorrer cada tag
        for (key in file) { // percorrer cada foto
            for (i in file[key].tags) { // comparar todas as tags
                // console.log('File key = ', file[key].tags[i]) percorrer as tags de cada objecto
                if (tags[word] == file[key].tags[i]) { // caso o objeto tenha a mesma tag que o utilizador pôs
                    output[key] = file[key]; 
                };
            };
        };
    };
    res.send(output);
});



// *****************************************************************************************************
// Parte B 
// a. Selecionar apenas uma fotografia pelo seu ID e devolver a mesma na resposta. (1 valores)
app.get('/fotografia_id/:id', function(req,res) {
    var ficheiro = JSON.parse(readFile('./photos.json'));
    var foto_id = req.params.id;
    var resposta = {};

    for (chave in ficheiro) { // para cada chave que está dentro do objeto
        if (ficheiro[chave].id == foto_id) { // caso as chaves do id seja igual então
            resposta[chave] = ficheiro[chave]; // coloca a chave do objeto e os conteudos dentro do objeto resposta
            res.send(resposta); // enviar a resposta
        };
    };
});

// b. Apagar uma fotografia existente e atualizar o ficheiro, indicar mensagem de erro se o ID da
// fotografia a apagar não existir ou mensagem de sucesso caso seja apagada. (2 valores)
app.delete('/apagar_fotografia/:foto_id', function(req, res) {
    var ficheiro = JSON.parse(readFile('./photos.json'));
    var foto_id = req.params.foto_id;
    for (chave in ficheiro) { // para cada chave dentro do objecto do ficheiro json
        if (ficheiro[chave].id == foto_id) { // verifica se os ids são iguais
            delete ficheiro[chave];
            writeFile('./photos.json', JSON.stringify(ficheiro)); // Atualizar o ficheiro depois de o apagar
            res.send("Fotografia apagada com Sucesso!");
        };
    };
    res.send("ID Inválido!");
});

// c. Incrementar o número de dislikes e atualizar o ficheiro. Devolver entrada atualizada na resposta.
// (2 valores)
app.get('/dislike/:nome_fotografia&:fotografia_dislikes', function(req, res){
    var nome_fotografia = req.params.nome_fotografia;
    var fotografia_dislikes = req.params.fotografia_dislikes;
    var ficheiro = JSON.parse(readFile('./photos.json'));

    // parseInt foi usado para converter string -> inteiro
    var total_dislikes = parseInt(ficheiro[nome_fotografia].dislikes) + parseInt(fotografia_dislikes);


    ficheiro[nome_fotografia].dislikes = total_dislikes;
    writeFile('./photos.json', JSON.stringify(ficheiro)); // atualizar o ficheiro
    res.send(ficheiro);
});


// d. Adicionar comentários a uma determinada fotografia pelo seu ID e atualizar o ficheiro. Devolver a
// entrada atualizada na resposta. (2 valores)
app.get('/comentar/:id/:comentario', function(req, res) {
    var id = req.params.id;
    var comentario = req.params.comentario;
    var ficheiro = JSON.parse(readFile('./photos.json'));
    var resposta = {};


    for (chave in ficheiro) { // para cada chave no objeto
        if (ficheiro[chave].id == id) { // compara se o id é igual ao que foi introduzido pelo utilizador 
            ficheiro[chave].comments.push(comentario); // caso seja ele usa a função .push() para adicionar ao array "comments"
            resposta[chave] = ficheiro[chave]; // guarda a fotografia que foi comentada para asseguir ser enviada
        };
    };

    writeFile('./photos.json', JSON.stringify(ficheiro)); // atualiza o ficheiro
    res.send(resposta);
});


// e. Listar todas as fotografias ordenadas por ordem de likes e devolver a lista ordenada na resposta.
// (2 valores)
app.get('/fotografias/mais_likes', function(req, res) {
    var ficheiro = JSON.parse(readFile('./photos.json'));
    var resposta = {};
    var likes_ordenado = [];
    for (chave in ficheiro) {
        console.log(likes_ordenado.push([ficheiro[chave].likes, chave]));
    };
    likes_ordenado.sort();

    for (elemento in likes_ordenado) {
        resposta[likes_ordenado[elemento][1]] = ficheiro[likes_ordenado[elemento][1]];
    };
    res.send(resposta);
});

//**********************************************************************************/
//Funções
function readFile(fileName) { // Ler o conteudo do ficheiro
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
};

function writeFile(filePath, fileData) { // Escrever informacao no ficheiro
    fs.writeFile(filePath, fileData, (err) => {  
        if (err) throw err;
    });
};

function objectSize(obj) { //Ver o tamanho de um Objecto
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`);
});