import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { {{name}}, {{Name}}Params } from './{{name}}'

let params: {{Name}}Params = {
  {{args}}
}

const mockResponse = { value: 'some-value' }
const server = setupServer(
  rest.{{method}}("{{path}}", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('{{name}}', () => {

  // TODO: Add tests for the actual API call
  it('should return the mocked value when successful', async () => {
    const response = await {{name}}(params)
    expect(response).toEqual(mockResponse)
  })

  it('should throw when unsuccessful', async () => {
    server.use(
      rest.{{method}}("{{path}}", (_req, res, ctx) => {
        return res.once(ctx.status(500))
      })
    )

    try {
      await {{name}}(params)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
