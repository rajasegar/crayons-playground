import { store } from '../store'

import '../panels/button'
import '../panels/icon'
import '../panels/flex'
import '../panels/checkbox'
import '../panels/grid'
import '../panels/heading'
import '../panels/text'

class InspectorPanel extends HTMLElement {
  static get observedAttributes() {
    return ['id']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.id = this.getAttribute('id') // selected component id

    this.addEventListener('fwClick', (ev) => {
      console.log(ev)
      const path = ev.path || (ev.composedPath && ev.composedPath())
      const buttonId = path[0].id
      console.log(buttonId)
      switch (buttonId) {
        case 'btn-copy-code':
          // dispatch copy code message
          break

        case 'btn-duplicate':
          // dispatch duplicate component message
          store.dispatch({ type: 'DUPLICATE_COMPONENT' })
          break

        case 'btn-reset-props':
          // dispatch reset props message
          store.dispatch({
            type: 'RESET_PROPS',
            payload: {
              componentId: this.id,
            },
          })
          break

        case 'btn-delete':
          // dispatch delete component  message
          store.dispatch({
            type: 'DELETE_COMPONENT',
            payload: { componentId: this.id },
          })
          break

        default:
          console.error('InspectorPanel: Unknown action button')
      }
    })

    this.render()
  }

  attributeChangedCallback(attr, oldAttr, newAttr) {
    if (attr === 'id' && oldAttr !== newAttr) {
      this.render()
    }
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    let panel = ''
    const { components } = store.getState()
    const { type } = components[this.id]

    switch (type) {
      case 'root':
        panel = '<div><h2>Document</h2></div>'
        break

      case 'fw-button':
        panel = `<button-panel data-id="${this.id}"></button-panel>`
        break

      case 'fw-checkbox':
        panel = `<checkbox-panel data-id="${this.id}"></checkbox-panel>`
        break

      case 'fw-dropdown-button':
        break

      case 'fw-select':
        break

      case 'fw-icon':
        panel = `<icon-panel data-id="${this.id}"></icon-panel>`
        break

      case 'fw-flex':
        panel = `<flex-panel data-id="${this.id}"></flex-panel>`
        break

      case 'fw-grid':
        panel = `<grid-panel data-id="${this.id}"></grid-panel>`
        break

      case 'fw-heading':
        panel = `<heading-panel data-id="${this.id}"></heading-panel>`
        break

      case 'fw-text':
        panel = `<text-panel data-id="${this.id}"></text-panel>`
        break

      case 'fw-input':
      case 'fw-label':
      case 'fw-radio':
      case 'fw-datepicker':
        break

      default:
        console.error('Inspector: Unknown component')
    }

    const actionButtons = `
    <fw-flex>
    <fw-button id="btn-copy-code" size="icon" title="Copy component code" color="secondary"><fw-icon name="code"></fw-icon> </fw-button>
    <fw-button id="btn-duplicate" size="icon" title="Duplicate" color="secondary"><fw-icon name="copy"></fw-icon> </fw-button>
    <fw-button id="btn-reset-props" size="icon" title="Reset props" color="secondary"><fw-icon name="refresh"></fw-icon> </fw-button>
    <fw-button id="btn-delete" size="icon" title="Delete" color="secondary"><fw-icon name="delete"></fw-icon> </fw-button>
    </fw-flex>
    `

    template.innerHTML = `
    <style>
      .inspector {
        background-color: var(--smoke);
        padding: 1em;
        border-left: 1px solid var(--elephant);
        height: 100%;
      }
    </style>
      <div class="inspector" id="inspector">
      ${this.id !== 'root' ? actionButtons : ''}
      ${panel}
      </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('inspector-panel', InspectorPanel)
