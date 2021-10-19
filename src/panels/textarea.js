import { store } from '../store'
import updateProps from '../updateProps'

class TextareaPanel extends HTMLElement {
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
      <fw-input label="Label" value="${props.label}" data-property="label"></fw-input>
      <fw-input label="Placeholder" value="${props.placeholder}" data-property="placeholder"></fw-input>
      <fw-select
        label="State"
        value=${props.state}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="state"
      >
        <fw-select-option value="normal">normal</fw-select-option>
        <fw-select-option value="error">error</fw-select-option>
        <fw-select-option value="warning">warning</fw-select-option>
      </fw-select>
      <fw-input label="State Text" value="${props['state-text']}" data-property="state-text"></fw-input>
      <fw-input type="number" label="Rows" value="${props.rows}" data-property="rows"></fw-input>
      <fw-input type="number" label="Columns" value="${props.cols}" data-property="cols"></fw-input>
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('textarea-panel', TextareaPanel)
