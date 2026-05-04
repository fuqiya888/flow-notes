// Flow Notes server: static file serving + WebDAV proxy for Nutstore sync
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 18889;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,MKCOL');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,X-Target-Host');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // WebDAV proxy — 浏览器发来 X-Target-Host，告诉服务端要代理到哪个 WebDAV 服务器
  if (req.url.startsWith('/dav/')) {
    const davPath = req.url;
    // 从请求头读取用户配置的 WebDAV 服务器（如 https://dav.jianguoyun.com/dav）
    const targetHeader = req.headers['x-target-host'] || 'https://dav.jianguoyun.com/dav';
    let parsedTarget;
    try {
      parsedTarget = new URL(targetHeader);
    } catch {
      res.writeHead(400);
      res.end('Invalid X-Target-Host');
      return;
    }

    const isHttps = parsedTarget.protocol === 'https:';
    const httpLib = isHttps ? https : http;
    const hostname = parsedTarget.hostname;
    const port = parsedTarget.port || (isHttps ? 443 : 80);
    const targetPath = parsedTarget.pathname; // e.g. "/dav"
    const hostHeader = parsedTarget.port ? `${hostname}:${parsedTarget.port}` : hostname;

    // /dav/flow-notes/data.json → targetPath + /flow-notes/data.json
    const davFilePath = targetPath.replace(/\/$/, '') + davPath.replace(/^\/dav/, '');

    const fwdHeaders = {
      Host: hostHeader,
      'User-Agent': 'Flow-Notes/1.0',
    };
    if (req.headers['authorization'])   fwdHeaders['Authorization'] = req.headers['authorization'];
    if (req.headers['content-type'])   fwdHeaders['Content-Type'] = req.headers['content-type'];
    if (req.headers['content-length']) fwdHeaders['Content-Length'] = req.headers['content-length'];
    if (req.headers['accept'])         fwdHeaders['Accept'] = req.headers['accept'];
    if (req.headers['if-match'])       fwdHeaders['If-Match'] = req.headers['if-match'];
    if (req.headers['if-none-match'])  fwdHeaders['If-None-Match'] = req.headers['if-none-match'];
    if (req.headers['depth'])          fwdHeaders['Depth'] = req.headers['depth'];

    const opts = {
      hostname,
      port,
      path: davFilePath,
      method: req.method,
      headers: fwdHeaders,
    };

    console.log(`[WebDAV] ${req.method} ${davFilePath} → ${hostname}`);

    const proxy = httpLib.request(opts, (r) => {
      console.log(`[WebDAV] ← ${r.statusCode} ${r.statusMessage || ''}`);

      if (r.statusCode === 401) {
        console.log('[WebDAV] Auth failed — check account / app password');
      }
      if (r.statusCode === 404) {
        console.log('[WebDAV] 404 — path not found on server:', davFilePath);
      }

      const respHeaders = { ...r.headers };
      delete respHeaders['www-authenticate'];
      delete respHeaders['connection'];
      delete respHeaders['transfer-encoding'];

      res.writeHead(r.statusCode, respHeaders);
      r.pipe(res);
    });

    proxy.on('error', (e) => {
      console.error('[WebDAV] Proxy error:', e.message);
      res.writeHead(502);
      res.end('WebDAV proxy error: ' + e.message);
    });

    req.pipe(proxy);
    return;
  }

  // Static files
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
  // 防止路径穿越
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });

}).listen(PORT, '0.0.0.0', () => {
  console.log(`Flow Notes server running at http://localhost:${PORT}`);

  // Get LAN IP
  const os = require('os');
  const ifaces = os.networkInterfaces();
  let lanIP = 'localhost';

  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        lanIP = iface.address;
        break;
      }
    }
    if (lanIP !== 'localhost') break;
  }

  if (lanIP !== 'localhost') {
    console.log(`Mobile access: http://${lanIP}:${PORT}`);
  }
});
