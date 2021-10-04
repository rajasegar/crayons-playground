import { store } from '../store'

const properties = {
  color: 'color',
  bg: 'backgroundColor',
}

class FWBox extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'bg']
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
    this.container.style.display = 'block'
    this.container.style.padding = '1em'

    Object.keys(properties).forEach((k) => {
      const _value = this.getAttribute(k)
      if (_value) {
        this.container.style[properties[k]] = _value
      }
    })
  }

  attributeChangedCallback() {
    this.applyStyles()
  }
}

customElements.define('fw-box', FWBox)
