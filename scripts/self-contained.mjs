import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const output = path.join(root, 'VANITUS-v20.7-visual-alignment-preview.html')

let html = await readFile(path.join(dist, 'index.html'), 'utf8')
const css = await readFile(path.join(dist, 'assets/site.css'), 'utf8')
const js = await readFile(path.join(dist, 'assets/site.js'), 'utf8')

html = html
  .replace(/\s*<link rel="preload"[^>]+>\s*/i, '\n')
  .replace('<link rel="stylesheet" href="/assets/site.css" />', `<style>${css}</style>`)
  .replace('<script defer src="/assets/site.js"></script>', `<script>${js}</script>`)

const assets = [
  ['image/png', 'vanitus-logo.png'],
  ['image/webp', 'vanitus-logo-512.webp'],
  ['image/png', 'vanitus-social-preview.png'],
  ['image/webp', 'images/vanitus-hero-720.webp'],
  ['image/webp', 'images/vanitus-hero-960.webp'],
  ['image/webp', 'images/vanitus-hero-1600.webp'],
  ['image/webp', 'images/vanitus-columns-640.webp'],
  ['image/webp', 'images/vanitus-columns-960.webp'],
  ['image/webp', 'images/vanitus-columns-1440.webp'],
  ['image/webp', 'images/vanitus-technology-640.webp'],
  ['image/webp', 'images/vanitus-technology-960.webp'],
  ['image/webp', 'images/vanitus-technology-1440.webp'],
  ['image/webp', 'images/vanitus-fulfillment-640.webp'],
  ['image/webp', 'images/vanitus-fulfillment-960.webp'],
  ['image/webp', 'images/vanitus-fulfillment-1440.webp'],
  ['image/webp', 'images/vanitus-pantheon-640.webp'],
  ['image/webp', 'images/vanitus-pantheon-960.webp'],
  ['image/webp', 'images/vanitus-pantheon-1440.webp'],
  ['application/pdf', 'documents/VANITUS-Capability-Statement-2026.pdf'],
]

for (const [mime, relativePath] of assets) {
  const bytes = await readFile(path.join(dist, relativePath))
  const dataUri = `data:${mime};base64,${bytes.toString('base64')}`
  html = html.replaceAll(`/${relativePath}`, dataUri)
}

await writeFile(output, html)
console.log(`Wrote self-contained preview to ${output}`)
