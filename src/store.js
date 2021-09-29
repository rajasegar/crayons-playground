import {createStore} from 'redux';

const initialState = {
  selectedId: 'root',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        selectedId: action.id,
      };

    default:
      return state;
  }
}

export const store = createStore(appReducer);

store.subscribe(() => {
  console.log(store.getState());
  const {selectedId} = store.getState();
  const panelName = document.getElementById('panel-name');
  panelName.textContent = selectedId;
});
