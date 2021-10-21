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
  <script type="module" src="https://unpkg.com/crayons-extensions@0.0.4/dist/crayons-extensions.min.js"></script>
    </body>
    </html>
`
  return markup
}
