import { store } from './store'

// Generic function to render components with children
const render = (name, props) => {
  const component = document.createElement(name)
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k])
    } else {
      component.innerHTML = props[k]
    }
  })

  return component
}

const renderWithChildren = (name, props, children) => {
  const component = document.createElement(name)

  // setting props
  Object.keys(props).forEach((k) => {
    component.setAttribute(k, props[k])
  })

  // children

  const { components, builderMode } = store.getState()
  children.forEach((id) => {
    const { type, props } = components[id]
    const preview = document.createElement('div')
    preview.id = id

    if (builderMode) {
      preview.className = 'preview-wrapper'
    }

    preview.onclick = (ev) => {
      ev.stopPropagation()
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

      default:
        throw new Error('renderWithChildren: Unknown component')
    }

    preview.appendChild(child)
    component.shadowRoot
      .getElementById('fw-flex-container')
      .appendChild(preview)
  })

  return component
}

const renderButton = (props) => {
  const component = document.createElement('fw-button')
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k])
    } else {
      component.innerHTML = props[k]
    }
  })

  return component
}

const renderCheckbox = (props) => {
  const component = document.createElement('fw-checkbox')
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k])
    } else {
      component.innerHTML = props[k]
    }
  })

  return component
}

const renderDropdownButton = (props) => {
  const component = document.createElement('fw-dropdown-button')
  Object.keys(props)
    .filter((k) => k !== 'options')
    .forEach((k) => {
      component.setAttribute(k, props[k])
    })

  const options = props.options

  const optionsDiv = document.createElement('div')
  optionsDiv.setAttribute('slot', 'dropdown-options')
  const opts = options
    .map((option) => {
      return `<option id="${option.id}" value="${option.value}">${option.label}</option>`
    })
    .join('\n')
  optionsDiv.innerHTML = opts
  component.appendChild(optionsDiv)

  return component
}

const renderSelect = (props) => {
  const component = document.createElement('fw-select')
  Object.keys(props)
    .filter((k) => k !== 'options')
    .forEach((k) => {
      component.setAttribute(k, props[k])
    })

  const options = props.options

  const opts = options
    .map((option) => {
      return `<fw-select-option value="${option.value}">${option.label}</fw-select-option>`
    })
    .join('\n')
  component.innerHTML = opts

  return component
}

export {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
  renderSelect,
  renderWithChildren,
}
