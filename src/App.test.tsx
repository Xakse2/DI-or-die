import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { LoginPage } from '@/pages/login/LoginPage';
import { store } from '@/app/store';

describe('App Router', () => {
  it('renders the login page when path is "/login"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });
});
