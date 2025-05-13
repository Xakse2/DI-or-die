import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { RegistrationPage } from './RegistrationPage';
import { MemoryRouter } from 'react-router-dom';

describe('RegistrationPage', () => {
  it('renders form fields', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows email error on submit', async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'bad-email' },
    });
    fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });
});
