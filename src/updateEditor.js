import {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
  renderSelect,
  renderWithChildren,
} from './renderFunctions'

import { store } from './store'

import './crayons/fw-flex'
import './crayons/fw-grid'
import './crayons/fw-heading'
import './crayons/fw-text'
import './crayons/fw-box'

import './previews/modal'

export default function updateEditor() {
  const { components, builderMode } = store.getState()
  const editor = document.getElementById('editor')
  editor.onclick = () => {
    store.dispatch({
      type: 'SELECT_COMPONENT',
      payload: { selectedId: 'root' },
    })
  }
  // clear editor
  editor.innerHTML = ''

  components.root.children.forEach((id) => {
    const { type, props, children } = components[id]
    const preview = document.createElement('div')
    preview.id = id

    if (builderMode) {
      preview.className = 'preview-wrapper'
    }

    preview.onclick = (ev) => {
      ev.stopImmediatePropagation()
      store.dispatch({
        type: 'SELECT_COMPONENT',
        payload: { selectedId: id },
      })
    }

    let child
    switch (type) {
      case 'fw-button':
        child = renderButton(props)
        break

      case 'fw-checkbox':
        child = renderCheckbox(props)
        break

      case 'fw-dropdown-button':
        child = renderDropdownButton(props)
        break

      case 'fw-select':
        child = renderSelect(props)
        break

      case 'fw-icon':
      case 'fw-input':
      case 'fw-label':
      case 'fw-radio':
      case 'fw-datepicker':
      case 'fw-heading':
      case 'fw-text':
      case 'fw-spinner':
      case 'fw-tabs':
      case 'fw-tag':
      case 'fw-textarea':
      case 'fw-timepicker':
      case 'fw-toast':
      case 'fw-toggle':
        child = render(type, props)
        break

      case 'fw-flex':
      case 'fw-grid':
      case 'fw-box':
        child = renderWithChildren(type, props, children)
        break

      case 'fw-modal':
        child = renderWithChildren('modal-preview', props, children)
        break

      default:
        console.error('Editor: Unknown component')
    }

    preview.appendChild(child)
    editor.appendChild(preview)
  })
}
