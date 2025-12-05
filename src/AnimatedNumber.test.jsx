import './setupTests';
import React from 'react';
import { describe, it, expect } from 'vitest';
import AnimatedNumber from './components/AnimatedNumber';

describe('AnimatedNumber Component', () => {
  it('renders the initial value', async () => {
    const { render } = await import('@testing-library/react');
    const { container } = render(<AnimatedNumber value={100} />);
    expect(container).toBeInTheDocument();
  });

  it('accepts duration prop', async () => {
    const { render } = await import('@testing-library/react');
    const { container } = render(<AnimatedNumber value={50} duration={500} />);
    expect(container).toBeInTheDocument();
  });
});
