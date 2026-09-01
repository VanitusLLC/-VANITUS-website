# VANITUS Website v20.6.0 Deployment Candidate

Deployment candidate built from the validated v20.5.1 release and the approved public capability statement.

This release publishes the approved NAICS classifications, the approved South Florida About language, and the final 2026 VANITUS Capability Statement.

The capability statement is stored inside `site/documents/` and linked from Contracting Information. The public site has no Canva or Figma dependency.

## Validate

```bash
npm run lint
npm test
npm run build
npm run preview:self-contained
npm run preview
```

No production deployment has been performed.
