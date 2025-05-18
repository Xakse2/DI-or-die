import { renderWithProviders } from '../../test-utilities';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { RegistrationPage } from './RegistrationPage';
import { MemoryRouter } from 'react-router-dom';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

describe('RegistrationPage', () => {
  // Проверка отображения всех полей формы
  it('renders all form fields', () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  // Проверка валидации почты
  it('shows email error on invalid input', async () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'bad-email' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });

  // Проверка валидации пароля
  it('shows password error on invalid input', async () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(
      await screen.findByText(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
      ),
    ).toBeInTheDocument();
  });

  // Проверка валидации имени и фамилии
  it('shows name errors on invalid input', async () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');

    fireEvent.change(firstNameInput, { target: { value: '123' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('form'));

    const errorMessages = await screen.findAllByText(
      'Must contain only letters and spaces',
    );
    expect(errorMessages.length).toBe(2);
  });

  // Проверка успешной отправки формы
  it('submits the form successfully with valid data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Password must contain at least 8 characters'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Must contain only letters and spaces'),
    ).not.toBeInTheDocument();
  });

  // отсутствие дублирования ошибок
  it('does not show duplicate error messages', async () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'bad-email' } });
    fireEvent.submit(screen.getByRole('form'));
    fireEvent.submit(screen.getByRole('form')); // повторная отправка

    const errorMessages = screen.getAllByText('Invalid email format');
    expect(errorMessages.length).toBe(1); // только одно сообщение об ошибке
  });
});
