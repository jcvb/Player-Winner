import { render, screen } from '@testing-library/react';
import App from './App';

import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

test('app loads and displays file reader component', () => {
  render(<App />);
  const fileReaderElement = screen.getByText(/Submit Your Information/i);
  expect(fileReaderElement).toBeInTheDocument();
});
