import http from 'http'
import fs from 'fs'

const app = http.createServer(createServer)

function createServer(req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  let path = new URL(req.url, baseURL).pathname;

  const notFoundPage = fs.readFileSync('./pages/404.html', (err, data) => {
    if (err) throw err;
    return data;
  })

  const fsCallback = function(err, data) {
    if (err) {
        res.write(notFoundPage);
        res.end();
    }
    else {
        res.write(data);
        res.end();
    }
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  path = ['/', '/home'].includes(path) ? '/index': path;
  let filename = `./pages${path}.html`;
  fs.readFile(filename, fsCallback);

}

app.listen(8080);