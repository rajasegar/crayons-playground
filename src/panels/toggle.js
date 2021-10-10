import { store } from '../store'
import updateProps from '../updateProps'

class TogglePanel extends HTMLElement {
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
    const { props } = components[this.dataset.id]
    const template = document.createElement('template')
    template.innerHTML = `
      <fw-select
        label="Size"
        value=${props.size}
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="size"
      >
        <fw-select-option value="large">large</fw-select-option>
        <fw-select-option value="medium">medium</fw-select-option>
        <fw-select-option value="small">small</fw-select-option>
      </fw-select>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('toggle-panel', TogglePanel)
