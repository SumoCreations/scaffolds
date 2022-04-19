import { buildArgs } from './buildArgs'

const typeForType = (type: string) => {
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

/**
 * Parses a field definition and returns formatted value props.
 * Example input:
 * `["name:string", "email:string", "password:password", "accepted?:boolean", ...]`
 *
 * @param fieldDefs An array string of field definitions.
 */
export const buildDefaultValues = (fieldDefs: string[]) =>
  buildArgs(
    fieldDefs
      .map((s) => s.split(':'))
      .map(([name, type]) => [name, typeForType(type)].join(':'))
  )
