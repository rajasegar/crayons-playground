import JSZip from 'jszip'
import { fileSave } from 'browser-nativefs'
import markup from '../jsFiddleTemplate'
import {
  readme,
  appjs,
  manifest,
  iparams,
  style,
  icon,
} from '../utils/projectTemplate'

const template = document.createElement('template')
template.innerHTML = `
<style>
.container { 
padding: 0 1em;
}
button {
background: transparent;
color: white;
border: none;
cursor: pointer;
font-size: 0.85em;
}
</style>
<div class="container">
<button id="btn-download-project" type="button" title="Download Project">
Download <fw-icon size="8" name="download"></fw-icon>
</button>
</div>
`
class DownloadProject extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const btn$ = this.shadowRoot.querySelector('#btn-download-project')
    btn$.addEventListener('click', (ev) => {
      const name = 'crayons-mkp-app.zip'
      const zip = new JSZip()

      zip.file('README.md', readme)
      zip.file('app/index.html', markup())
      zip.file('app/scripts/app.js', appjs)
      zip.file('app/styles/style.css', style)
      zip.file('app/styles/images/icon.svg', icon)
      zip.file('config/iparams.json', iparams)
      zip.file('manifest.json', manifest)

      zip.generateAsync({ type: 'blob' }).then(
        async function (blob) {
          await fileSave(
            new Blob([blob], { type: 'application/zip' }),
            {
              fileName: name,
              description: 'Crayons Marketplace Project zip file',
            },
            window.handle
          )
        },
        function (err) {
          console.error(err)
        }
      )
    })
  }
}

window.customElements.define('download-project', DownloadProject)
