import { store } from '../store'
import getComponentNameFromType from '../utils/getComponentNameFromType'

import '../crayons/fw-accordion'

class ChildrenPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    const template = document.createElement('template')
    const { components } = store.getState()
    const { children } = components[this.dataset.id]
    const childComponents = children
      .map((c) => {
        const name = getComponentNameFromType(components[c].type)
        return `<li data-id="${components[c].id}"><span class="icon">&#8597</span>${name}</li>`
      })
      .join('\n')
    template.innerHTML = `
<style>

#children {
margin: 0;
padding: 0;
}

#children li {
list-style: none;
padding: .5em;
border-bottom: 1px solid #ddd;
cursor: move;
}

#children li:hover {
background: lightyellow;
}

li .icon {
padding-right: 0.5em;
}
</style>
<fw-accordion heading="Children">
<ul id="children">
${childComponents}
</ul>
</fw-accordion>
`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const el = this.shadowRoot.querySelector('#children')
    const id = this.dataset.id
    import('sortablejs').then(({ default: Sortable }) => {
      Sortable.create(el, {
        onSort: (evt) => {
          const newChildren = Array.from(evt.to.children).map(
            (n) => n.dataset.id
          )

          store.dispatch({
            type: 'UPDATE_CHILDREN',
            payload: {
              id,
              children: newChildren,
            },
          })
        },
      })
    })
  }
}

window.customElements.define('children-panel', ChildrenPanel)
