import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const validTestSamples1 = {
  '': '0',
  'x': '10',
  'CCC': '300',
  'MCMLXXXV': '1985'
}


const validTestSamples: Map<string, string> = new Map<string, string>([
  ['x', '10'],
  ['CCC', '300'],
  ['MCMLXXXV', '1985'],
]);

const invalidRomanInput = [
  'invalid input test',
  '-1',
  '0',
  'a',
  'A'
]

const invalidArabicInput = [
  'invalid input test',
  'a',
  'A',
  '2.5',
  '0.1'
]

test('renders component and handles valid input', () => {
  render(<App />);

  const arabicInput = screen.getByPlaceholderText('Please enter a positive Arabic integer') as HTMLInputElement;
  expect(arabicInput).toBeInTheDocument();

  const romanInput = screen.getByPlaceholderText('Please enter a Roman numeral') as HTMLInputElement;
  expect(romanInput).toBeInTheDocument();

  validTestSamples.forEach((arabicValue, romanKey) => {
    fireEvent.change(arabicInput,{target: { value: arabicValue }});
    expect(romanInput.value).toBe(romanKey.toUpperCase());
  });


  validTestSamples.forEach((arabicValue, romanKey) => {
    fireEvent.change(romanInput,{target: { value: romanKey }});
    expect(arabicInput.value).toBe(arabicValue);
  });
});

test('renders component and handles invalid input', () => {

  render(<App />);

  const arabicInput = screen.getByPlaceholderText('Please enter a positive Arabic integer') as HTMLInputElement;
  expect(arabicInput).toBeInTheDocument();

  const romanInput = screen.getByPlaceholderText('Please enter a Roman numeral') as HTMLInputElement;
  expect(romanInput).toBeInTheDocument();

  for (const input in invalidRomanInput) {
    fireEvent.change(romanInput,{target: { value: input }});
    expect(arabicInput.value).toBe('');

  }

  for (const input of invalidArabicInput) {
    fireEvent.change(arabicInput,{target: { value: input }});
    expect(romanInput.value).toBe('');
  }
});