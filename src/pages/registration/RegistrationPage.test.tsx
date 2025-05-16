import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { RegistrationPage } from './RegistrationPage';
import { MemoryRouter } from 'react-router-dom';

describe('RegistrationPage', () => {
  // Проверка отображения всех полей формы
  it('renders all form fields', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    // expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    // expect(screen.getByLabelText('Country')).toBeInTheDocument();
    // expect(screen.getByLabelText('City')).toBeInTheDocument();
    // expect(screen.getByLabelText('Street')).toBeInTheDocument();
    // expect(screen.getByLabelText('Postal Code')).toBeInTheDocument();
  });

  // Проверка валидации почты
  it('shows email error on invalid input', async () => {
    render(
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
    render(
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
    render(
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

  // Проверка валидации даты рождения
  // it('shows date of birth error if user is under 13', async () => {
  //   render(
  //     <MemoryRouter>
  //       <RegistrationPage />
  //     </MemoryRouter>,
  //   );

  //   const dateOfBirthInput = screen.getByLabelText('Date of Birth');
  //   fireEvent.change(dateOfBirthInput, { target: { value: '2020-01-01' } });
  //   fireEvent.submit(screen.getByRole('form'));

  //   expect(
  //     await screen.findByText('You must be at least 13 years old'),
  //   ).toBeInTheDocument();
  // });

  // Проверка валидации страны
  // it('shows country error on invalid input', async () => {
  //   render(
  //     <MemoryRouter>
  //       <RegistrationPage />
  //     </MemoryRouter>,
  //   );

  //   const countryInput = screen.getByLabelText('Country');
  //   fireEvent.change(countryInput, { target: { value: 'Abc' } });
  //   fireEvent.submit(screen.getByRole('form'));

  //   expect(await screen.findByText('Invalid country')).toBeInTheDocument();
  // });

  // Проверка валидации почтового индекса
  // it('shows postal code error for invalid format', async () => {
  //   render(
  //     <MemoryRouter>
  //       <RegistrationPage />
  //     </MemoryRouter>,
  //   );

  //   const countryInput = screen.getByLabelText('Country');
  //   const postalCodeInput = screen.getByLabelText('Postal Code');

  //   fireEvent.change(countryInput, { target: { value: 'USA' } });
  //   fireEvent.change(postalCodeInput, { target: { value: '123' } });
  //   fireEvent.submit(screen.getByRole('form'));

  //   expect(
  //     await screen.findByText('Invalid postal code format for USA'),
  //   ).toBeInTheDocument();
  // });

  // Проверка успешной отправки формы
  it('submits the form successfully with valid data', async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    // const dateOfBirthInput = screen.getByLabelText('Date of Birth');
    // const countryInput = screen.getByLabelText('Country');
    // const cityInput = screen.getByLabelText('City');
    // const streetInput = screen.getByLabelText('Street');
    // const postalCodeInput = screen.getByLabelText('Postal Code');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    // fireEvent.change(dateOfBirthInput, { target: { value: '2000-01-01' } });
    // fireEvent.change(countryInput, { target: { value: 'USA' } });
    // fireEvent.change(cityInput, { target: { value: 'New York' } });
    // fireEvent.change(streetInput, { target: { value: 'Main St' } });
    // fireEvent.change(postalCodeInput, { target: { value: '10001' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Password must contain at least 8 characters'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Must contain only letters and spaces'),
    ).not.toBeInTheDocument();
    // expect(
    //   screen.queryByText('You must be at least 13 years old'),
    // ).not.toBeInTheDocument();
    // expect(screen.queryByText('Invalid country')).not.toBeInTheDocument();
    // expect(
    //   screen.queryByText('Invalid postal code format for USA'),
    // ).not.toBeInTheDocument();
  });

  // Проверка отсутствия дублирования ошибок
  it('does not show duplicate error messages', async () => {
    render(
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
