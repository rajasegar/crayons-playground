import { store } from '../store'

const icons = [
  'header',
  'add-contact',
  'add-note',
  'add-remove',
  'agent',
  'alert',
  'align-center',
  'align-justify',
  'align-left',
  'align-right',
  'annotate',
  'announcement',
  'arrow-left',
  'arrow-right',
  'article-analytics',
  'article-expand',
  'article-sso',
  'at-the-rate',
  'attachment-forward',
]
const template = document.createElement('template')
template.innerHTML = `
<style>
.container {
padding: 1em;
}
</style>
<div class="container">
      <label>Name:</label>
      <input type="text" list="icons" id="txt-icon" placeholder="Enter your icon name" data-property="name"/>
      <datalist id="icons">
      ${icons.map((i) => `<option value="${i}">`).join('\n')}
      </datalist>
</div>
      `

class IconPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const txt$ = this.shadowRoot.querySelector('#txt-icon')
    const { components } = store.getState()
    const { props } = components[this.dataset.id]
    txt$.value = props.name

    txt$.addEventListener('change', (ev) => {
      const id = this.dataset.id
      const propName = ev.target.dataset.property

      store.dispatch({
        type: 'UPDATE_PROPS',
        payload: {
          id,
          name: propName,
          value: ev.target.value,
        },
      })
    })
  }
}

window.customElements.define('icon-panel', IconPanel)
