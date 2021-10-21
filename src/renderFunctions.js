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

  const { components } = store.getState()
  children.forEach((id) => {
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

      case 'fw-icon':
      case 'fw-input':
      case 'fw-label':
      case 'fw-radio':
      case 'fw-datepicker':
      case 'fw-heading':
      case 'fw-text':
      case 'fw-tag':
      case 'fw-spinner':
      case 'fw-textarea':
      case 'fw-timepicker':
      case 'fw-toggle':
      case 'fw-modal':
      case 'fw-avatar':
        child = render(type, props)
        break

      case 'fw-flex':
      case 'fw-grid':
      case 'fw-box':
      case 'fw-tabs':
      case 'fw-tab':
        child = renderWithChildren(type, props, children)
        break

      default:
        console.error('renderWithChildren: Unknown component')
    }

    preview.appendChild(child)
    component.shadowRoot
      .querySelector('#fw-crayons-layout-container')
      .appendChild(preview)
  })

  return component
}

const renderButton = (props) => {
  const component = document.createElement('fw-button')
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      if (k === 'size' && props[k] === 'icon') {
        component.innerHTML = ''
        const icon = document.createElement('fw-icon')
        icon.setAttribute('name', props['icon'])
        component.appendChild(icon)
      }
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
