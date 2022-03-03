import { render, fireEvent } from '@testing-library/react';
import SearchInput from "./SearchInput";

test('renders an input field', () => {
  // Render elements using React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
  const mockSetSearchString = jest.fn()
  const utils = render(<SearchInput setSearchString={mockSetSearchString} />);
  const input = utils.getByLabelText('search-input');
  expect(input).toBeInstanceOf(HTMLInputElement);

  // Dispatch a change event
  fireEvent.change(input, { target: { value: 'foo' } });
  expect(input).toHaveValue('foo')
});
