import updateProps from '../updateProps'
import { store } from '../store'

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
      <h2>Grid</h2>
      <fw-input label="Template Columns" value="${props['template-columns']}" data-property="template-columns"></fw-input>
      <fw-input label="Template Rows" value="${props['template-rows']}" data-property="template-rows"></fw-input>
      <fw-input label="Gap" value="${props.gap}" data-property="gap"></fw-input>
      <fw-input label="Row Gap" value="${props['row-gap']}" data-property="row-gap"></fw-input>
      <fw-input label="Column Gap" value="${props['column-gap']}" data-property="column-gap"></fw-input>
      <fw-input label="Auto Columns" value="${props['auto-columns']}" data-property="auto-columns"></fw-input>
      <fw-input label="Column" value="${props.column}" data-property="column"></fw-input>
      <fw-input label="Row" value="${props.row}" data-property="row"></fw-input>
      <fw-input label="Auto Flow" value="${props['auto-flow']}" data-property="auto-flow"></fw-input>
      <fw-input label="Auto Rows" value="${props['auto-rows']}" data-property="auto-rows"></fw-input>
      <fw-input label="Area" value="${props.area}" data-property="area"></fw-input>
      <fw-input label="Template Areas" value="${props['template-areas']}" data-property="templates-areas"></fw-input>

    `

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('grid-panel', GridPanel)
