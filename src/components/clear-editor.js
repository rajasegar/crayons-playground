import { store } from '../store'

const template = document.createElement('template')
template.innerHTML = `
<style>
.container { 
padding: 0 1em;
}
button {
background: transparent;
color: white;
border: none;
cursor: pointer;
font-size: 0.85em;
}
</style>
<div class="container">
<button id="btn-clear-editor" type="button" title="Clear Editor">
Clear <fw-icon size="8" name="cross-big" color="white"></fw-icon>
</button>
</div>
`
class ClearEditor extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const btn$ = this.shadowRoot.querySelector('#btn-clear-editor')
    btn$.addEventListener('click', (ev) => {
      if (confirm('Are you sure want to clear the editor?')) {
        store.dispatch({ type: 'CLEAR_EDITOR' })
      }
    })
  }
}

window.customElements.define('clear-editor', ClearEditor)
