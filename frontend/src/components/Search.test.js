import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';
import * as api from '../services/api';

jest.mock('../services/api', () => ({
  getCountryByName: jest.fn(),
}));

test('displays suggestions when typing', async () => {
  const mockOnSearch = jest.fn();
  api.getCountryByName.mockResolvedValue({
    data: [
      {
        cca3: 'FRA',
        name: { common: 'France' },
        flag: '🇫🇷',
        capital: ['Paris'],
        region: 'Europe',
      }
    ]
  });

  render(<Search onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText(/type 2\+ characters/i);
  fireEvent.change(input, { target: { value: 'Fr' } });

  await waitFor(() => {
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  fireEvent.mouseDown(screen.getByText('France'));
  expect(mockOnSearch).toHaveBeenCalledWith('France');
});
