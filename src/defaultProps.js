const defaultProps = {
  'fw-button': {
    children: 'Hello',
    color: 'secondary',
    size: 'normal',
  },
  'fw-checkbox': {
    children: 'I Agree',
    checked: true,
    label: ''
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
}

export default defaultProps
