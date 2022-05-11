import { store } from '../store'
import updateProps from '../updateProps'

class AccordionPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const id = this.dataset.id
    this.addEventListener('fwInput', (ev) => {
      updateProps(ev, id)
    })
    this.addEventListener('fwChange', (ev) => {
      const path = ev.path || (ev.composedPath && ev.composedPath())
      const propName = path[0].dataset.property
      if (propName === 'expanded') {
        const checked = path[0].checked
        if (checked) {
          updateProps(ev, id)
        } else {
          store.dispatch({
            type: 'REMOVE_PROPS',
            payload: {
              id,
              name: 'expanded',
            },
          })
        }
      }
      ev.stopPropagation()
    })

    this.render()
  }

  render() {
    const { components } = store.getState()
    const { props } = components[this.dataset.id]
    const template = document.createElement('template')
    template.innerHTML = `
<style>
.container {
padding: 1em;
}
</style>
<div class="container">
      <fw-input label="Accordion Title" value="${props.title}" data-property="title"></fw-input>
      <fw-textarea value="${props.body}" label="Accordion Body" data-property="body"></fw-textarea>
      <fw-checkbox data-property="expanded" value="true">Expanded</fw-checkbox>
</div>
      `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('accordion-panel', AccordionPanel)
