import { store } from '../store'
import updateProps from '../updateProps'

class DropdownButtonPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwChange', (ev) => {
      const id = this.dataset.id
      updateProps(ev, id)
      /*
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
      */
    })

    this.render()
  }

  render() {
    const { components } = store.getState()
    const { props } = components[this.dataset.id]
    const template = document.createElement('template')
    template.innerHTML = `
      <h2>Dropdown Button</h2>
      <fw-select
        label="Color"
        value=${props.color}
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

      <fw-input value="${props.label}" label="Label" data-property="label"></fw-input>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('dropdown-button-panel', DropdownButtonPanel)
