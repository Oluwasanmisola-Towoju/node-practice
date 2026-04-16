const http = require('http');
const { readFileSync } = require('fs');

//get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeLogo = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
    console.log('User hit the server');
    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homePage);
        res.end();
    }
    else if (req.url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(homeStyles);
        res.end();
    }
    else if (req.url === '/logo.svg') {
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
        res.write(homeLogo);
        res.end();
    }
    else if (req.url === '/browser-app.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(homeLogic);
        res.end();
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Page not found</h1>');
        res.end();
    }
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});