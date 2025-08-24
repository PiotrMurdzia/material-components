import { render, screen } from '@testing-library/react';

import { AppProviders } from '@/app/providers/AppProviders';
import { Home } from './Home';
import React from 'react';

describe('Home', () => {
  it('renders title and button', () => {
    render(
      <AppProviders>
        <Home />
      </AppProviders>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});


