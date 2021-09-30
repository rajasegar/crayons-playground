import {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
  renderSelect
} from './renderFunctions'

import { store } from './store'

export default function updateEditor () {
  const { components, builderMode } = store.getState()
  const editor = document.getElementById('editor')
  // clear editor
  editor.innerHTML = ''

  components.root.children.forEach(id => {
    const { type, props } = components[id]
    const preview = document.createElement('div')

    if (builderMode) {
      preview.className = 'preview-wrapper'
    }

    preview.onclick = () => {
      store.dispatch({
        type: 'SELECT_COMPONENT',
        payload: { selectedId: id }
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

      default:
        throw new Error('Unknown component')
    }

    preview.appendChild(child)
    editor.appendChild(preview)
  })
}
