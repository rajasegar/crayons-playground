import generateCode from './generateCode'

export default function () {
  const code = generateCode()

  const markup = `<!DOCTYPE html>
    <html>
    <head>
    <title>Crayons Playground - JSFiddle</title>
    </head>
    <body>
    ${code}
   <script type="module" src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.esm.js"></script> 
   <script type="module">
   import { 
   FlexboxProps, 
   GridProps, 
   SpaceProps,
   TypographyProps,
   ColorProps,
   } from 'https://unpkg.com/@rajasegar/styled-web-components@2.0.2/dist/styled-web-components.min.js'


   /* fw-text */

class FWText extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = '<style>:host { display: block; }</style><slot></slot>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('fw-text', ColorProps(TypographyProps(FWText)))
   /* fw-heading */

class FWHeading extends HTMLElement {
  static get observedAttributes() {
    return ['level']
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

class FWFlex extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = '<style>:host { display: flex; } </style><slot></slot>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('fw-flex', FlexboxProps(FWFlex))

/* fw-grid */ 

class FWGrid extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = '<style>:host { display: grid; }</style><slot></slot>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('fw-grid', GridProps(FWGrid))

/* fw-box */
class FWBox extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML =
      '<style>:host { display: block; } </style><slot></slot>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('fw-box', ColorProps(SpaceProps(FWBox)))

/* fw-avatar */

class FWAvatar extends HTMLElement {
  static get observedAttributes() {
    return ['url', 'size']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    this.url = this.getAttribute('url')
    this.size = this.getAttribute('size')
    template.innerHTML = '<img src="' + this.url + '" width="' + this.size + '" height="' +  this.size +'"/>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.image = this.shadowRoot.querySelector('img')

    this.image.style.borderRadius = '25%'
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'url') {
      this.image.setAttribute('src', newValue)
    }
    if (attr === 'size') {
      this.image.setAttribute('width', newValue)
      this.image.setAttribute('height', newValue)
    }
  }
}

customElements.define('fw-avatar', FWAvatar)

   </script>
    </body>
    </html>
`
  return markup
}
