import { LitElement, css, html } from 'lit'
import { store } from '../store'

class ButtonPanel extends LitElement {
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
      debugger
      const path = ev.path || (ev.composedPath && ev.composedPath())
      const propName = path[0].dataset.property

      store.dispatch({
        type: 'UPDATE_PROPS',
        payload: {
          id,
          name: propName,
          value: ev.detail.value,
        },
      })
    })
  }

  render() {
    return html`
      <h2>Button</h2>
      <fw-select
        label="Color"
        value="secondary"
        placeholder="Your choice"
        data-id="${this.dataset.id}"
        data-property="color"
      >
        <fw-select-option value="primary">primary</fw-select-option>
        <fw-select-option value="secondary">secondary</fw-select-option>
        <fw-select-option value="danger">danger</fw-select-option>
        <fw-select-option value="link">link</fw-select-option>
        <fw-select-option value="text">text</fw-select-option>
      </fw-select>

      <fw-select
        label="Size"
        value="normal"
        placeholder="Select size"
        data-id="${this.dataset.id}"
        data-property="size"
      >
        <fw-select-option value="normal">normal</fw-select-option>
        <fw-select-option value="mini">mini</fw-select-option>
        <fw-select-option value="small">small</fw-select-option>
      </fw-select>
    `
  }
}

window.customElements.define('button-panel', ButtonPanel)
