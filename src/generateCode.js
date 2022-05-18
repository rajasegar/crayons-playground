import { store } from './store'
import { serialize } from 'parse5'

export const formatCode = async (code) => {
  let formattedCode = `// 🚨 Your props contains invalid code`

  const prettier = await import('prettier/standalone')
  const htmlParser = await import('prettier/parser-html')

  try {
    formattedCode = prettier.format(code, {
      parser: 'html',
      plugins: [htmlParser],
    })
  } catch (e) {
    console.log(e)
  }

  return formattedCode
}

const scriptNodes = [
  {
    nodeName: 'script',
    tagName: 'script',
    attrs: [
      {
        name: 'type',
        value: 'module',
      },
      {
        name: 'src',
        value:
          'https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.esm.js',
      },
    ],
  },
  {
    nodeName: 'script',
    tagName: 'script',
    attrs: [
      {
        name: 'type',
        value: 'module',
      },
      {
        name: 'src',
        value:
          'https://unpkg.com/crayons-extensions@0.0.6/dist/crayons-extensions.min.js',
      },
    ],
  },
]

const ast = {
  nodeName: '#document',
  mode: 'no-quirks',
  childNodes: [
    {
      nodeName: 'html',
      tagName: 'html',
      attrs: [],
      childNodes: [
        {
          nodeName: 'head',
          tagName: 'head',
          attrs: [],
          childNodes: [],
        },
        {
          nodeName: 'body',
          tagName: 'body',
          attrs: [],
          childNodes: [],
        },
      ],
    },
  ],
}

const bodyTag = ast.childNodes[0].childNodes[1]

function getAttrs(props) {
  return Object.keys(props)
    .filter((p) => !['children', 'options'].includes(p))
    .map((p) => ({ name: p, value: String(props[p]) }))
}

export default async function generateCode() {
  const { components } = store.getState()

  const nodes = generateCodeForChildren(components.root.children)

  bodyTag.childNodes = [...nodes, ...scriptNodes]

  const formattedCode = await formatCode(serialize(ast))
  return formattedCode
}

function generateCodeForChildren(offspring) {
  const { components } = store.getState()
  let nodes = []
  offspring.forEach((id) => {
    const { type, props, children } = components[id]

    switch (type) {
      case 'fw-button':
        nodes.push(generateButtonCode(props))
        break

      default:
        nodes.push(generateDefaultCode(type, props, children))
    }
  })
  return nodes
}

function generateDefaultCode(type, props, children) {
  const attrs = getAttrs(props)

  const node = {
    nodeName: type,
    tagName: type,
    attrs,
    childNodes: [],
  }

  if (props.children) {
    node.childNodes = [
      {
        nodeName: '#text',
        value: props.children,
      },
    ]
  } else if (children.length > 0) {
    const _children = generateCodeForChildren(children)
    node.childNodes = [..._children]
  } else if (props.options) {
    const _children = generateChildrenFromOptions(type, props.options)
    node.childNodes = [..._children]
  } else {
  }

  return node
}

function generateButtonCode(props) {
  const attrs = getAttrs(props)

  const node = {
    nodeName: 'fw-button',
    tagName: 'fw-button',
    attrs,
    childNodes: [],
  }

  if (props.size && props.size === 'icon') {
    node.childNodes = [
      {
        nodeName: 'fw-icon',
        tagName: 'fw-icon',
        attrs: [
          {
            name: 'name',
            value: String(props.icon),
          },
        ],
      },
    ]
  } else {
    node.childNodes = [
      {
        nodeName: '#text',
        value: props.children,
      },
    ]
  }

  return node
}

function generateChildrenFromOptions(type, options) {
  let opts = ''
  switch (type) {
    case 'fw-select':
      opts = generateOptionsForSelect(options)
      break

    case 'fw-dropdown-button':
      opts = generateOptionsForDropdownButton(options)
      break

    default:
      console.error('Unknown component with options props')
  }
  return opts
}

function generateOptionsForDropdownButton(options) {
  const opts = options.map((option) => {
    return {
      nodeName: 'option',
      tagName: 'option',
      attrs: [
        {
          name: 'id',
          value: String(option.id),
        },
        {
          name: 'value',
          value: String(option.value),
        },
      ],
      childNodes: [
        {
          nodeName: '#text',
          value: option.label,
        },
      ],
    }
  })

  const wrapper = {
    nodeName: 'div',
    tagName: 'div',
    attrs: [
      {
        name: 'slot',
        value: 'dropdown-options',
      },
    ],
    childNodes: opts,
  }
  return [wrapper]
}

function generateOptionsForSelect(options) {
  return options.map((option) => {
    return {
      nodeName: 'fw-select-option',
      tagName: 'fw-select-option',
      attrs: [
        {
          name: 'value',
          value: String(option.value),
        },
      ],
      childNodes: [
        {
          nodeName: '#text',
          value: option.label,
        },
      ],
    }
  })
}
