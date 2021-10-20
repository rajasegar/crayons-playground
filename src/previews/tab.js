import { store } from '../store'

class TabPreview extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML =
      '<div id="fw-crayons-layout-container"><slot></slot></div>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.getElementById(
      'fw-crayons-layout-container'
    )
    this.container.addEventListener('drop', (ev) => {
      debugger
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

    this.container.style.display = 'block'
    this.container.style.padding = '1em'
  }
}

window.customElements.define('tab-preview', TabPreview)
