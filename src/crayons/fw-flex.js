import { store } from '../store'

const template = document.createElement('template')
template.innerHTML = `
<style>
.preview-wrapper {
  margin: 0.25em;
  padding: 0.5em;
  border: 1px dashed black;
}

.preview-wrapper:hover {
  border: 1px solid var(--elephant);
}
</style>
  <div id="fw-flex-container"><slot></slot></div>`
class FWFlex extends HTMLElement {
  static get observedAttributes() {
    return ['flex-direction', 'justify-content', 'align-items']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.getElementById('fw-flex-container')
    this.container.addEventListener('drop', (ev) => {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      const id = ev.dataTransfer.getData('id')
      // ev.target.appendChild(document.getElementById(id));
      const parentId = this.parentNode.id
      const payload = {
        type: id,
        parentName: parentId,
        rootParentType: 'root',
      }

      store.dispatch({ type: 'ADD_COMPONENT', payload })
    })

    this.container.addEventListener('dragover', (ev) => {
      ev.preventDefault()
    })

    this.applyStyles()
  }

  applyStyles() {
    this.container.style.display = 'flex'
    this.container.style.padding = '1em'
    const flexDirection = this.getAttribute('flex-direction')
    if (flexDirection) {
      this.container.style.flexDirection = flexDirection
    }
    const justifyContent = this.getAttribute('justify-content')
    if (justifyContent) {
      this.container.style.justifyContent = justifyContent
    }
  }

  attributeChangedCallback() {
    this.applyStyles()
  }
}

customElements.define('fw-flex', FWFlex)
