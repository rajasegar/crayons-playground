import { LitElement, css, html } from 'lit'
import { store } from '../store'

class IconPanel extends LitElement {
  static get styles () {
    return css`
    h2 {
    background: yellow;
    }
    `
  }

  constructor () {
    super()
    this.addEventListener('fwInput', (ev) => {
      const id = this.dataset.id
      const propName = ev.path[0].dataset.property

      store.dispatch({
        type: 'UPDATE_PROPS',
        payload: {
          id,
          name: propName,
          value: ev.detail.value
        }
      })
      return true
    })
  }

  render () {
    return html`
    <h2>Icon</h2>
    <fw-input
  label="Name"
  placeholder="Enter your icon name"
  data-property="name">
</fw-input>
    `
  }
}

window.customElements.define('icon-panel', IconPanel)
