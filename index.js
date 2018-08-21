const http = require('http');
const fs = require('fs'); //allows you to work with the file system on your computer.

var server = http.createServer(function (request, response) {
    console.log(`${request.method} request for ${request.url}`);
    if (request.method == 'GET') {
        console.log('get');
        if(request.url === "/" || request.url === "index" ){
            fs.readFile('./public/index.html', 'UTF-8', function(error, contents){
                if(error){
                    console.log("error, something went wrong");
                       } else {
                           response.writeHead(200, {'Content-Type':'text/html'});
                           response.end(contents);
                       }
                   });
        } else if (request.method.match(/.css$/)) {
            var cssPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(cssPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/css'});
            fileStream.pipe(response);
        }
        else if (request.method.match(/.js$/)) {
            var jsPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(jsPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            fileStream.pipe(response);
        }

    }

}); //the server object listens on port 5000
server.listen(5000)
console.log('server is running on port 5000');
