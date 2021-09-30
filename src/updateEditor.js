import {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
  renderSelect
} from './renderFunctions'

export default function updateEditor (components) {
  const editor = document.getElementById('editor')
  // clear editor
  editor.innerHTML = ''

  components.root.children.forEach(id => {
    const { type, props } = components[id]
    let child
    switch (type) {
      case 'fw-button':
        child = renderButton(props)
        editor.appendChild(child)
        break

      case 'fw-checkbox':
        child = renderCheckbox(props)
        editor.appendChild(child)
        break

      case 'fw-dropdown-button':
        child = renderDropdownButton(props)
        editor.appendChild(child)
        break

      case 'fw-select':
        child = renderSelect(props)
        editor.appendChild(child)
        break

      case 'fw-icon':
      case 'fw-input':
      case 'fw-label':
      case 'fw-radio':
      case 'fw-datepicker':
        child = render(type, props)
        editor.appendChild(child)
        break

      default:
        throw new Error('Unknown component')
    }
  })
}
