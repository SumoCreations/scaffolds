jest.unmock('axios') // Do this just in case the library is already mocked

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { {{name}}, {{Name}}Params } from './{{name}}'

describe('{{name}}', () => {
  let params: {{Name}}Params = {
    {{args}}
  }

  let mock: MockAdapter

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  // TODO: Add tests for the actual API call
  it('should return the mocked value when successful', async () => {
    const mockResponse = { value: 'some-value' }
    mock.onPost("{{path}}").reply(200, mockResponse)

    const { value } = await {{name}}(params)

    expect(mock.history.post[0].url).toEqual({{path}})
    expect(value).toEqual(mockResponse.value)
  })

  it('should throw when unsuccessful', async () => {
    mock.onPost("{{path}}").reply(500)

    try {
      await {{name}}(params)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
