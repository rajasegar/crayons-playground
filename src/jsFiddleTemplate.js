import generateCode from './generateCode';

export default function() {
  const code = generateCode()

  const markup = `<!DOCTYPE html>
    <html>
    <head>
    <title>Crayons Playground - JSFiddle</title>
    </head>
    <body>
    ${code}
   <script type="module" src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.esm.js"></script> 
   <script>


   /* fw-text */

class FWText extends HTMLElement {
  static get observedAttributes() {
    return ['color']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = '<p><slot></slot></p>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.para = this.shadowRoot.querySelector('p')
    this.applyStyles()
  }

  attributeChangedCallback() {
    this.applyStyles()
  }

  applyStyles() {
    this.para.style.color = this.getAttribute('color')
  }
}

customElements.define('fw-text', FWText)
   /* fw-heading */

class FWHeading extends HTMLElement {
  static get observedAttributes() {
    return ['level', 'color']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    this.level = this.getAttribute('level')
    const heading = 'h' + this.getAttribute('level')
    template.innerHTML = '<' + heading + '><slot></slot></' + heading + '>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.heading = this.shadowRoot.querySelector(heading)
    this.applyStyles()
  }

  attributeChangedCallback(attr) {
    if (attr === 'level') {
      this.render()
    }
    if (attr === 'color') {
      this.applyStyles()
    }
  }

  applyStyles() {
    this.heading.style.color = this.getAttribute('color')
  }
}

customElements.define('fw-heading', FWHeading)

/*  fw-flex */


const template = document.createElement('template')
template.innerHTML = '<div id="fw-flex-container"><slot></slot></div>'
class FWFlex extends HTMLElement {
  static get observedAttributes() {
    return ['flex-direction', 'justify-content', 'align-items']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.getElementById('fw-flex-container')

    this.applyStyles()
  }

  applyStyles() {
    this.container.style.display = 'flex'
    this.container.style.padding = '1em'
    const flexDirection = this.getAttribute('flex-direction')
    if (flexDirection) {
      this.container.style.flexDirection = flexDirection
    }
    const justifyContent = this.getAttribute('justify-content')
    if (justifyContent) {
      this.container.style.justifyContent = justifyContent
    }
  }

  attributeChangedCallback() {
    this.applyStyles()
  }
}

customElements.define('fw-flex', FWFlex)

/* fw-grid */ 


const properties = {
  'template-columns': 'gridTemplateColumns',
  'template-rows': 'gridTemplateRows',
  gap: 'gap',
}

const template = document.createElement('template')
template.innerHTML = '<div id="fw-grid-container"><slot></slot></div>'

class FWGrid extends HTMLElement {
  static get observedAttributes() {
    return [
      'template-columns',
      'template-rows',
      'gap',
      'row-gap',
      'column-gap',
      'auto-columns',
      'column',
      'row',
      'auto-flow',
      'auto-rows',
      'area',
      'template-areas',
    ]
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.getElementById('fw-grid-container')

    this.applyStyles()
  }

  applyStyles() {
    this.container.style.display = 'grid'
    this.container.style.padding = '1em'

    Object.keys(properties).forEach((k) => {
      const _value = this.getAttribute(k)
      if (_value) {
        this.container.style[properties[k]] = _value
      }
    })
  }

  attributeChangedCallback() {
    this.applyStyles()
  }
}

customElements.define('fw-grid', FWGrid)

   </script>
    </body>
    </html>
`
  return markup
}
