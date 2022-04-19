export const buildProps = (props?: string[]) =>
  (props ?? []).reduce((acc, prop, i) => {
    const [name, type] = prop.split(':')
    return `${acc}${name}: ${type}${i < (props?.length ?? 0) - 1 ? '\n  ' : ''}`
  }, '')
