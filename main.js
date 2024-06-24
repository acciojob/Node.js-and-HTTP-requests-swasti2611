const https = require('https');
const axios = require('axios');

let server = https.createServer((req, res) => {
    if (req.url === '/todo') {
        if (req.method === 'GET') {
            axios.get('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(response.data.title);
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error fetching data');
                });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server connected');
});
