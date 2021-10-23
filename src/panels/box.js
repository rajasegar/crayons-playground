import { store } from '../store'
import updateProps from '../updateProps'
import './children'

class BoxPanel extends HTMLElement {
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
summary {
  padding: .5em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

summary:hover {
background-color: white;
}

.details-container {
padding: 0.5em;
}

.container {
padding: 1em;
}
</style>
      <details>
      <summary>Margin</summary>
      <div class="details-container">
      <fw-input  value="${
        props.m || ''
      }" label="All" data-property="m"></fw-input>
      <fw-grid grid-template-columns="repeat(2,1fr" grid-gap="20px">
      <fw-input data-property="mt" placeholder="↑ top"></fw-input>
      <fw-input data-property="mb" placeholder="↓ bottom"></fw-input>
      <fw-input data-property="ml" placeholder="← left"></fw-input>
      <fw-input data-property="mr" placeholder="→ right"></fw-input>
      </fw-grid>
      </div>
      </details>
      <details>
      <summary>Padding</summary>
      <div class="details-container">
      <fw-input  label="All" data-property="p"></fw-input>
      <fw-grid grid-template-columns="repeat(2,1fr" grid-gap="20px">
      <fw-input data-property="pt" placeholder="↑ top"></fw-input>
      <fw-input data-property="pb" placeholder="↓ bottom"></fw-input>
      <fw-input data-property="pl" placeholder="← left"></fw-input>
      <fw-input data-property="pr" placeholder="→ right"></fw-input>
      </fw-grid>
      </div>
      </details>

<div class="container">
      <p><label for="txtBg">Background color:</label></p>
      <input id="txtBg" type="color" data-property="bg"/>
      <p><label for="txtColor">Color:</label></p>
      <input id="txtColor" type="color" data-property="color"/>
</div>
<children-panel data-id="${this.dataset.id}"></children-panel>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('box-panel', BoxPanel)
