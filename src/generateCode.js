import { store } from './store'

export default function generateCode() {
  const { components } = store.getState()

  const code = generateCodeForChildren(components.root.children)

  // return `<pre><code class="language-css">${code}</code></pre>`
  return code
}

function generateCodeForChildren(offspring) {
  const { components } = store.getState()
  let code = ''
  offspring.forEach((id) => {
    const { type, props, children } = components[id]
    const properties = Object.keys(props)
      .filter((p) => p !== 'children')
      .map((p) => `${p}=${props[p]}`)
      .join(' ')

    if (props.children) {
      code += `<${type} ${properties}>${props.children}</${type}>\r\n`
    } else if (children.length > 0) {
      const _children = generateCodeForChildren(children)
      code += `<${type} ${properties}>${_children}</${type}>\r\n`
    } else {
      code += `<${type} ${properties}></${type}>\r\n`
    }
  })
  return code
}
