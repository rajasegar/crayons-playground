import defaultProps from './defaultProps';
import {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
} from './renderFunctions';

export default function handleDrop(ev) {
  ev.preventDefault();
  ev.stopImmediatePropagation();
  const id = ev.dataTransfer.getData('id');
  const props = defaultProps[id];
  let child;
  switch (id) {
    case 'fw-button':
      child = renderButton(props);
      ev.target.appendChild(child);
      break;

    case 'fw-checkbox':
      child = renderCheckbox(props);
      ev.target.appendChild(child);
      break;

    case 'fw-dropdown-button':
      child = renderDropdownButton(props);
      ev.target.appendChild(child);
      break;

    case 'fw-datepicker':
      child = render(id, props);
      ev.target.appendChild(child);
      break;

    case 'fw-icon':
    case 'fw-input':
    case 'fw-label':
      child = render(id, props);
      ev.target.appendChild(child);
      break;

    default:
      throw new Error('Unknown component');
  }
}
