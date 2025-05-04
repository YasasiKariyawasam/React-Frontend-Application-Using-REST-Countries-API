import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from './CountryCard';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('CountryCard', () => {
  const country = {
    cca3: 'USA',
    flags: { png: 'https://flagcdn.com/us.png' },
    name: { common: 'United States' },
    population: 331000000,
    region: 'Americas',
    capital: ['Washington, D.C.'],
  };

  it('renders and navigates on click', () => {
    render(
      <MemoryRouter>
        <CountryCard country={country} />
      </MemoryRouter>
    );

    // Check that country name is rendered
    expect(screen.getByText('United States')).toBeInTheDocument();

    // Click the card to trigger navigation
    const card = screen.getByRole('img', { name: /flag of united states/i }).closest('div');
    fireEvent.click(card);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/country/USA');
  });
});
