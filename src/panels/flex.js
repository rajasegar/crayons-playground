import { LitElement, css, html } from 'lit'
import updateProps from '../updateProps'

class FlexPanel extends LitElement {
  static get styles() {
    return css`
      h2 {
        background: yellow;
      }
    `
  }

  constructor() {
    super()
    this.addEventListener('fwChange', (ev) => {
      const id = this.dataset.id

      updateProps(ev, id)
    })
  }

  render() {
    return html`
      <h2>Flex</h2>
      <fw-select
        label="Flex Direction"
        value="secondary"
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="flex-direction"
      >
        <fw-select-option value="row">row</fw-select-option>
        <fw-select-option value="row-reverse">row-reverse</fw-select-option>
        <fw-select-option value="column">column</fw-select-option>
        <fw-select-option value="column-reverse"
          >column-reverse</fw-select-option
        >
      </fw-select>

      <fw-select
        label="Justify Content"
        value="normal"
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="justify-content"
      >
        <fw-select-option value="center">center</fw-select-option>
        <fw-select-option value="space-between">space-between</fw-select-option>
        <fw-select-option value="space-around">space-around</fw-select-option>
        <fw-select-option value="space-evenly">space-evenly</fw-select-option>
      </fw-select>

      <fw-select
        label="Align Items"
        value="normal"
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="align-items"
      >
        <fw-select-option value="normal">normal</fw-select-option>
        <fw-select-option value="mini">mini</fw-select-option>
        <fw-select-option value="small">small</fw-select-option>
      </fw-select>
    `
  }
}

window.customElements.define('flex-panel', FlexPanel)
