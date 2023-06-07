import React from 'react';
import { render, fireEvent, screen, waitFor  } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../../../../../lab5-web/src/pages/RegisterPage/components/Register';

describe('Register', () => {
    test('renders register form', () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        expect(screen.getByLabelText('Name*')).toBeInTheDocument();
        expect(screen.getByLabelText('Surname*')).toBeInTheDocument();
        expect(screen.getByLabelText('Email*')).toBeInTheDocument();
        expect(screen.getByLabelText('Password*')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password*')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number*')).toBeInTheDocument();
        expect(screen.getByLabelText('City*')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
        expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    });

    test('submits the form', async () => {
        render(    <Router>
            <Register />
        </Router>);

        // Mock the fetch request
        const mockFetch = jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                code: 200,
            })
        );

        // Fill out the form
        fireEvent.change(screen.getByLabelText('Name*'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Surname*'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email*'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Password*'), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText('Confirm Password*'), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText('Phone Number*'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText('City*'), { target: { value: '123' } });

        fireEvent.click(screen.getByText('Create Account'));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:5000/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    password: 'password',
                    phone: '1234567890',
                    userStatus: 'regular',
                    isAdmin: 0,
                    idlocation: '123'
                })
            });
        });

        // Verify the navigation after successful submission
        expect(screen.getByText('Log In')).toHaveAttribute('href', '/login');

        // Restore the original fetch implementation
        mockFetch.mockRestore();
    });
});
