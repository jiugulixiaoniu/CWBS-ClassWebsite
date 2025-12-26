const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const mime = require('mime-types');
const path = require('path')
const net = require('net')
async function fileExists(filePath) {
  try {
    await fsPromises.access(filePath);
    return true;
  } catch {
    return false;
  }
}
async function sendFile(req, res, filePath) {
  let stats;
  try {
    stats = await fsPromises.stat(filePath);
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (await fileExists(indexPath)) {
        filePath = indexPath;
        stats = await fsPromises.stat(filePath);
      } else {
        throw new Error('No index.html');
      }
    }
  } catch (err) {
    res.writeHead(404, {
      'Content-type': 'text/html'
    });
    return res.end('404');
  }

  const mimeType = mime.lookup(filePath) || 'application/octet-stream';
  const fileName = path.basename(filePath);
  const isInline = mimeType.startsWith('text/') ||
    mimeType.includes('application/json') || [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp'
    ]
    .includes(mimeType);
  if (isInline) {
    try {
      const content = await fsPromises.readFile(filePath, 'utf8');
      res.writeHead(200, {
        'Content-Type': `${mimeType};charset=utf-8`,
      });
      res.end(content);
    } catch (err) {
      console.log('[Read Error]', filePath, err);
      res.writeHead(500).end('Internal Server Error');
    }
    return;
  }
  res.writeHead(200, {
    'Content-Type': mimeType,
    'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
    'Content-Length': stats.size,
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);

  readStream.on('error', (err) => {
    console.log(`[Stream Error] ${filePath}:`, err);
    if (!res.headersSent) {
      res.writeHead(500).end('File stream failed');
    } else {
      res.end();
    }
  });
}

function getUrl(req) {
  try {
    const host = req.headers.host || 'localhost';
    return new URL(req.url, `http://${host}`);
  } catch (err) {
    return new URL(req.url, 'http://localhost');
  }
}

const server = http.createServer((req, res) => {
  const url = getUrl(req);
  const p = url.pathname;
  process.nextTick(
    () => sendFile(req, res, path.join(__dirname, "./../src", p))
    .then(() => console.log(`${req.method} ${req.url} ${res.statusCode} `))
  )
})
class HttpServer {
  constructor(config) {
    this.PORT = config.PORT || 1025;
    this.start();
  }

  async isPortAvailable(port) {
    return new Promise(resolve => {
      const server = net.createServer();
      server.once('error', () => resolve(false));
      server.once('listening', () => {
        server.close(() => resolve(true));
      });
      server.listen(port, '0.0.0.0');
    });
  }

  async getAvailablePort(startPort) {
    let port = startPort;
    while (port < 65535) {
      if (await this.isPortAvailable(port)) return port;
      port++;
    }
    throw new Error('No available port');
  }

  async start() {
    if (typeof this.PORT !== 'number') {
      Exit('配置文件错误：PORT 的值非数字');
    }

    try {
      const port = await this.getAvailablePort(Math.floor(this.PORT));
      server.listen(port, '0.0.0.0', () => {
        console.log(`本地开发服务器运行在本地：http://localhost:${port} (端口: ${port})`);
      });
    } catch (err) {
      Exit('启动失败:', err.message);
    }
  }
};
new HttpServer({
  PORT: 1028
});