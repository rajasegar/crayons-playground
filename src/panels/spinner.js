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
    const { props } = components[this.dataset.id]
    const template = document.createElement('template')
    template.innerHTML = `
<style>
.container {
padding: 1em;
}
</style>
<div class="container">
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
</div>`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('spinner-panel', SpinnerPanel)
