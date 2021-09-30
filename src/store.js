import { createStore } from 'redux'
import produce from 'immer'
import DEFAULT_PROPS from './defaultProps'
import { generateId } from './generateId'
import updateEditor from './updateEditor'
import updateInspector from './updateInspector'

const DEFAULT_ID = 'root'

const initialState = {
  selectedId: 'root',
  components: {
    root: {
      id: DEFAULT_ID,
      parent: DEFAULT_ID,
      type: 'Box',
      children: [],
      props: {}
    }
  }
}

function appReducer (state = initialState, { type, payload }) {
  switch (type) {
    case 'ADD_COMPONENT':
      return produce(state, (draftState) => {
        const id = payload.testId || generateId()
        const { form, ...defaultProps } = DEFAULT_PROPS[payload.type] || {}
        draftState.selectedId = id
        draftState.components[payload.parentName].children.push(id)
        draftState.components[id] = {
          id,
          props: defaultProps || {},
          children: [],
          type: payload.type,
          parent: payload.parentName,
          rootParentType: payload.rootParentType || payload.type
        }
      })

    case 'UPDATE_PROPS':
      return produce(state, (draftState) => {
        draftState.components[payload.id].props[payload.name] = payload.value
      })

    default:
      return state
  }
}

export const store = createStore(appReducer)

store.subscribe(() => {
  const { components } = store.getState()
  updateEditor(components)
  updateInspector(store.getState())
})
