import {
  ColorProps,
  TypographyProps,
  SpaceProps,
} from '@rajasegar/styled-web-components'

class FWText extends SpaceProps(TypographyProps(ColorProps(HTMLElement))) {
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
    this.container = this.shadowRoot.querySelector('p')
  }

  attributeChangedCallback(attr) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(attr)
    }
  }
}

customElements.define('fw-text', FWText)
