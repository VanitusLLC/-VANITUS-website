import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'site')
const dist = path.join(root, 'dist')

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })
await cp(source, dist, { recursive: true })

const required = [
  'index.html',
  'privacy/index.html',
  'terms/index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'assets/site.css',
  'assets/site.js',
  'images/vanitus-hero-720.webp',
  'images/vanitus-hero-960.webp',
  'images/vanitus-hero-1600.webp',
  'images/vanitus-columns-640.webp',
  'images/vanitus-columns-960.webp',
  'images/vanitus-columns-1440.webp',
  'images/vanitus-technology-640.webp',
  'images/vanitus-technology-960.webp',
  'images/vanitus-technology-1440.webp',
  'images/vanitus-fulfillment-640.webp',
  'images/vanitus-fulfillment-960.webp',
  'images/vanitus-fulfillment-1440.webp',
  'images/vanitus-pantheon-640.webp',
  'images/vanitus-pantheon-960.webp',
  'images/vanitus-pantheon-1440.webp',
  'vanitus-logo-512.webp',
  'documents/VANITUS-Capability-Statement-2026.pdf',
]

for (const rel of required) {
  await stat(path.join(dist, rel))
}

const publicTextFiles = ['index.html', 'privacy/index.html', 'terms/index.html', '404.html', 'assets/site.js']
for (const rel of publicTextFiles) {
  const text = await readFile(path.join(dist, rel), 'utf8')
  if (/@thevanitus\./i.test(text) || /mailto:/i.test(text)) {
    throw new Error(`Public email exposure detected in ${rel}`)
  }
}

console.log(`Built VANITUS static site to ${dist}`)
