import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { {{Name}} } from './{{Name}}'

test('should render child content', async () => {
  render(<{{Name}}>Click Here</{{Name}}>)
  expect(screen.getByText(/Click Here/i)).toHaveTextContent('Click Here')
})
