// flow-notes WebDAV proxy
// 运行: node proxy.js
const http = require('http');
const https = require('https');

const PORT = 19527;
const DAV_HOST = 'dav.jianguoyun.com';

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const options = {
    hostname: DAV_HOST,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: DAV_HOST }
  };

  const proxy = https.request(options, r => {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res);
  });
  proxy.on('error', e => { res.writeHead(502); res.end(e.message); });
  req.pipe(proxy);
}).listen(PORT, () => console.log(`proxy running at http://localhost:${PORT}`));
