import { store } from '../store'
import updateProps from '../updateProps'

class SpinnerPanel extends HTMLElement {
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
    const { type, props } = components[this.dataset.id]
    let name = type.replace('fw-', '')
    name = name[0].toUpperCase() + name.slice(1)
    const template = document.createElement('template')
    template.innerHTML = `
      <h2>${name}</h2>
      <fw-input label="Color" value="${props.color}" data-property="color"></fw-input>
      <fw-select
        label="Size"
        value=${props.size}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="size"
      >
        <fw-select-option value="default">default</fw-select-option>
        <fw-select-option value="large">large</fw-select-option>
        <fw-select-option value="medium">medium</fw-select-option>
        <fw-select-option value="small">small</fw-select-option>
      </fw-select>


    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('spinner-panel', SpinnerPanel)
