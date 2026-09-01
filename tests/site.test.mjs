import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { siteFacts, publicationControls } from '../site.config.mjs'

const root = path.resolve(import.meta.dirname, '..')
const home = await readFile(path.join(root, 'site/index.html'), 'utf8')
const css = await readFile(path.join(root, 'site/assets/site.css'), 'utf8')
const js = await readFile(path.join(root, 'site/assets/site.js'), 'utf8')

test('verified contracting identifiers are rendered', () => {
  assert.match(home, new RegExp(siteFacts.uei))
  assert.match(home, new RegExp(siteFacts.cage))
  assert.match(home, /SAM Registration[\s\S]*Active/i)
  assert.match(home, /August 9, 2027/i)
})

test('approved NAICS classifications are published without unverified PSC codes', () => {
  assert.deepEqual(siteFacts.primaryNaics, {
    code: '541512',
    title: 'Computer Systems Design Services',
  })
  assert.equal(siteFacts.secondaryNaics.length, 4)
  for (const { code, title } of [siteFacts.primaryNaics, ...siteFacts.secondaryNaics]) {
    assert.match(home, new RegExp(code))
    assert.match(home, new RegExp(title.replace('&', '&amp;')))
  }
  assert.equal(siteFacts.pscCodes, null)
  assert.ok(publicationControls.primaryNaics)
  assert.doesNotMatch(home, /333924|326112|339950|3990|8135/)
})

test('no public operating email is exposed', () => {
  for (const text of [home, js]) {
    assert.doesNotMatch(text, /@thevanitus\./i)
    assert.doesNotMatch(text, /mailto:/i)
  }
})

test('contact form has procurement fields and one submission path', () => {
  assert.equal((home.match(/<form\b/gi) || []).length, 1)
  for (const field of ['name="organization"', 'name="solicitation"', 'name="response-deadline"', 'name="requirement-summary"', 'name="inquiry-type"']) {
    assert.ok(home.includes(field), `missing ${field}`)
  }
  assert.ok(home.includes('data-netlify="true"'))
  assert.ok(home.includes('data-netlify-honeypot="bot-field"'))
})

test('primary business copy exists as static semantic HTML', () => {
  assert.match(home, /Government requirements\. Sourced, priced, coordinated, and delivered\./)
  assert.match(home, /coordinates qualified sources, compliant pricing, documentation, and delivery/)
  assert.match(home, /Federal Supply Procurement/)
  assert.match(home, /Supplier &amp; Manufacturer Sourcing/)
  assert.match(home, /Quote &amp; Compliance Development/)
  assert.match(home, /Delivery &amp; Performance Coordination/)
  assert.match(home, /Contracting Information/)
  assert.match(home, /How VANITUS Works/)
  assert.match(home, /Start an Inquiry/)
  assert.match(home, /Procurement Inquiries/)
  assert.match(home, /Submit Inquiry/)
  assert.doesNotMatch(home, /Send (?:a |the )?Requirement/i)
  assert.match(home, /VANITUS is a South Florida-based government contractor/)
  assert.match(home, /Veteran-founded and led, the company operates with military standards of discipline, accountability, precision, and control\./)
  assert.doesNotMatch(home, /U\.S\. Air Force/i)
})

test('approved capability statement is published inside contracting information', () => {
  assert.equal(siteFacts.capabilityStatementPublic, true)
  assert.equal(siteFacts.capabilityStatementPath, '/documents/VANITUS-Capability-Statement-2026.pdf')
  const contracting = home.indexOf('id="contracting"')
  const documentLink = home.indexOf('class="button document-resource-link"')
  const process = home.indexOf('id="process"')
  assert.ok(contracting < documentLink && documentLink < process)
  assert.match(home, /VANITUS Capability Statement 2026/)
  assert.match(home, /Download Capability Statement/i)
  assert.match(home, /href="\/documents\/VANITUS-Capability-Statement-2026\.pdf"/)
  assert.match(home, /target="_blank" rel="noopener noreferrer"/)
  assert.match(css, /\.document-resource \{[^}]*display: flex/)
  assert.doesNotMatch(home, /canva\.com/i)
})

test('responsive and reduced-motion controls exist', () => {
  assert.match(css, /@media \(max-width: 620px\)/)
  assert.match(css, /@media \(max-width: 1040px\)/)
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /overflow-x: hidden/)
})

test('approved visual rhythm is integrated without changing section order', () => {
  const capabilities = home.indexOf('id="capabilities"')
  const visualBreak = home.indexOf('class="visual-break visual-break-columns"')
  const contracting = home.indexOf('id="contracting"')
  const process = home.indexOf('id="process"')
  const about = home.indexOf('id="about"')
  const contact = home.indexOf('id="contact"')
  assert.ok(capabilities < visualBreak && visualBreak < contracting)
  assert.ok(contracting < process && process < about && about < contact)
  assert.match(home, /vanitus-columns-640\.webp/)
  assert.match(home, /vanitus-columns-1440\.webp/)
  assert.match(home, /vanitus-pantheon-640\.webp/)
  assert.match(home, /vanitus-pantheon-1440\.webp/)
  assert.equal((home.match(/loading="lazy"/g) || []).length, 2)
  assert.match(home, /class="about-media" aria-hidden="true"/)
  assert.match(css, /\.visual-break \{[^}]*overflow: hidden/)
  assert.match(css, /@media \(max-width: 820px\)/)
})


test('hero hierarchy and honeypot presentation are controlled', () => {
  const logoIndex = home.indexOf('class="hero-mark"')
  const headlineIndex = home.indexOf('id="hero-title"')
  const actionsIndex = home.indexOf('class="hero-actions"')
  const verificationIndex = home.indexOf('class="verification"')
  assert.ok(logoIndex > -1 && logoIndex < headlineIndex)
  assert.ok(headlineIndex < actionsIndex && actionsIndex < verificationIndex)
  assert.match(home, /class="honeypot" hidden aria-hidden="true"/)
  assert.match(css, /\.honeypot, \.honeypot\[hidden\] \{ display: none !important;/)
})
