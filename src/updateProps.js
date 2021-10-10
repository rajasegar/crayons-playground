import { store } from './store'

export default function updateProps(ev, id) {
  const path = ev.path || (ev.composedPath && ev.composedPath())
  const propName = path[0].dataset.property
  if (propName === 'custom-prop') {
    const value = ev.detail ? ev.detail.value : ev.target.value
    const [_name, _value] = value.split('=')

    if (_value && _value.length > 0) {
      store.dispatch({
        type: 'UPDATE_PROPS',
        payload: {
          id,
          name: _name,
          value: _value,
        },
      })
    }
  } else {
    const value = ev.detail ? ev.detail.value : ev.target.value

    store.dispatch({
      type: 'UPDATE_PROPS',
      payload: {
        id,
        name: propName,
        value,
      },
    })
  }
}
