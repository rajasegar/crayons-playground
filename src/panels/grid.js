import updateProps from '../updateProps'
import { store } from '../store'
import '../crayons/fw-accordion'
import './children'

class GridPanel extends HTMLElement {
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
.container { padding: 1em; }
</style>
<fw-accordion heading="Grid Properties" open>
<div class="container">
      <fw-input label="Template Columns" value="${props['grid-template-columns']}" data-property="grid-template-columns"></fw-input>
      <fw-input label="Template Rows" value="${props['grid-template-rows']}" data-property="grid-template-rows"></fw-input>
      <fw-input label="Gap" value="${props['grid-gap']}" data-property="grid-gap"></fw-input>
      <fw-input label="Row Gap" value="${props['grid-row-gap']}" data-property="grid-row-gap"></fw-input>
      <fw-input label="Column Gap" value="${props['grid-column-gap']}" data-property="grid-column-gap"></fw-input>
      <fw-input label="Auto Columns" value="${props['grid-auto-columns']}" data-property="grid-auto-columns"></fw-input>
      <fw-input label="Column" value="${props['grid-column']}" data-property="grid-column"></fw-input>
      <fw-input label="Row" value="${props['grid-row']}" data-property="grid-row"></fw-input>
      <fw-input label="Auto Flow" value="${props['grid-auto-flow']}" data-property="grid-auto-flow"></fw-input>
      <fw-input label="Auto Rows" value="${props['grid-auto-rows']}" data-property="grid-auto-rows"></fw-input>
      <fw-input label="Area" value="${props['grid-area']}" data-property="grid-area"></fw-input>
      <fw-input label="Template Areas" value="${props['grid-template-areas']}" data-property="grid-templates-areas"></fw-input>
</div>
</fw-accordion>
<children-panel data-id="${this.dataset.id}"></children-panel>

    `

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('grid-panel', GridPanel)
