import { useMutation } from 'react-query'
import { {{Name}}Params, {{name}} } from '../../axios'

export const use{{Name}} = () => {
  const mutation = useMutation((params: {{Name}}Params) => {
    return {{name}}(params)
  })
  return mutation
}
