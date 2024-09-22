import { render, screen, fireEvent } from '@testing-library/react';
import AdminPortal from '../../pages/AdminPortal'; // Adjust the path if necessary

test('renders Admin Login heading', () => {
    render(<AdminPortal />);

    // Check if the Admin Login heading is rendered
    const headingElement = screen.getByText(/Admin Login/i);
    expect(headingElement).toBeInTheDocument();
});

test('displays error message on invalid username input', () => {
    render(<AdminPortal />);

    // Simulate entering an invalid username
    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: 'inval!duser' } });
    fireEvent.blur(usernameInput);

    // Expect the error message to appear
    const errorMessage = screen.getByText(/Enter a valid username/i);
    expect(errorMessage).toBeInTheDocument();
});

test('displays error message on submitting empty form', () => {
    render(<AdminPortal />);

    // Simulate clicking the submit button without entering any data
    const submitButton = screen.getByText(/Login/i);
    fireEvent.click(submitButton);

    // Expect the random error message to appear
    const randomError = screen.getByText(/Fill username and password/i);
    expect(randomError).toBeInTheDocument();
});
