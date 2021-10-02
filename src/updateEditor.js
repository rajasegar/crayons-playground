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

export default function updateEditor() {
  const { components, builderMode } = store.getState()
  const editor = document.getElementById('editor')
  // clear editor
  editor.innerHTML = ''

  components.root.children.forEach((id) => {
    const { type, props, children } = components[id]
    const preview = document.createElement('div')
    preview.id = id

    if (builderMode) {
      preview.className = 'preview-wrapper'
    }

    preview.onclick = () => {
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
        child = render(type, props)
        break

      case 'fw-flex':
        child = renderWithChildren('fw-flex', props, children)
        break

      default:
        console.error('Editor: Unknown component')
    }

    preview.appendChild(child)
    editor.appendChild(preview)
  })
}
