import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/Loading Pokémon/i)).toBeInTheDocument()
  })

  it('has correct document structure', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })
})
