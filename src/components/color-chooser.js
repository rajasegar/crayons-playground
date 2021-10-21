import { store } from '../store'
import updateProps from '../updateProps'

const colors = [
  { name: 'Elephant', value: '#12344D' },
  { name: 'Smoke', value: '#f3f5f7' },
  { name: 'Milk', value: '#ffffff' },
  { name: 'Smoke700', value: '#475867' },
  { name: 'Smoke600', value: '#576c7d' },
  { name: 'Jungle', value: '#00A886' },
  { name: 'Azure', value: '#2c5cc5' },
  { name: 'Persimmon', value: '#E43538' },
  { name: 'Casablanca', value: '#E86F25' },
]

const template = document.createElement('template')
template.innerHTML = `
<style>
.container { 
padding: 1em 0;
}

.palette-wrapper {
display: flex;
flex-wrap: wrap;
}

input {
  display: none;
}

.button {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  margin: 5px;
  cursor: pointer;
}

.button span {
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 0;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 100%;
  background: #eeeeee;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  transition: ease .3s;
}

.button span:hover {
  padding: 10px;
}

.Elephant .button span {
  background: var(--elephant);
}
.Smoke .button span {
  background: var(--smoke);
}
.Milk .button span {
  background: white;
}

.Smoke700 .button span {
  background: var(--smoke700);
}
.Smoke600 .button span {
  background: var(--smoke600);
}
.Jungle .button span {
  background: var(--jungle);
}
.Azure .button span {
  background: var(--azure);
}
.Persimmon .button span {
  background: var(--persimmon);
}
.Casablanca .button span {
  background: var(--casablanca);
}
</style>
<div class="container">

      <label>Theme Color:</label>
<div class="palette-wrapper">
      ${colors
        .map(
          (c) => `
<label class="${c.name}">
  <input type="radio" name="color" value="${c.value}">
  <div class="layer"></div>
  <div class="button"><span></span></div>
</label>
  `
        )
        .join('\n')}
</div>
</div>
`
class ColorChooser extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const txt$ = this.shadowRoot.querySelector('#txt-color')
    const { components } = store.getState()
    const { props } = components[this.dataset.id]
    txt$.value = props.color || ''

    txt$.addEventListener('change', (ev) => {
      const id = this.dataset.id
      updateProps(ev, id)
    })
  }
}

window.customElements.define('color-chooser', ColorChooser)
