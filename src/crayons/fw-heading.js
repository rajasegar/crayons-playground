class FWHeading extends HTMLElement {
  static get observedAttributes() {
    return ['level', 'color', 'text-align', 'font-weight', 'font-style', 'line-height', 'letter-spacing']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    this.level = this.getAttribute('level')
    const heading = `h${this.getAttribute('level')}`
    template.innerHTML = `<${heading}><slot></slot></${heading}>`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.heading = this.shadowRoot.querySelector(`h${this.level}`)
    this.applyStyles()
  }

  attributeChangedCallback(attr) {
    if (attr === 'level') {
      this.render()
    } else {
      this.applyStyles()
    }
  }

  applyStyles() {
    const attrs = {
      color: 'color',
      'text-align': 'textAlign',
      'font-weight': 'fontWeight',
      'font-style': 'fontStyle',
      'line-height': 'lineHeight',
      'letter-spacing': 'letterSpacing'
    }

    Object.keys(attrs).forEach(attr => {
      const value = this.getAttribute(attr)
      if (value) {
        this.heading.style[attrs[attr]] = value
      }
    });
  }
}

customElements.define('fw-heading', FWHeading)
