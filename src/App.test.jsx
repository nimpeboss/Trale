import './setupTests';
import React from 'react';
import { describe, it, expect } from 'vitest';
// Import @testing-library/react dynamically inside tests so setup runs first

describe('App Component', () => {
  it('renders loading state initially', async () => {
    const { default: App } = await import('./App');
    const { render } = await import('@testing-library/react');
    const { getByText } = render(<App />);
    expect(getByText(/Loading Pokémon/i)).toBeInTheDocument();
  });

  it('has correct document structure', async () => {
    const { default: App } = await import('./App');
    const { render } = await import('@testing-library/react');
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
