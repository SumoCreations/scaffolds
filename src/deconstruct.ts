export const deconstruct = (props?: string[]) =>
  (props ?? []).reduce((acc, prop) => {
    const [name] = prop.split(':')
    return `${acc}, ${name.replace(/[^\w\s]/gi, '')}`
  }, '')
