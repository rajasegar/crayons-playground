import { LitElement, html } from 'lit'
import { store } from './store'

class FWFlex extends LitElement {
  constructor () {
    super()
    this.addEventListener('fwChange', () => {
      store.dispatch({
        type: 'TOGGLE_BUILDER_MODE'
      })
      const editor = document.getElementById('editor')
      if (editor.className === 'builder-mode') {
        editor.className = ''
      } else {
        editor.className = 'builder-mode'
      }
    })
  }

  render () {
    return html`
    <div><slot></slot></div>
    `
  }
}

window.customElements.define('fw-flex', FWFlex)
