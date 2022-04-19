import { clean } from './utils'

type TemplateFn = ({
  name,
  type,
  required
}: {
  name: string
  type: string
  required: boolean
}) => string

const templateForType = (type: string): TemplateFn => {
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

/**
 * Parses a field definition and returns formatted field options.
 * Example input:
 * `["name:string", "email:string", "password:password", "accepted?:boolean", ...]`
 *
 * @param fieldDefs An array string of field definitions.
 */
export const buildFields = (fieldDefs: string[]) =>
  fieldDefs
    .map((s) => s.split(':'))
    .map(([name, type]) => ({
      name: clean(name),
      type,
      required: name.indexOf('?') < 0,
      template: templateForType(type)
    }))
    .reduce((acc, { template, ...rest }) => `${acc}\n${template(rest)}`, '')
