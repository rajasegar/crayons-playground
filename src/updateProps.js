import { store } from './store'

export default function updateProps(ev, id) {
  const path = ev.path || (ev.composedPath && ev.composedPath())
  const propName = path[0].dataset.property
  const value = ev.detail ? ev.detail.value : ev.target.value

  store.dispatch({
    type: 'UPDATE_PROPS',
    payload: {
      id,
      name: propName,
      value
    },
  })
}
