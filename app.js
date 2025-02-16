import http from "node:http";

const APP_PORT = 3000;

const server = http.createServer((request, response) => {
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    })

    setTimeout(() => {
        if (Math.floor(Math.random() * 100) + 1 <= 10) {
            response.writeHead(500, {
                'Content-Type': 'text/plain',
                "connection": "close",
            })
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                "connection": "close",
            })
            response.end('Hello World!');
        }
    }, (Math.floor(Math.random() * 3) + 1) * 1000);
});

server.listen(APP_PORT, () => {
    console.log('Server started on port: ' + APP_PORT)
})
