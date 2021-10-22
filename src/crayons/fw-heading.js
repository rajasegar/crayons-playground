import {
  ColorProps,
  TypographyProps,
  SpaceProps,
} from '@rajasegar/styled-web-components'

class FWHeading extends SpaceProps(TypographyProps(ColorProps(HTMLElement))) {
  static get observedAttributes() {
    const ownAtts = ['level']
    const _observedAttrs = super.observedAttributes
      ? [...super.observedAttributes, ...ownAtts]
      : ownAtts
    return _observedAttrs
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
    this.container = this.shadowRoot.querySelector(`h${this.level}`)
  }

  attributeChangedCallback(attr) {
    if (attr === 'level') {
      this.render()
    } else {
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(attr)
      }
    }
  }
}

customElements.define('fw-heading', FWHeading)
