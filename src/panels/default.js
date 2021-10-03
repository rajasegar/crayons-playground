import { store } from '../store'
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
    const { components } = store.getState()
    const { type } = components[this.dataset.id]
    let name = type.replace('fw-', '')
    name = name[0].toUpperCase() + name.slice(1)
    const template = document.createElement('template')
    template.innerHTML = `
      <h2>${name}</h2>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('default-panel', DefaultPanel)
