# VANITUS Website v20.4 Validation Report

## Scope

Approved-NAICS publication only. v20.3 remains the controlling visual, content, and architecture baseline.

## Automated checks

- Lint: PASS
- Tests: PASS, 8/8
- Production build: PASS
- Self-contained working preview generation: PASS
- Public operating email exposure check: PASS
- One Netlify submission form: PASS
- Honeypot hidden, unfocusable, and excluded from layout: PASS
- Verified UEI, CAGE, SAM status, registration date, operating base, and business line retained: PASS
- Approved primary and secondary NAICS rendered exactly: PASS
- Unapproved PSC and capability-statement material remains unpublished: PASS

## Responsive visual controls

- Responsive source sets: 640, 960, and 1440 px for both new image treatments
- Explicit intrinsic dimensions: PASS
- Below-fold lazy loading and asynchronous decoding: PASS
- Mobile-specific heights and object positions: PASS
- Crop inspection: PASS at 375, 390, 768, 1024, and 1440 px
- Reduced-motion suppression: PASS by CSS and JavaScript control inspection
- Horizontal overflow prevention remains active at the document root and body
- NAICS layout changes from a two-column institutional panel to a single stacked panel at 1040 px and below

## Render limitation

The local source and self-contained preview were built successfully. Full-page browser captures could not be generated in the current execution environment because no local browser executable was installed and the available cloud browser does not permit local-preview URLs. No screenshot has been fabricated or mislabeled as browser-rendered output.

No live form submission was transmitted. No production deployment was performed.
