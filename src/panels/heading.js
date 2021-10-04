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
      <h2>Heading</h2>
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
      <p><label for="txtColor">Color:</label></p>
      <input id="txtColor" type="color" data-property="color"/>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('heading-panel', HeadingPanel)
