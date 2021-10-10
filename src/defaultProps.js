const defaultProps = {
  'fw-button': {
    children: 'Hello',
    color: 'secondary',
    size: 'normal',
  },
  'fw-checkbox': {
    children: 'I Agree',
    checked: true,
    label: '',
  },
  'fw-dropdown-button': {
    label: 'Choose the sport',
    options: [
      { id: '1', value: 'Cricket', label: 'Cricket' },
      { id: '2', value: 'Football', label: 'Football' },
      { id: '3', value: 'Tennis', label: 'Tennis' },
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
    'icon-left': 'add-contact',
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
    label: 'House Name',
    required: true,
    value: '1',
    placeholder: 'Your choice',
    'state-text': 'Select singular option',
    options: [
      { value: 1, label: 'Starks' },
      { value: 2, label: 'Lannisters' },
    ],
  },
  'fw-flex': {},
  'fw-grid': {
    'grid-template-columns': 'repeat(4, 1fr)',
    'grid-gap': '20px',
  },
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
}

export default defaultProps
