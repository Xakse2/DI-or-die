import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';

interface RenderOptions {
  store?: typeof store;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { store: customStore = store, ...renderOptions }: RenderOptions = {},
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={customStore}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
