var http = require('http');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events');

function download(writeSteram, url) {
    return new DL(writeSteram, url);
}


function DL(stream, url) {
    EventEmitter.call(this);
    var self = this;
    var dataSize = 0;

    http.get(url, function (response) {
        if (response.statusCode != 200) {
            self.emit('error', new Error('Status code ' + response.statusCode));
            return;
        }

        response.pipe(stream);
        dataSize = parseInt(response.headers['content-length']);
    });

    stream.on('drain', function () {
        // console.log(stream);
        self.emit('process', stream.bytesWritten, dataSize);
    });

    stream.on('finish', function () {
        self.emit('finish');
    });

}

util.inherits(DL, EventEmitter);

// DL.prototype.getHandler = function (response) {
//     if (response.statusCode != 200) {
//         this.emit('error', response);
//         return;
//     }
//     console.log(this);
//     response.pipe(this.stream);
//     this.emit('start', response.headers['content-length'])
// };


module.exports = download;