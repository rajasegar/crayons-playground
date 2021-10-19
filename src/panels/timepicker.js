import { store } from '../store'
import updateProps from '../updateProps'

class TimepickerPanel extends HTMLElement {
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
      <fw-input value="${props.format}" label="Format" data-property="format"></fw-input>
      <fw-input value="${props.interval}" label="Interval (in minutes)" data-property="interval" type="number"></fw-input>

      <fw-input value="${props.maxTime}" label="Max-Time" data-property="max-time"></fw-input>
      <fw-input value="${props.minTime}" label="Min-Time" data-property="min-time"></fw-input>
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('timepicker-panel', TimepickerPanel)
