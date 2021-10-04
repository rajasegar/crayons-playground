class FWText extends HTMLElement {
  static get observedAttributes() {
    return ['color']
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
    this.para.style.color = this.getAttribute('color')
  }
}

customElements.define('fw-text', FWText)
