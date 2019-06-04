const fs = require('fs');

var str = "";

for(var i=0; i<= 9999999; i++){
    str += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae lectus ex. In vulputate volutpat lobortis. Mauris in pellentesque odio. Ut id rutrum quam. Phasellus dictum convallis mi non maximus. Donec odio nisl, cursus et lorem non, auctor interdum neque. Mauris vel nisl consequat, consequat tortor ut, tristique mauris. Etiam ultrices, tortor in condimentum eleifend, sem ligula cursus quam, sit amet tempus augue ex id sem. Aenean ac mi sit amet odio malesuada fermentum.'
}

fs.writeFile('./big.txt', str, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});