import updateProps from '../updateProps'
import { store } from '../store'

import '../crayons/fw-accordion'

class ChildrenPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwChange', (ev) => {
      const id = this.dataset.id
      updateProps(ev, id)
    })

    this.render()
  }

  render() {
    const template = document.createElement('template')
    const { components } = store.getState()
    const { children } = components[this.dataset.id]
    const childComponents = children
      .map((c) => {
        return `<p>${components[c].type}</p>`
      })
      .join('\n')
    template.innerHTML = `
<style>
</style>
<fw-accordion heading="Children">
${childComponents}
</fw-accordion>


`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('children-panel', ChildrenPanel)
