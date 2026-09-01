export const siteFacts = Object.freeze({
  legalName: 'VANITUS LLC',
  publicBrand: 'VANITUS',
  website: 'https://thevanitus.com/',
  phoneDisplay: '(855) VANITUS',
  phoneHref: 'tel:+18558264887',
  samStatus: 'Active',
  uei: 'RJCEVUBK71L3',
  cage: '23VK9',
  samExpiration: '2027-08-09',
  operatingBase: 'South Florida',
  publicEmail: null,
  businessSize: null,
  primaryNaics: Object.freeze({
    code: '541512',
    title: 'Computer Systems Design Services',
  }),
  secondaryNaics: Object.freeze([
    Object.freeze({ code: '423430', title: 'Computer & Software Wholesalers' }),
    Object.freeze({ code: '423690', title: 'Electronic Parts & Equipment Wholesalers' }),
    Object.freeze({ code: '423610', title: 'Electrical Apparatus & Wiring Wholesalers' }),
    Object.freeze({ code: '423830', title: 'Industrial Machinery & Equipment Wholesalers' }),
  ]),
  pscCodes: null,
  verifiedCertifications: [],
  capabilityStatementPublic: true,
  capabilityStatementPath: '/documents/VANITUS-Capability-Statement-2026.pdf',
})

export const publicationControls = Object.freeze({
  businessSize: 'Not published until current size/profile status is independently verified for public use.',
  primaryNaics: 'Primary and secondary NAICS classifications are approved for public website release in v20.4.',
  pscCodes: 'No curated PSC/FSC set is currently verified for public website release.',
  certifications: 'No VetCert, SDVOSB, VOSB, 8(a), HUBZone, WOSB, or EDWOSB certification is published without active verification.',
  capabilityStatement: 'The approved 2026 capability statement is published as a first-party website document.',
  publicEmail: 'Intentionally omitted from public HTML, metadata, structured data, JavaScript, and page source. Form routing remains private in Netlify.',
})
