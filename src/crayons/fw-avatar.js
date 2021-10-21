class FWAvatar extends HTMLElement {
  static get observedAttributes() {
    return ['url', 'size']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    this.url = this.getAttribute('url')
    this.size = this.getAttribute('size')
    template.innerHTML = `<img src="${this.url}" width="${this.size}" height="${this.size}"/>`
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.image = this.shadowRoot.querySelector('img')

    this.image.style.borderRadius = '25%'
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'url') {
      this.image.setAttribute('src', newValue)
    }
    if (attr === 'size') {
      this.image.setAttribute('width', newValue)
      this.image.setAttribute('height', newValue)
    }
  }
}

customElements.define('fw-avatar', FWAvatar)
