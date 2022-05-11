import markup from '../jsFiddleTemplate'

const template = document.createElement('template')
template.innerHTML = `
<style>
.container { 
padding: 0 1em;
}
textarea { display: none; }
button {
background: transparent;
color: white;
border: none;
cursor: pointer;
font-size: .85em;
}
</style>
<div class="container">
<form method="post" action="https://jsfiddle.net/api/post/library/pure" target="check">
<textarea id="txt-html" name="html"><h1>hello wold</h1></textarea>
<button id="btn-export" type="submit" title="Export to JSFiddle">
JSFiddle <fw-icon name="open-new-tab" color="white"></fw-icon>
</button>
</form>
</div>
`
class ExportToJSFiddle extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const btn$ = this.shadowRoot.querySelector('#btn-export')
    btn$.addEventListener('click', () => {
      const txt$ = this.shadowRoot.querySelector('#txt-html')
      txt$.value = markup()
      return true
    })
  }
}

window.customElements.define('export-to-jsfiddle', ExportToJSFiddle)
