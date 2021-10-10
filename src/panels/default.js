import updateProps from '../updateProps'

class DefaultPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwChange', (ev) => {
      const id = this.dataset.id
      updateProps(ev, id)
    })

    this.render()
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = ''
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('default-panel', DefaultPanel)
