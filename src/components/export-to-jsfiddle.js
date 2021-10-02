import generateCode from '../generateCode'

const template = document.createElement('template')
template.innerHTML = `
<style>
textarea { display: none; }
button {
background: transparent;
color: white;
border: none;
cursor: pointer;
}
</style>
<div>
<form method="post" action="http://jsfiddle.net/api/post/library/pure" target="check">
<textarea id="txt-html" name="html"><h1>hello wold</h1></textarea>
<button id="btn-export" type="submit">Export to JSFiddle</button>
</form>
</div>
`
class ExportToJSFiddle extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const btn$ = this.shadowRoot.querySelector('#btn-export')
    btn$.addEventListener('click', (ev) => {
      const code = generateCode()
      const txt$ = this.shadowRoot.querySelector('#txt-html')
      txt$.value = `<!DOCTYPE html>
    <html>
    <head>
    <title>Crayons Playground - JSFiddle</title>
    </head>
    <body>
    ${code}
   <script type="module" src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.esm.js"></script> 
    </body>
    </html>
    `
      return true
    })
  }
}

window.customElements.define('export-to-jsfiddle', ExportToJSFiddle)
