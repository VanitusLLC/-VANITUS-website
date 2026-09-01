import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const site = path.join(root, 'site')
const issues = []

async function walk(dir) {
  const out = []
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name)
    const info = await stat(full)
    if (info.isDirectory()) out.push(...await walk(full))
    else out.push(full)
  }
  return out
}

const files = await walk(site)
for (const file of files.filter((f) => /\.(html|js|css|xml|txt)$/i.test(f))) {
  const text = await readFile(file, 'utf8')
  const rel = path.relative(site, file)
  if (/@thevanitus\./i.test(text) || /mailto:/i.test(text)) issues.push(`${rel}: public operating email exposure`)
  if (/\u2014/.test(text)) issues.push(`${rel}: em dash detected`)
  if (/\bunlock\b/i.test(text)) issues.push(`${rel}: banned word detected`)
  if (/unsplash\.com|within\.website/i.test(text)) issues.push(`${rel}: external image dependency detected`)
  if (/Send (?:a |the )?Requirement/i.test(text)) issues.push(`${rel}: retired send-requirement phrasing remains`)
}

const home = await readFile(path.join(site, 'index.html'), 'utf8')
const formCount = (home.match(/<form\b/gi) || []).length
if (formCount !== 1) issues.push(`index.html: expected exactly 1 form, found ${formCount}`)

for (const id of ['capabilities', 'contracting', 'process', 'about', 'contact']) {
  if (!home.includes(`id="${id}"`)) issues.push(`index.html: missing section #${id}`)
}

for (const forbidden of ['Best-Fit Engagements', 'Architecture before activity', 'Commercial Execution', 'Structured Commercial Work', 'Submit for Consideration']) {
  if (home.toLowerCase().includes(forbidden.toLowerCase())) issues.push(`index.html: obsolete v19 copy remains: ${forbidden}`)
}

if (!home.includes('RJCEVUBK71L3')) issues.push('index.html: verified UEI missing')
if (!home.includes('23VK9')) issues.push('index.html: verified CAGE missing')
if (!home.includes('Start an Inquiry')) issues.push('index.html: primary inquiry CTA missing')
if (!home.includes('Submit Inquiry')) issues.push('index.html: form submission CTA missing')

if (issues.length) {
  console.error('Lint failed:')
  issues.forEach((i) => console.error(`- ${i}`))
  process.exit(1)
}
console.log('Lint passed: public exposure, obsolete copy, form count, identifiers, and section structure checks passed.')
