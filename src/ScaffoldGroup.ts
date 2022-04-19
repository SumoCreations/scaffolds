import Scaffold from 'simple-scaffold'
import path from 'path'
import { ScaffoldGroupCmdConfig } from './types'
import prettier from 'prettier'
import { buildArgs } from './buildArgs'
import { buildFields } from './buildFields'
import { deconstruct } from './deconstruct'
import { buildProps } from './buildProps'
import { buildValidations } from './buildValidations'
import { buildValues } from './buildValues'
import { buildDefaultValues } from './buildDefaultValues'

export async function ScaffoldGroup({
  name,
  ...options
}: ScaffoldGroupCmdConfig) {
  let scaffolds: Promise<void>[] = []

  let output = name.split('/')
  const componentName = output.pop()

  if (!componentName) {
    throw new Error('No component name provided')
  }

  const template = String(options.template).toLowerCase()
  const method = options.method ?? 'post'

  let data = {
    ...(options.data ?? {}),
    props: buildProps(options.props),
    args: buildArgs(options.props),
    returnProps: buildProps(options.returnProps),
    deconstructedProps: deconstruct(options.props),
    path: options.path ?? '',
    method,
    requestParams: ['get', 'delete'].includes(method)
      ? '`${url}?${new URLSearchParams({ ...params })}`'
      : 'url, params',
    fields: options.fields ? buildFields(options.fields ?? '') : '',
    validations: options.fields ? buildValidations(options.fields ?? '') : '',
    values: options.fields ? buildValues(options.fields ?? '') : '',
    defaultValues: options.fields
      ? buildDefaultValues(options.fields ?? '')
      : ''
  }

  scaffolds.push(
    Scaffold({
      ...options,
      name: componentName,
      templates: [
        path.join(__dirname, '../scaffolds', template, '*'),
        path.join(__dirname, '../scaffolds', template, '**/*')
      ],
      data: {
        moduleName: output[output.length - 1],
        ...data
      },
      output: path.join(process.cwd(), ...output),
      createSubFolder: false,
      beforeWrite: async (content) => {
        const prettierOptions = await prettier.resolveConfig(process.cwd())
        return prettier.format(content.toString(), {
          ...prettierOptions,
          parser: 'babel-ts'
        })
      }
    })
  )

  return Promise.all(scaffolds)
}
