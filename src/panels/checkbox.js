import updateProps from '../updateProps'
import { store } from '../store'

class CheckboxPanel extends HTMLElement {
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
      <fw-input label="Children" value="${props.children}" data-property="children"></fw-input>
      <label>Checked:</label>
      <fw-toggle checked="${props.checked}" data-property="checked"></fw-toggle>
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('checkbox-panel', CheckboxPanel)
