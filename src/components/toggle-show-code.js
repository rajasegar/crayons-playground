import { LitElement, html } from 'lit'
import { store } from '../store'
import generateCode from '../generateCode'

class ToggleCodePanel extends LitElement {
  constructor() {
    super()
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
  }

  render() {
    return html` <div>Code Panel <fw-toggle size="small"></fw-toggle></div> `
  }
}

window.customElements.define('toggle-code-panel', ToggleCodePanel)
