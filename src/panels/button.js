import { store } from '../store'
import updateProps from '../updateProps'

class ButtonPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwInput', (ev) => {
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
    padding: 0.5em;
    }
    </style>
    <div class="container">
      <fw-input value="${
        props.id || ''
      }" label="id" data-property="id"></fw-input>
      <fw-input value="${
        props.children
      }" label="Children" data-property="children"></fw-input>
      <fw-select
        label="Color"
        value=${props.color}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="color"
      >
        <fw-select-option value="primary">primary</fw-select-option>
        <fw-select-option value="secondary">secondary</fw-select-option>
        <fw-select-option value="danger">danger</fw-select-option>
        <fw-select-option value="link">link</fw-select-option>
        <fw-select-option value="text">text</fw-select-option>
      </fw-select>

      <fw-select
        label="Size"
        value=${props.size}
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="size"
      >
        <fw-select-option value="normal">normal</fw-select-option>
        <fw-select-option value="mini">mini</fw-select-option>
        <fw-select-option value="small">small</fw-select-option>
        <fw-select-option value="icon">icon</fw-select-option>
      </fw-select>
      <fw-input placeholder="icon name" label="Icon" data-property="icon"></fw-input>
      <fw-input placeholder="prop=value" label="Custom Prop" data-property="custom-prop"></fw-input>
      </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('button-panel', ButtonPanel)
