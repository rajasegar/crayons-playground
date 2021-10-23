import { store } from '../store'

import getComponentNameFromType from '../utils/getComponentNameFromType'

import '../panels/default'

class InspectorPanel extends HTMLElement {
  static get observedAttributes() {
    return ['id']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.id = this.getAttribute('id') // selected component id

    this.addEventListener('fwClick', (ev) => {
      const path = ev.path || (ev.composedPath && ev.composedPath())
      const buttonId = path[0].id
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

        case 'btn-crayon-docs':
          this._openDocs()
          break

        default:
          console.error('InspectorPanel: Unknown action button')
      }
    })

    this.render()
  }

  _openDocs() {
    const { components } = store.getState()
    const { type } = components[this.id]
    const name = type.replace('fw-', '')
    const url = `https://crayons.freshworks.com/components/${name}/#usage`
    window.open(url, '_blank')
  }

  attributeChangedCallback(attr, oldAttr, newAttr) {
    if (attr === 'id' && oldAttr !== newAttr) {
      this.render()
    }
  }

  render() {
    this.shadowRoot.innerHTML = ''
    let panel = ''
    const { components } = store.getState()
    const { type } = components[this.id]

    switch (type) {
      case 'root':
        panel = `<root-panel data-id="${this.id}"></root-panel>`
        import(
          /* webpackChunkName: "root-panel" */
          /* webpackMode: "lazy" */
          /* webpackExports: ["default", "named"] */
          '../panels/root'
        ).then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-button':
        panel = `<button-panel data-id="${this.id}"></button-panel>`
        import('../panels/button').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-checkbox':
        panel = `<checkbox-panel data-id="${this.id}"></checkbox-panel>`
        import('../panels/checkbox').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-select':
        panel = `<select-panel data-id="${this.id}"></select-panel>`
        import('../panels/select').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-icon':
        panel = `<icon-panel data-id="${this.id}"></icon-panel>`
        import('../panels/icon').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-flex':
        panel = `<flex-panel data-id="${this.id}"></flex-panel>`
        import('../panels/flex').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-grid':
        panel = `<grid-panel data-id="${this.id}"></grid-panel>`
        import('../panels/grid').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-box':
        panel = `<box-panel data-id="${this.id}"></box-panel>`
        import('../panels/box').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-heading':
        panel = `<heading-panel data-id="${this.id}"></heading-panel>`
        import('../panels/heading').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-text':
        panel = `<text-panel data-id="${this.id}"></text-panel>`
        import('../panels/text').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-dropdown-button':
        panel = `<dropdown-button-panel data-id="${this.id}"></dropdown-button-panel>`
        import('../panels/dropdown-button').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-input':
        panel = `<input-panel data-id="${this.id}"></input-panel>`
        import('../panels/input').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-label':
        panel = `<label-panel data-id="${this.id}"></label-panel>`
        import('../panels/label').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-radio':
        panel = `<radio-panel data-id="${this.id}"></radio-panel>`
        import('../panels/radio').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-datepicker':
        panel = `<datepicker-panel data-id="${this.id}"></datepicker-panel>`
        import('../panels/datepicker').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-spinner':
        panel = `<spinner-panel data-id="${this.id}"></spinner-panel>`
        import('../panels/spinner').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-tag':
        panel = `<tag-panel data-id="${this.id}"></tag-panel>`
        import('../panels/tag').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-textarea':
        panel = `<textarea-panel data-id="${this.id}"></textarea-panel>`
        import('../panels/textarea').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-timepicker':
        panel = `<timepicker-panel data-id="${this.id}"></timepicker-panel>`
        import('../panels/timepicker').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-toggle':
        panel = `<toggle-panel data-id="${this.id}"></toggle-panel>`
        import('../panels/toggle').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-modal':
        panel = `<modal-panel data-id="${this.id}"></modal-panel>`
        import('../panels/modal').then(() => {
          this.renderPanel(type, panel)
        })
        break

      case 'fw-avatar':
        panel = `<avatar-panel data-id="${this.id}"></avatar-panel>`
        import('../panels/avatar').then(() => {
          this.renderPanel(type, panel)
        })
        break

      default:
        panel = `<default-panel data-id="${this.id}"></default-panel>`
        console.error('Inspector: Unknown component')
    }
  }

  renderPanel(type, panel) {
    const template = document.createElement('template')
    const actionButtons = `
    <fw-flex>
    <fw-button id="btn-copy-code" size="icon" title="Copy component code" color="secondary"><fw-icon name="code"></fw-icon> </fw-button>
    <fw-button id="btn-duplicate" size="icon" title="Duplicate" color="secondary"><fw-icon name="copy"></fw-icon> </fw-button>
    <fw-button id="btn-reset-props" size="icon" title="Reset props" color="secondary"><fw-icon name="refresh"></fw-icon> </fw-button>
    <fw-button id="btn-crayon-docs" size="icon" title="Crayon Docs" color="secondary"><fw-icon name="add-note"></fw-icon> </fw-button>
    <fw-button id="btn-delete" size="icon" title="Delete" color="secondary"><fw-icon name="delete"></fw-icon> </fw-button>
    </fw-flex>
    `

    template.innerHTML = `
    <style>
      .inspector {
        background-color: var(--smoke);
        border-left: 1px solid var(--elephant);
        height: 100%;
      }
      fw-button {
      margin: 0 0.5em;
      }
      h3 {
      padding: 0.25em 0.5em;
      margin: 0;
      background: #fefcbf;
      color: #5f370e;
      }
    </style>
      <div class="inspector" id="inspector">
      <h3>${getComponentNameFromType(type)}</h3>
      ${this.id !== 'root' ? actionButtons : ''}
      ${panel}
      </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('inspector-panel', InspectorPanel)
