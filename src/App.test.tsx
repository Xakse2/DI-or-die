import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home/HomePage';
import { LoginPage } from '@/pages/login/LoginPage';

describe('App Router', () => {
  it('renders the home page when path is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });

  it('renders the login page when path is "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });
});
