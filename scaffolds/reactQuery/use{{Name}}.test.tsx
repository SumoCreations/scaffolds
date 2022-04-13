import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { use{{Name}} } from './use{{Name}}'
import { QueryClientProvider, QueryClient } from 'react-query'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { {{Name}}Params } from '../../axios'

const server = setupServer(
  rest.{{method}}("{{path}}", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockResponse))
  })
)

const params: {{Name}}Params = {
  {{args}}
}
const mockResponse = { value: 'some-value' }

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const queryClient = new QueryClient()

const Fetch: React.FC = () => {
  const mutation = use{{Name}}()
  return (
    <button
      data-testid="button"
      onClick={() => {
        mutation.mutate(params)
      }}
    >
      {mutation.data && Object.values(mutation.data)[0] ?? 'No Data Found'}
    </button>
  )
}

const MockComponent: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Fetch />
  </QueryClientProvider>
)

describe('use{{Name}}', () => {
  it('should render the mock response output', async () => {
    const testValue = Object.values(mockResponse)[0]

    render(<MockComponent />)
    expect(screen.queryByText(testValue)).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('button'))
    await waitFor(() => {
      return screen.getByText(testValue)
    })
    expect(screen.getByText(testValue)).toBeInTheDocument()
  })
})
