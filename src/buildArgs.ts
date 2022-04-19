import { clean } from './utils'

export const argForType = (type: string) => {
  switch (type) {
    case 'string':
      return '"example"'
    case 'number':
      return '1'
    case 'boolean':
      return 'true'
    case 'object':
      return '{}'
    case 'array':
      return '[]'
    case 'block':
      return '() => {}'
    default:
      return '{} as any'
  }
}

export const buildArgs = (props?: string[]) =>
  (props ?? []).reduce((acc, prop, i) => {
    const [name, type] = prop.split(':')
    return `${acc}${clean(name)}: ${argForType(
      type.indexOf('[') > -1
        ? 'array'
        : type.indexOf('=>') > -1
        ? 'block'
        : type
    )}${i < (props?.length ?? 0) ? ',\n  ' : ''}`
  }, '')
