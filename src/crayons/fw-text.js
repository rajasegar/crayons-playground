class FWText extends HTMLElement {
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
  }
}

customElements.define('fw-text', FWText)
