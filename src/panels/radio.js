import { store } from '../store'
import updateProps from '../updateProps'

class RadioPanel extends HTMLElement {
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
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('radio-panel', RadioPanel)
