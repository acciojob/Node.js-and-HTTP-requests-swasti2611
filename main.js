const https = require('https');

let server = https.createServer((req, res) => {
    if (req.url === '/todo') {
        if (req.method === 'GET') {
            https.get('https://jsonplaceholder.typicode.com/todos/1', (response) => {
                let data = '';

                // A chunk of data has been received.
                response.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received.
                response.on('end', () => {
                    try {
                        const todo = JSON.parse(data);
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(todo.title);
                    } catch (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error parsing JSON');
                    }
                });
            }).on('error', (err) => {
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
