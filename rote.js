const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.end('Welcome to our Homepage');
    }
    if(req.url === '/about') {
        res.end('About us page');
    }
    res.end('Error: page not found');
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000');
})