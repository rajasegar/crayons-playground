// Generic function to render components with children
const render = (name, props) => {
  const component = document.createElement(name);
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

const renderButton = (props) => {
  const component = document.createElement('fw-button');
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

const renderCheckbox = (props) => {
  const component = document.createElement('fw-checkbox');
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

const renderDropdownButton = (props) => {
  const component = document.createElement('fw-dropdown-button');
  Object.keys(props)
    .filter((k) => k !== 'options')
    .forEach((k) => {
      component.setAttribute(k, props[k]);
    });

  const options = props['options'];

  const optionsDiv = document.createElement('div');
  optionsDiv.setAttribute('slot', 'dropdown-options');
  const opts = options
    .map((option) => {
      return `<option id="${option.id}" value="${option.value}">${option.label}</option>`;
    })
    .join('\n');
  optionsDiv.innerHTML = opts;
  component.appendChild(optionsDiv);

  return component;
};

const renderDatepicker = (props) => {
  const component = document.createElement('fw-datepicker');
  Object.keys(props).forEach((k) => {
    if (k !== 'children') {
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

export {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
  renderDatepicker,
};
