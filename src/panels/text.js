import { store } from '../store'
import updateProps from '../updateProps'

class TextPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const id = this.dataset.id
    this.addEventListener('fwChange', (ev) => {
      updateProps(ev, id)
    })

    this.shadowRoot.addEventListener('change', (ev) => {
      updateProps(ev, id)
    })

    this.render()
  }

  render() {
    const { components } = store.getState()
    const { props } = components[this.dataset.id]
    const template = document.createElement('template')
    template.innerHTML = `
      <h2>Text</h2>
      <fw-textarea value="${props.children}" label="Children" data-property="children"></fw-textarea>

      <p><label for="txtColor">Color:</label></p>
      <input id="txtColor" type="color" data-property="color"/>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('text-panel', TextPanel)
