import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..', 'dist')
const port = Number(process.env.PORT || 4173)
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.webp':'image/webp', '.png':'image/png' }

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  let target = path.join(root, clean.replace(/^\/+/, ''))
  try {
    const info = await stat(target)
    if (info.isDirectory()) target = path.join(target, 'index.html')
  } catch {
    if (!path.extname(target)) target = path.join(target, 'index.html')
  }
  try { await stat(target); return target } catch { return path.join(root, '404.html') }
}

http.createServer(async (req, res) => {
  const file = await resolveFile(req.url || '/')
  const body = await readFile(file)
  const notFound = file.endsWith('404.html')
  res.writeHead(notFound ? 404 : 200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' })
  res.end(body)
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`))
