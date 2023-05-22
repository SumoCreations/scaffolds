const clean = (str) => str.replace(/[\W_]+/g, '').trim()

const getProps = (props) => (props || '').split(' ')

const typeForType = (type) => {
  switch (type) {
    case 'date':
    case 'password':
    case 'email':
    case 'textarea':
      return 'string'
    default:
      return type
  }
}

const argForType = (type) => {
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

const templateForType = (type) => {
  switch (type) {
    case 'boolean':
      return ({ name }) => `<label htmlFor="${name}">
      <input
        type="checkbox"
        id="${name}"
        {...register("${name}")}
      />{" "}
      ${name}
    </label>`
    case 'textarea':
      return ({ name, required }) => `<TextAreaField
            name="${name}"
            label="${name}"
            placeholder="${name}"
            className="w-full"
            ${required ? 'required' : ''}
          />`
    default:
      return ({ name, type, required }) => `<TextField
            name="${name}"
            label="${name}"
            placeholder="${name}"
            type="${type}"
            className="w-full"
            ${required ? 'required' : ''}
          />`
  }
}

const buildArgs = (props) =>
  getProps(props).reduce((acc, prop, i) => {
    const [name, type] = prop.split(':')
    return `${acc}${clean(name)}: ${argForType(
      type.indexOf('[') > -1
        ? 'array'
        : type.indexOf('=>') > -1
        ? 'block'
        : type
    )}${i < (props?.length || 0) ? ',\n  ' : ''}`
  }, '')

module.exports = {
  helpers: {
    buildProps: (props) =>
      getProps(props).reduce((acc, prop, i) => {
        const [name, type] = prop.split(':')
        return `${acc}${name}: ${type}${
          i < (props?.length || 0) - 1 ? '\n  ' : ''
        }`
      }, ''),

    deconstructProps: (props) =>
      getProps(props).reduce((acc, prop) => {
        const [name] = prop.split(':')
        return `${acc}, ${name.replace(/[^\w\s]/gi, '')}`
      }, ''),

    /**
     * Parses a field definition and returns formatted value props.
     * Example input:
     * `["name:string", "email:string", "password:password", "accepted?:boolean", ...]`
     *
     * @param fieldDefs An array string of field definitions.
     */
    buildDefaultValues: (fieldDefs) =>
      buildArgs(
        fieldDefs
          .map((s) => s.split(':'))
          .map(([name, type]) => [name, typeForType(type)].join(':'))
      ),

    buildArgs,

    /**
     * Parses a field definition and returns formatted field options.
     * Example input:
     * `["name:string", "email:string", "password:password", "accepted?:boolean", ...]`
     *
     * @param fieldDefs An array string of field definitions.
     */
    buildFields: (fieldDefs) =>
      fieldDefs
        .map((s) => s.split(':'))
        .map(([name, type]) => ({
          name: clean(name),
          type,
          required: name.indexOf('?') < 0,
          template: templateForType(type)
        }))
        .reduce((acc, { template, ...rest }) => `${acc}\n${template(rest)}`, '')
  }
}
