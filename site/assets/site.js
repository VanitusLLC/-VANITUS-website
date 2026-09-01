document.documentElement.classList.add('js')

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
