import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar (Behavior-driven)', () => {

  test('should display the search input', () => {
    const setSearch = jest.fn(); //mock function
    render(<SearchBar search="" setSearch={setSearch} />); //render component

    const input = screen.getByPlaceholderText(/search item/i); 
    expect(input).toBeInTheDocument();// check input is rendered
  });

  test('should call setSearch when user types', () => {
    const setSearch = jest.fn();
    render(<SearchBar search="" setSearch={setSearch} />);

    const input = screen.getByPlaceholderText(/search item/i); //select input

    fireEvent.change(input, { target: { value: 'Alice' } }); //to simulate typing 

    expect(setSearch).toHaveBeenCalledWith('Alice'); // checking if function called
  });

});
