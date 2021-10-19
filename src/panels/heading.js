import { store } from '../store'
import updateProps from '../updateProps'

class HeadingPanel extends HTMLElement {
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
      <fw-input value="${props.children}" label="Children" data-property="children"></fw-input>

      <fw-select
        label="Level"
        value=${props.level}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="level"
      >
        <fw-select-option value="1">1</fw-select-option>
        <fw-select-option value="2">2</fw-select-option>
        <fw-select-option value="3">3</fw-select-option>
        <fw-select-option value="4">4</fw-select-option>
        <fw-select-option value="5">5</fw-select-option>
        <fw-select-option value="6">6</fw-select-option>
      </fw-select>

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
      <fw-flex justify-content="space-around">
      <fw-checkbox data-property="font-weight" value="bold">Bold</fw-checkbox>
      <fw-checkbox data-property="font-style" value="italic">Italic</fw-checkbox>
      </fw-flex>
      <fw-input label="Line Height" data-property="line-height"></fw-input>
      <fw-input label="Letter Spacing" data-property="letter-spacing"></fw-input>
      <p><label for="txtColor">Color:</label></p>
      <input id="txtColor" type="color" data-property="color"/>
</div>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('heading-panel', HeadingPanel)
