import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainLayout from '../components/MainLayout'; // Adjust the path if necessary

// Mocking child components
jest.mock('../components/FirstClassSeatLayout', () => ({ seats, onSeatSelect, selectedSeats, currentCart, onNextCart, onPrevCart }) => (
    <div data-testid="first-class-layout">
        First Class Layout
        <button data-testid="seat-1" onClick={() => onSeatSelect({ number: 1, status: 0 }, 1)}>Seat 1</button>
    </div>
));

jest.mock('../components/SecondClassSeatLayout', () => () => <div data-testid="second-class-layout">Second Class Layout</div>);
jest.mock('../components/ThirdClassSeatLayout', () => () => <div data-testid="third-class-layout">Third Class Layout</div>);

describe('MainLayout', () => {
    test('renders the layout and selects seats', () => {
        render(<MainLayout />);

        // Check if first class layout is rendered by default
        expect(screen.getByTestId('first-class-layout')).toBeInTheDocument();

        // Check if class buttons are present
        const firstClassButton = screen.getByText('1st Class');
        const secondClassButton = screen.getByText('2nd Class');
        const thirdClassButton = screen.getByText('3rd Class');

        expect(firstClassButton).toBeInTheDocument();
        expect(secondClassButton).toBeInTheDocument();
        expect(thirdClassButton).toBeInTheDocument();

        // Check selecting a seat in First Class
        fireEvent.click(screen.getByTestId('seat-1'));
        const selectedSeat = screen.getByText(/1C/);
        expect(selectedSeat).toBeInTheDocument();
    });

    test('switches between class layouts', () => {
        render(<MainLayout />);

        // Switch to second class
        const secondClassButton = screen.getByText('2nd Class');
        fireEvent.click(secondClassButton);
        expect(screen.getByTestId('second-class-layout')).toBeInTheDocument();

        // Switch to third class
        const thirdClassButton = screen.getByText('3rd Class');
        fireEvent.click(thirdClassButton);
        expect(screen.getByTestId('third-class-layout')).toBeInTheDocument();
    });

    test('calculates the total price of selected seats', () => {
        render(<MainLayout />);

        // Select a seat in First Class
        fireEvent.click(screen.getByTestId('seat-1'));

        // Check total price
        const totalPrice = screen.getByText('Total: LKR 150');
        expect(totalPrice).toBeInTheDocument();
    });
});
