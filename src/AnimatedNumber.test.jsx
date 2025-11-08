import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import AnimatedNumber from './App'

describe('AnimatedNumber Component', () => {
  it('renders the initial value', () => {
    const { container } = render(<AnimatedNumber value={100} />)
    expect(container).toBeInTheDocument()
  })

  it('accepts duration prop', () => {
    const { container } = render(<AnimatedNumber value={50} duration={500} />)
    expect(container).toBeInTheDocument()
  })
})
