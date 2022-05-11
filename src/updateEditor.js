import {
  render,
  renderAccordion,
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
import './crayons/fw-avatar'

import './previews/modal'
import './previews/tabs'
import './previews/tab'
import './previews/accordion'

import './components/preview-container'

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
    const preview = document.createElement('preview-container')
    preview.setAttribute('id', id)

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

      case 'fw-accordion':
        child = renderAccordion(props)
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
      case 'fw-avatar':
        child = render(type, props)
        break

      case 'fw-flex':
      case 'fw-grid':
      case 'fw-box':
      case 'fw-tabs':
        child = renderWithChildren(type, props, children)
        break

      case 'fw-modal':
        child = renderWithChildren('modal-preview', props, children)
        break

      case 'fw-tabs':
        child = renderWithChildren('tabs-preview', props, children)
        break

      case 'fw-tab':
        child = renderWithChildren('tab-preview', props, children)
        break

      default:
        console.error('Editor: Unknown component')
    }

    preview.appendChild(child)
    editor.appendChild(preview)
  })
}
