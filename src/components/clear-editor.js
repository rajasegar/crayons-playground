import { store } from '../store'

const template = document.createElement('template')
template.innerHTML = `
<style>
textarea { display: none; }
button {
background: transparent;
color: white;
border: none;
cursor: pointer;
}
</style>
<div>
<button id="btn-clear-editor" type="button">Clear Editor</button>
</div>
`
class ClearEditor extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const btn$ = this.shadowRoot.querySelector('#btn-clear-editor')
    btn$.addEventListener('click', (ev) => {
      store.dispatch({ type: 'CLEAR_EDITOR' })
    })
  }
}

window.customElements.define('clear-editor', ClearEditor)
