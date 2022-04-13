import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { {{Name}}, {{Name}}Props } from './{{Name}}'

const props: {{Name}}Props = {
  {{args}}
};

test.todo('should have tests')

test('should render the component', async () => {
  expect(() => render(<{{Name}} {...props} />)).not.toThrow()
})

// test('should render child content', async () => {
//   render(<{{Name}}>Click Here</{{Name}}>)
//   expect(screen.getByText(/Click Here/i)).toHaveTextContent('Click Here')
// })
