const https = require('https');
const http = require('http'); // Use `http` for creating the server

const getTodoTitle = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: '/todos/1',
      method: 'GET'
    };

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const actualTitle = JSON.parse(data).title;
          resolve(actualTitle);
        } catch (err) {
          reject(`Error parsing JSON: ${err}`);
        }
      });
    });

    request.on('error', (err) => {
      reject(`Error making HTTP request: ${err}`);
    });

    request.end();
  });
};

if (require.main === module) {
  getTodoTitle()
    .then(title => console.log(title))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
} else {
  module.exports = getTodoTitle;
}

// Create HTTP server using `http` module
let server = http.createServer((req, res) => {
  if (req.url === '/todo') {
    if (req.method === 'GET') {
      getTodoTitle()
        .then(title => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(title);
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
