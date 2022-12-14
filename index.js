const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req, res) => {
  
  //identify file path to return
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  //find extension to return right content type
  let fileExt = path.extname(filePath);

  let contentType = 'text/html'; //default

  switch(fileExt) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = "application/json";
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if(err) {
      if(err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  
  });

});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));
