import { clean } from './utils'

/**
 * Parses a field definition and returns formatted yup validators.
 * Example input:
 * `["name:string", "email:string", "password:password", "accepted?:boolean", ...]`
 *
 * @param fieldDefs An array string of field definitions.
 */
export const buildValidations = (fieldDefs: string[]) =>
  fieldDefs
    .map((s) => s.split(':'))
    .map(([name, type]) => ({
      name: clean(name),
      type,
      required: name.indexOf('?') < 0
    }))
    .reduce((acc, { name, type, required }) => {
      let validationType = 'string()'
      switch (type) {
        case 'boolean':
          validationType = 'boolean()'
          break
        case 'number':
          validationType = 'number()'
          break
        default:
          break
      }
      return `${acc} ${name}: yup.${[
        validationType,
        type === 'email' ? 'email()' : undefined,
        type === 'password' ? 'min(7)' : undefined,
        required ? 'required("cannot be blank")' : undefined
      ]
        .filter((n) => n)
        .join('.')},\n`
    }, '')
