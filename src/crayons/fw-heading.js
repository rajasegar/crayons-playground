class FWHeading extends HTMLElement {
  static get observedAttributes() {
    return ['level']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    const heading = `h${this.getAttribute('level')}`
    template.innerHTML = `<${heading}><slot></slot></${heading}>`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  attributeChangedCallback() {
    this.render()
  }
}

customElements.define('fw-heading', FWHeading)
