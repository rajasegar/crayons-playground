import { store } from '../store'
import updateProps from '../updateProps'

class BoxPanel extends HTMLElement {
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
summary {
  padding: .5em 0;
  cursor: pointer;
}

summary:hover {
background-color: white;
}

details {
  margin-bottom: .5em;
}
</style>
      <h2>Box</h2>
      <details>
      <summary>Margin</summary>
      <div>
      <fw-input  value="${props.m}" label="All" data-property="m"></fw-input>
      <fw-grid template-columns="repeat(2,1fr" gap="20px">
      <fw-input data-property="mt" placeholder="↑ top"></fw-input>
      <fw-input data-property="mb" placeholder="↓ bottom"></fw-input>
      <fw-input data-property="ml" placeholder="← left"></fw-input>
      <fw-input data-property="mr" placeholder="→ right"></fw-input>
      </fw-grid>
      </div>
      </details>
      <details>
      <summary>Padding</summary>
      <div>
      <fw-input  label="All" data-property="p"></fw-input>
      <fw-grid template-columns="repeat(2,1fr" gap="20px">
      <fw-input data-property="pt" placeholder="↑ top"></fw-input>
      <fw-input data-property="pb" placeholder="↓ bottom"></fw-input>
      <fw-input data-property="pl" placeholder="← left"></fw-input>
      <fw-input data-property="pr" placeholder="→ right"></fw-input>
      </fw-grid>
      </div>
      </details>

    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('box-panel', BoxPanel)
