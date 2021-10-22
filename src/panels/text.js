import { store } from '../store'
import updateProps from '../updateProps'
import '../components/color-chooser'
import './style-props'

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
<style>
.container {
padding: 1em;
}
</style>
<div class="container">
      <fw-textarea value="${props.children}" label="Children" data-property="children"></fw-textarea>

      <fw-select
        label="Text Align"
        value=${props['text-align']}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="text-align"
      >
        <fw-select-option value="left">left</fw-select-option>
        <fw-select-option value="center">center</fw-select-option>
        <fw-select-option value="right">right</fw-select-option>
        <fw-select-option value="justify">justify</fw-select-option>
      </fw-select>
      <fw-flex justify-content="space-between">
      <fw-checkbox data-property="font-weight" value="bold">Bold</fw-checkbox>
      <fw-checkbox data-property="font-style" value="italic">Italic</fw-checkbox>
      </fw-flex>
      <fw-input label="Line Height" data-property="line-height"></fw-input>
      <fw-input label="Letter Spacing" data-property="letter-spacing"></fw-input>
<color-chooser data-id="${this.dataset.id}"></color-chooser>
      <p><label for="txtColor">Custom Color:</label></p>
      <input id="txtColor" type="color" data-property="color"/>
</div>
<styleprops-panel data-id="${this.dataset.id}"></styleprops-panel>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('text-panel', TextPanel)
