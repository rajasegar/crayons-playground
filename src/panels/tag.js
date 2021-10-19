import { store } from '../store'
import updateProps from '../updateProps'

class TagPanel extends HTMLElement {
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
      <fw-input value="${props.text}" label="Text" data-property="text"></fw-input>
</div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('tag-panel', TagPanel)
