import { store } from '../store'
import updateProps from '../updateProps'

class LabelPanel extends HTMLElement {
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
      <fw-select
        label="Color"
        value=${props.color}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="color"
      >
        <fw-select-option value="blue">blue</fw-select-option>
        <fw-select-option value="green">green</fw-select-option>
        <fw-select-option value="grey">grey</fw-select-option>
        <fw-select-option value="normal">normal</fw-select-option>
        <fw-select-option value="red">red</fw-select-option>
        <fw-select-option value="yellow">yellow</fw-select-option>
      </fw-select>
      <fw-input label="Value" value="${props.value}" data-property="value"></fw-input>
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('label-panel', LabelPanel)
