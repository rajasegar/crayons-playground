import { store } from '../store'

class FWFlex extends HTMLElement {
  static get observedAttributes() {
    return ['flex-direction', 'justify-content', 'align-items']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = '<div id="fw-crayons-layout-container"><slot></slot></div>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.getElementById('fw-crayons-layout-container')
    this.container.addEventListener('drop', (ev) => {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      const id = ev.dataTransfer.getData('id')
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
