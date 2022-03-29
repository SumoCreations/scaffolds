import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { {{Name}}Input } from './{{Name}}Input'

test('should render the placeholder value', async () => {
  render(<{{Name}}Input name="firstName" placeholder="Enter your name..." />)
  expect(screen.getByPlaceholderText('Enter your name...')).toBeInTheDocument()
})

test('should indicate an error', async () => {
  render(<{{Name}}Input name="firstName" placeholder="Enter your name..." error />)
  expect(screen.getByPlaceholderText('Enter your name...')).toHaveClass(
    'border-error text-error'
  )
})

test('should indicate a disabled state', async () => {
  render(<{{Name}}Input name="firstName" placeholder="Enter your name..." disabled />)
  expect(screen.getByPlaceholderText('Enter your name...')).toHaveClass(
    'cursor-not-allowed opacity-50'
  )
})
