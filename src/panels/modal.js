import { store } from '../store'
import updateProps from '../updateProps'

class ModalPanel extends HTMLElement {
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
<style>
.container {
padding: 1em;
}
</style>
<div class="container">
      <fw-input value="${props.id}" label="Modal ID" data-property="id"></fw-input>
      <fw-input value="${props['title-text']}" label="Title Text" data-property="title-text"></fw-input>
      <fw-input value="" label="Description" data-property="description"></fw-input>

      <fw-select
        label="Size"
        value=${props.size}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="size"
      >
        <fw-select-option value="standard">standard</fw-select-option>
        <fw-select-option value="small">small</fw-select-option>
        <fw-select-option value="large">large</fw-select-option>
      </fw-select>

      <fw-input value="Cancel" label="Cancel Text" data-property="cancel-text"></fw-input>
      <fw-input value="OK" label="Success Text" data-property="success-text"></fw-input>
</div>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('modal-panel', ModalPanel)
