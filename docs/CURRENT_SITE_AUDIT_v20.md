# VANITUS Website v20 Internal Audit

## Decision standard
Every element was evaluated against one question: does it materially improve a government buyer's, prime contractor's, supplier's, financing partner's, or teaming partner's understanding of or confidence in VANITUS?

| Current v19 element | Decision | Reason |
|---|---|---|
| VANITUS helmet, ivory/charcoal/gold palette, serif/sans hierarchy | KEEP + REFINE | Distinctive, controlled identity. Strongest part of the existing site. |
| Moving architectural hero image | KEEP + REFINE | Retains cinematic VANITUS character. Reduced to the only major decorative image. |
| `Execution is the institution.` | KEEP + MOVE | Retained as supporting brand language, not the primary business explanation. |
| Hero `VANITUS` as the main H1 | REWRITE | Brand name alone does not explain capability. Replaced with a procurement-specific H1. |
| Dictionary-definition section | DELETE | Delays the business explanation and consumes an entire screen without adding procurement confidence. |
| `WHAT VANITUS DOES` | MERGE + REWRITE | Legitimate intent, but abstract category labels were replaced with concrete operational outputs. |
| `BEST-FIT ENGAGEMENTS` | DELETE | Substantially duplicates the service section and was the clearest v19 example of content added without adding information. |
| v19 `Florida LLC / Public-sector focused / Defined-scope engagements` strip | DELETE + REPLACE | Reads like filler. Replaced by actual verified SAM, UEI, CAGE, expiration, operating base, and phone information. |
| `Commercial Execution` / `Structured Commercial Work` | DELETE | Too vague and inconsistent with the focused federal supply procurement position. |
| `Architecture before activity` section | DELETE | Strong brand philosophy but low procurement value relative to its size. |
| Classical architecture gallery | DELETE | Three full-screen images overpowered the actual business information and added page length. |
| Full-screen manifesto | DELETE | Duplicated operating philosophy without giving buyers additional proof. |
| Four-step Method | KEEP + REWRITE | Process credibility is useful. Rewritten into four procurement-specific stages. |
| Repeated full-screen `THE STANDARD` image section | DELETE | Duplicated the hero image and consumed space without adding a contracting fact. |
| `WHAT DOES NOT MOVE` | DELETE | Values were reasonable but redundant after the capabilities and execution-process sections. |
| Current navigation labels | REWRITE | Replaced abstract labels with Capabilities, Contracting Information, How We Work, About, Contact. |
| Contact section | MOVE + REWRITE | Kept as primary public contact mechanism, shortened path, procurement-specific fields added. |
| `Submit for Consideration` | REWRITE | Replaced with direct inquiry language that supports government, supplier, and teaming contacts without treating every visitor as a requirement submission. |
| Hidden Netlify detection form | DELETE | No longer needed because the rebuilt site contains one static Netlify form in the HTML at build time. |
| React SPA / client-side metadata | REPLACE | Primary business content was not visible in initial HTML to non-JavaScript crawlers. Rebuilt as static semantic HTML with small progressive-enhancement JavaScript. |
| Privacy and Terms | KEEP + REFINE | Preserved and converted to crawlable static pages with their own canonical URLs. |

## Strongest current elements
- Approved helmet mark and controlled VANITUS palette.
- Architectural hero image and slow cinematic motion.
- Restrained institutional tone.
- Strong technical performance baseline established in v11 through v19.
- Existing Netlify deployment and form infrastructure.

## Weakest current elements
- Business explanation delayed by decorative and philosophical sections.
- Substantial duplication between v19 service and best-fit sections.
- Procurement identifiers not visible despite being available in controlled records.
- Generic or vague labels such as Commercial Execution.
- Form missing solicitation/RFQ number and response deadline.
- React SPA source HTML contained almost no business text for crawlers.

## Rebuild decision
Preserve the VANITUS visual system, one cinematic hero image, restrained reveal motion, and the core brand line. Replace the page architecture with a compact procurement-first sequence:

1. Hero
2. Verification Strip
3. Core Capabilities
4. Contracting Information
5. How VANITUS Works
6. About
7. Procurement Inquiries / Contact

The rebuild intentionally removes the visual gallery and manifesto structure rather than trying to preserve every prior section.
