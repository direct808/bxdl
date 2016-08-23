//http://www.1c-bitrix.ru/download/first_site_encode_php5.tar.gz
var dist = 'http://www.1c-bitrix.ru/download/files/start_encode_php5.tar.gz';
// var dist = 'http://www.1c-bitrix.ru/download/files/first_site_encode_php5.tar.gz';

const readline = require('readline');
const download = require('./lib/download');
var fs = require('fs');

var stream = fs.createWriteStream("file.jpg");

var dl = download(stream, dist);
dl.on('process', (cur, total)=>console.log(formatBytes(cur) + ' of ' + formatBytes(total)));
dl.on('finish', data=>console.log('ok'));
dl.on('error', data=>console.error(data.toString()));


function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Byte';
    var k = 1000; // or 1024 for binary
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


// readline.emitKeypressEvents(process.stdin);
//
//
// process.stdin.on('keypress', registerInput);
//
// function registerInput (str, key) {
//     console.log(key);
// }
/*

 var http = require('http');
 var fs = require('fs');

 var file = fs.createWriteStream("file.jpg");
 var request = http.get(dist, function (response) {
 if(response.statusCode!=200) {
 console.error(response.statusCode + ' GET '+dist);
 process.exit(1);
 }
 response.pipe(file);
 console.log(response.headers['content-length']);
 console.log(response.statusCode);
 });

 file.on('drain', () => {
 console.log(file.bytesWritten);
 })
 ;

 file.on('finish', () => {
 console.error('All writes are now complete.');
 });*/