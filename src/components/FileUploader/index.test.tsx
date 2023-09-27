import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUploader from './index';
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

describe('FileUploader', () => {
  it('should render the component', () => {
    render(<FileUploader />);
    const linkElement = screen.getByText('Game Score Uploader');
    expect(linkElement).toBeInTheDocument();
  });

  it('should show an error message if no file is selected', async () => {
    render(<FileUploader />);
    const submitButton = screen.getByText('Decrypt');
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText('No file selected.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error message if the content format is invalid', async () => {
    const fileContent = 'invalid content';
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' });
    const { container } = render(<FileUploader />);
    const fileInput = container.querySelector('input[type="file"]');
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
      const submitButton = screen.getByText('Decrypt');
      fireEvent.click(submitButton);
      await waitFor(() => {
        const errorMessage = screen.getByText('Content format is invalid.');
        expect(errorMessage).toBeInTheDocument();
      });
    }
  });

  let mockCalls: any = [];

  beforeAll(() => {
    global.URL.createObjectURL = function () {
      mockCalls.push(Array.from(arguments));
      return './output.txt';
    };
  });

  it('should show the correct result if the content is valid', async () => {
    const fileContent =
      '11 15 38\nCeseAlFuego\nCorranACubierto\nXXcaaamakkCCessseAAllFueeegooDLLKmmNNN';
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

    const { container } = render(<FileUploader />);
    const fileInput = container.querySelector('input[type="file"]');
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
      const submitButton = screen.getByText('Decrypt');
      fireEvent.click(submitButton);
      setTimeout(() => {
        expect(mockCalls.length).toBe(1);
      }, 1000);
    } else {
      throw new Error('File input not found');
    }
  });

  it('should show an error message if the text field is empty', async () => {
    render(<FileUploader />);
    const switchButton = screen.getByLabelText('Enter manually');
    fireEvent.click(switchButton);
    const submitButton = screen.getByText('Decrypt');
    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.getByText('Text field is empty.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should show the correct result if the text field is valid', async () => {
    render(<FileUploader />);
    const switchButton = screen.getByLabelText('Enter manually');
    fireEvent.click(switchButton);
    const textArea = screen.getByPlaceholderText('Type your message here.');
    fireEvent.change(textArea, {
      target: { value: '11 15 38\nCeseAlFuego\nCorranACubierto\nXXcaaamakkCCessseAAllFueeegooDLLKmmNNN' },
    });
    const submitButton = screen.getByText('Decrypt');
    fireEvent.click(submitButton);
    setTimeout(() => {
      expect(mockCalls.length).toBe(1);
    }, 1000);
  });

  it('should reset the form', async () => {
    it('should reset the fields when the reset button is clicked', () => {
      render(<FileUploader />);
  
      const textArea = screen.getByPlaceholderText('Type your message here.');
      fireEvent.change(textArea, { target: { value: 'Some text' } });
      const fileInput = screen.getByLabelText('file');
      const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
      fireEvent.change(fileInput, { target: { files: [file] } });
      const switchInput = screen.getByLabelText('upload-mode');
      fireEvent.click(switchInput);
  
      expect(textArea).toHaveValue('Some text');
      expect(fileInput).toHaveValue('test.txt');
      expect(switchInput).toBeChecked();
  
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
  
      expect(textArea).toHaveValue('');
      expect(fileInput).toHaveValue('');
      expect(switchInput).not.toBeChecked();
    });
  });
});
