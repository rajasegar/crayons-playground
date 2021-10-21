import { store } from '../store'
import updateProps from '../updateProps'

class AvatarPanel extends HTMLElement {
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
      <fw-input label="Image URL" value="${props.url}" data-property="url"></fw-input>
      <fw-select
        label="Size"
        value=${props.size}
        data-id="${this.dataset.id}"
        data-property="size"
      >
        <fw-select-option value="16">16 px</fw-select-option>
        <fw-select-option value="32">32 px</fw-select-option>
        <fw-select-option value="48">48 px</fw-select-option>
        <fw-select-option value="64">64 px</fw-select-option>
        <fw-select-option value="128">128 px</fw-select-option>
      </fw-select>
</div>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('avatar-panel', AvatarPanel)
