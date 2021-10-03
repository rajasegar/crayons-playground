import { store } from '../store'

class ToggleBuilderMode extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwChange', () => {
      console.log('toggle builder mode')
      store.dispatch({
        type: 'TOGGLE_BUILDER_MODE',
      })
      const editor = document.getElementById('editor')
      if (editor.className === 'builder-mode') {
        editor.className = ''
      } else {
        editor.className = 'builder-mode'
      }
    })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = `
      <div>Builder Mode <fw-toggle size="small" checked></fw-toggle></div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('toggle-builder-mode', ToggleBuilderMode)
