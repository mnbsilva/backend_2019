const fs = require('fs');
var zlib = require('zlib');
var readable = fs.createReadStream('big.txt');
var writeable = fs.createWriteStream('big_copy.txt');

// var str = "";

// for(var i=0; i<= 10000; i++){
//     str += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
// }

// fs.writeFile('./big.txt', str, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });

// import { Readable } from "stream";

readable.on('data', function(chunk){
    // console.log(chunk);
    writeable.write(chunk);
        
});

readable.on('end', function(chunk){
    console.log("Compleated Stream");
    writeable.end();
});

console.log("Compleated Stream");

// copy data using pipe function
readable.pipe(writeable);

var gzip = zlib.createGzip();
var compressed = fs.createWriteStream ('big_copy.txt.gz');

// chain methods with piping
// 1- readable pipe to gzip
// 2- pipe compressed data to a file
readable.pipe(gzip).pipe(compressed);
