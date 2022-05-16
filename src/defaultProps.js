const defaultProps = {
  'fw-button': {
    children: 'Hello',
    color: 'secondary',
    size: 'normal',
    id: 'my-btn-1',
  },
  'fw-checkbox': {
    children: 'I Agree',
    checked: true,
    label: '',
  },
  'fw-dropdown-button': {
    label: 'Choose the status',
    options: [
      { id: '1', value: 'Open', label: 'Open' },
      { id: '2', value: 'Pending', label: 'Pending' },
      { id: '3', value: 'Closed', label: 'Closed' },
    ],
  },
  'fw-datepicker': {
    value: '29-09-2021',
    dateformat: 'DD-MM-YYYY',
  },
  'fw-icon': {
    name: 'add-contact',
    size: '18',
    color: 'red',
  },
  'fw-input': {
    label: 'Name',
    'state-text': 'Do not enter your user ID',
    state: 'warning',
    placeholder: 'Enter your official name',
    required: true,
    'clear-input': true,
  },
  'fw-label': {
    value: 'Meta Information',
    color: 'blue',
  },
  'fw-radio': {
    checked: true,
    label: 'Select to agree',
    children: 'Agree or Disagree',
  },
  'fw-select': {
    value: '1',
    placeholder: 'Your choice',
    options: [
      { value: 1, label: 'Normal' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'High' },
      { value: 4, label: 'Low' },
    ],
  },
  'fw-flex': {},
  'fw-grid': {
    'grid-template-columns': 'repeat(4, 1fr)',
    'grid-gap': '20px',
  },
  'fw-box': {},
  'fw-heading': {
    level: '1',
    children: 'Hello world',
  },
  'fw-text': {
    children: 'This is a paragraph',
  },
  'fw-tag': {
    text: 'Pending',
  },
  'fw-textarea': {
    label: 'Address',
    state: 'warning',
    'state-text': 'Do not enter your temporary address',
    placeholder: 'Enter your permanent address',
    rows: 5,
    cols: 80,
  },
  'fw-spinner': {
    color: 'blue',
    size: 'large',
  },
  'fw-timepicker': {
    format: 'HH:mm',
    interval: 60,
  },
  'fw-toast': {},
  'fw-toggle': {
    checked: true,
    disabled: false,
    size: 'large',
  },
  'fw-modal': {
    id: 'mymodal',
    'title-text': 'Welcome',
    size: 'standard',
  },
  'fw-tabs': {},
  'fw-tab': {
    'tab-header': 'TabHeader1',
  },
  'fw-avatar': {
    url: 'https://randomuser.me/api/portraits/women/37.jpg',
    size: '32',
  },
  'fw-accordion': {
    title: 'Header Text',
    body: '<p>Hello world from Accordion</p>',
    expanded: false,
  },
}

export default defaultProps
