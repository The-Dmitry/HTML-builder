const fs = require('fs');
const path = require('path');


const result = [];
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

stream.on('data', (chunk) => result.push(chunk));
stream.on('end', ()=> console.log(result.join()));