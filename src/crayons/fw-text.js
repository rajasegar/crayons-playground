class FWText extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'text-align', 'font-weight', 'font-style', 'line-height', 'letter-spacing']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = '<p><slot></slot></p>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.para = this.shadowRoot.querySelector('p')
    this.applyStyles()
  }

  attributeChangedCallback() {
    this.applyStyles()
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
        this.para.style[attrs[attr]] = value
      }
    });
  }
}

customElements.define('fw-text', FWText)
