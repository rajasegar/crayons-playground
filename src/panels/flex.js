import updateProps from '../updateProps'
import { store } from '../store'

class FlexPanel extends HTMLElement {
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
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = `
<style>
.container { padding: 1em; }
</style>

<div class="container">
      <fw-select
        label="Flex Direction"
        value=${props['flex-direction']}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="flex-direction"
      >
        <fw-select-option value="row">row</fw-select-option>
        <fw-select-option value="row-reverse">row-reverse</fw-select-option>
        <fw-select-option value="column">column</fw-select-option>
        <fw-select-option value="column-reverse"
          >column-reverse</fw-select-option
        >
      </fw-select>

      <fw-select
        label="Justify Content"
        value=${props['justify-content']}
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="justify-content"
      >
        <fw-select-option value="center">center</fw-select-option>
        <fw-select-option value="space-between">space-between</fw-select-option>
        <fw-select-option value="space-around">space-around</fw-select-option>
        <fw-select-option value="space-evenly">space-evenly</fw-select-option>
      </fw-select>

      <fw-select
        label="Align Items"
        value=${props['align-items']}
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="align-items"
      >
        <fw-select-option value="stretch">stretch</fw-select-option>
        <fw-select-option value="flex-start">flex-start</fw-select-option>
        <fw-select-option value="center">center</fw-select-option>
        <fw-select-option value="flex-end">flex-end</fw-select-option>
        <fw-select-option value="space-between">space-between</fw-select-option>
        <fw-select-option value="space-around">space-around</fw-select-option>
      </fw-select>
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('flex-panel', FlexPanel)
