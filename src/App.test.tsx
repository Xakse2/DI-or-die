import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

describe('App Component', () => {
  it('renders the "Register User" button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(
      screen.getByRole('button', { name: /register user/i }),
    ).toBeInTheDocument();
  });
});
