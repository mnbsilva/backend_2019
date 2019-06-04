import { Readable } from "stream";

var readble = fs.createReadStream('big.txt');

readable.on('data', function(chunck){
    console.log(chunk);

});

readable.on('end', function(chunk){
    console.log("Compleated Stream");
});