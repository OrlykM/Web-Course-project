import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserSettings from '../../../../../../lab5-web/src/pages/UserSettingPage/components/UserSettings';

describe('UserSettings', () => {
    test('renders UserSettings component', () => {
        render(
            <Router>
                <UserSettings />
            </Router>
        );

        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
        expect(screen.getByText('Save changes')).toBeInTheDocument();
        expect(screen.getByText('Delete Account')).toBeInTheDocument();
    });

    test('handles form submission with email and phone', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <UserSettings />
            </Router>
        );

        const emailInput = screen.getByLabelText('Email');
        const phoneInput = screen.getByLabelText('Phone Number');
        const submitButton = screen.getByText('Save changes');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '123456789' } });

        fireEvent.click(submitButton);

        // Add your assertions for API requests and navigation here
        // You can use a library like axios-mock-adapter to mock the HTTP requests
    });

    test('handles form submission without email and phone', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <UserSettings />
            </Router>
        );

        const submitButton = screen.getByText('Save changes');

        fireEvent.click(submitButton);

        // Add your assertions for API requests and navigation here
        // You can use a library like axios-mock-adapter to mock the HTTP requests
    });

    test('handles form submission with phone only', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <UserSettings />
            </Router>
        );

        const phoneInput = screen.getByLabelText('Phone Number');
        const submitButton = screen.getByText('Save changes');

        fireEvent.change(phoneInput, { target: { value: '123456789' } });

        fireEvent.click(submitButton);
    });

    test('handles form submission with email only', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <UserSettings />
            </Router>
        );

        const emailInput = screen.getByLabelText('Email');
        const submitButton = screen.getByText('Save changes');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        fireEvent.click(submitButton);

    });

    test('handles account deletion', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));
        render(
            <Router>
                <UserSettings />
            </Router>
        );
        const deleteButton = screen.getByText('Delete Account');
        fireEvent.click(deleteButton);
    });
});
