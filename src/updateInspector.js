import './panels/button'

export default function updateInspector (state) {
  const { components, selectedId } = state
  const inspector = document.getElementById('inspector')

  const { type } = components[selectedId]
  switch (type) {
    case 'fw-button':
      inspector.innerHTML = `<button-panel data-id="${selectedId}"></button-panel>`
      break

    case 'fw-checkbox':
      break

    case 'fw-dropdown-button':
      break

    case 'fw-select':
      break

    case 'fw-icon':
    case 'fw-input':
    case 'fw-label':
    case 'fw-radio':
    case 'fw-datepicker':
      break

    default:
      throw new Error('Unknown component')
  }
}
