import { store } from '../store'

class FWBox extends HTMLElement {
  static get observedAttributes() {
    return [
      'color',
      'bg',
      'm',
      'p',
      'mt',
      'mr',
      'mb',
      'ml',
      'mx',
      'my',
      'pt',
      'pr',
      'pb',
      'pl',
      'px',
      'py',
    ]
  }

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

    const properties = {
      color: 'color',
      bg: 'backgroundColor',
      m: 'margin',
      p: 'padding',
      mt: 'marginTop',
      mr: 'marginRight',
      mb: 'marginBottom',
      ml: 'marginLeft',
      pt: 'paddingTop',
      pr: 'paddingRight',
      pb: 'paddingBottom',
      pl: 'paddingLeft',
    }
    Object.keys(properties).forEach((k) => {
      const _value = this.getAttribute(k)
      if (_value) {
        switch (k) {
          case 'mx':
            this.container.style.marginRight = _value
            this.container.style.marginLeft = _value
            break

          case 'my':
            this.container.style.marginTop = _value
            this.container.style.marginBottom = _value
            break

          case 'px':
            this.container.style.paddingLeft = _value
            this.container.style.paddingRight = _value
            break

          case 'py':
            this.container.style.paddingBottom = _value
            this.container.style.paddingTop = _value
            break

          default:
            this.container.style[properties[k]] = _value
        }
      }
    })
  }

  attributeChangedCallback() {
    this.applyStyles()
  }
}

customElements.define('fw-box', FWBox)
