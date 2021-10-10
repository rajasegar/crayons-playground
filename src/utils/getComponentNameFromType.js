export default function getComponentNameFromType(type) {
  let _name = type.replace('fw-', '')
  _name = _name[0].toUpperCase() + _name.slice(1)
  return _name
}
