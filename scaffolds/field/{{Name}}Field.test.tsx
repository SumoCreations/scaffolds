import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { {{Name}} } from './{{Name}}'

test('should render the placeholder value', async () => {
  render(
    <{{Name}}
      name="firstName"
      label="First Name"
      placeholder="Enter your name..."
    />
  )
  expect(screen.getByPlaceholderText('Enter your name...')).toBeInTheDocument()
})

test('should render the label', async () => {
  render(
    <{{Name}}
      name="firstName"
      label="First Name"
      placeholder="Enter your name..."
    />
  )
  expect(screen.getByText('First Name')).toBeInTheDocument()
})

test('should disable the field', async () => {
  render(
    <{{Name}}
      name="firstName"
      label="First Name"
      placeholder="Enter your name..."
      disabled
    />
  )
  expect(screen.getByPlaceholderText('Enter your name...')).toBeDisabled()
})
