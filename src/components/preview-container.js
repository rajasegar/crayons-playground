import { store } from '../store'

const template = document.createElement('template')
template.innerHTML = `
<style>
.preview-wrapper {
  margin: 0.25em;
  padding: 0.25em;
  border: 1px dashed black;
}
.preview-wrapper:hover {
  border: 1px solid var(--elephant);
}
</style>
<div><slot></slot></div>
`
class PreviewContainer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const div$ = this.shadowRoot.querySelector('div')
    const { builderMode } = store.getState()
    if (builderMode) {
      div$.className = 'preview-wrapper'
    }
    div$.onclick = (ev) => {
      ev.stopPropagation()
      store.dispatch({
        type: 'SELECT_COMPONENT',
        payload: { selectedId: this.getAttribute('id') },
      })
    }
  }
}

window.customElements.define('preview-container', PreviewContainer)
