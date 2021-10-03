import { store } from '../store'
import updateProps from '../updateProps'

class DatepickerPanel extends HTMLElement {
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
      <h2>Datepicker</h2>
      <fw-input label="Format" value="${props.dateformat}" data-property="date-format"></fw-input>
      <fw-select
        label="Mode"
        value=${props.mode}
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="mode"
      >
        <fw-select-option value="range">range</fw-select-option>
        <fw-select-option value="single-date">single-date</fw-select-option>
      </fw-select>

    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('datepicker-panel', DatepickerPanel)
