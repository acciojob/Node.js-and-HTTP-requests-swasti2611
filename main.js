const https = require('https');

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
        const actualTitle = JSON.parse(data).title;
        resolve(actualTitle);
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