document.documentElement.classList.add('js')

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const siteHeader = document.querySelector('.site-header')
if (siteHeader) {
  siteHeader.style.position = 'fixed'
  siteHeader.style.inset = '0 0 auto 0'
  siteHeader.style.width = '100%'
  document.body.style.paddingTop = 'var(--header-h)'
}

const menuButton = document.querySelector('[data-menu-button]')
const nav = document.querySelector('[data-nav]')
if (menuButton && nav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false')
    nav.dataset.open = 'false'
    document.body.classList.remove('menu-open')
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true'
    menuButton.setAttribute('aria-expanded', String(open))
    nav.dataset.open = String(open)
    document.body.classList.toggle('menu-open', open)
  })
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
}

const backToTop = document.createElement('button')
backToTop.type = 'button'
backToTop.setAttribute('aria-label', 'Back to top')
backToTop.textContent = '↑'
backToTop.style.cssText = [
  'position:fixed',
  'right:clamp(16px,3vw,30px)',
  'bottom:clamp(18px,3vw,30px)',
  'z-index:90',
  'width:46px',
  'height:46px',
  'display:grid',
  'place-items:center',
  'padding:0',
  'border:1px solid rgba(176,141,87,.55)',
  'border-radius:50%',
  'background:rgba(34,34,31,.94)',
  'color:#f2eee6',
  'font-family:Baskerville,"Times New Roman",Times,serif',
  'font-size:24px',
  'line-height:1',
  'box-shadow:0 10px 28px rgba(0,0,0,.16)',
  'backdrop-filter:blur(10px)',
  'opacity:0',
  'visibility:hidden',
  'transform:translateY(8px)',
  'transition:opacity .2s ease, transform .2s ease, visibility .2s ease',
  'cursor:pointer'
].join(';')
document.body.appendChild(backToTop)

const updateBackToTop = () => {
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const visible = window.scrollY / scrollable >= 0.3
  backToTop.style.opacity = visible ? '1' : '0'
  backToTop.style.visibility = visible ? 'visible' : 'hidden'
  backToTop.style.transform = visible ? 'translateY(0)' : 'translateY(8px)'
}

window.addEventListener('scroll', updateBackToTop, { passive: true })
window.addEventListener('resize', updateBackToTop)
updateBackToTop()

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
})

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
}

const form = document.querySelector('form[name="requirement"]')
const status = document.querySelector('[data-form-status]')
if (form && status) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!form.reportValidity()) return

    const submit = form.querySelector('button[type="submit"]')
    const original = submit.textContent
    submit.disabled = true
    submit.textContent = 'SENDING…'
    status.textContent = 'Submitting inquiry…'

    try {
      const body = new URLSearchParams(new FormData(form))
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      status.textContent = 'Inquiry received. VANITUS will review the submission and respond through the contact information provided.'
      status.dataset.state = 'success'
    } catch (error) {
      console.error('Requirement form submission failed', error)
      status.textContent = 'The form could not be transmitted. Please call (855) VANITUS.'
      status.dataset.state = 'error'
    } finally {
      submit.disabled = false
      submit.textContent = original
    }
  })
}
