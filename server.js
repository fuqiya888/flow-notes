// 合并：静态文件服务 + WebDAV 代理
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 19527;
const DAV_HOST = 'dav.jianguoyun.com';
const ROOT = __dirname;

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json' };

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,MKCOL');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // WebDAV 代理
  if (req.url.startsWith('/dav/')) {
    const opts = { hostname: DAV_HOST, path: req.url, method: req.method, headers: { ...req.headers, host: DAV_HOST } };
    const proxy = https.request(opts, r => { res.writeHead(r.statusCode, r.headers); r.pipe(res); });
    proxy.on('error', e => { res.writeHead(502); res.end(e.message); });
    req.pipe(proxy);
    return;
  }

  // 静态文件
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'text/plain' });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log(`Flow Notes running at http://localhost:${PORT}`);
  console.log('请在浏览器打开: http://localhost:' + PORT);
});
