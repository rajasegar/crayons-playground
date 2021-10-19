import { store } from '../store'
import generateCode from '../generateCode'

class ToggleCodePanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwChange', () => {
      const codePanel = document.getElementById('code-panel')
      codePanel.innerHTML = ''
      store.dispatch({
        type: 'TOGGLE_CODE_PANEL',
      })

      const { showCode } = store.getState()
      if (showCode) {
        this.splitInstance = window.Split(['#editor', '#code-panel'], {
          sizes: [50, 50],
          direction: 'vertical',
        })
        const pre$ = document.createElement('pre')
        const code$ = document.createElement('code')
        code$.className = 'language-markup'

        code$.textContent = generateCode()
        pre$.appendChild(code$)
        codePanel.appendChild(pre$)
      } else {
        this.splitInstance.destroy()
        codePanel.innerHTML = ''
      }
    })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = `<style>
.container {
font-size: .85em;
padding: 0 1em;
}
</style>
<div class="container">Code Panel <fw-toggle size="small"></fw-toggle></div> `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('toggle-code-panel', ToggleCodePanel)
