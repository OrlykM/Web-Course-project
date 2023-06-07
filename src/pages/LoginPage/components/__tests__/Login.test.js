import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../../../../lab5-web/src/pages/LoginPage/components/Login';

describe('Login component', () => {
    test('renders without errors', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    });

    test('submits the form with valid credentials', async () => {
        // Мокуємо fetch і повертаємо успішну відповідь
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Введення коректних даних в поля
        fireEvent.change(screen.getByLabelText('Email:'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password:'), {
            target: { value: 'password123' },
        });

        // Клік по кнопці "Log in"
        fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

        // Перевірка, що fetch був викликаний з правильними налаштуваннями
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:5000/user/self',
            expect.objectContaining({
                headers: {
                    Authorization: 'Basic dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZDEyMw==',
                },
            })
        );

        // Очікуємо, що користувач буде перенаправлений на сторінку '/ad'
        await waitFor(() => {
            expect(screen.queryByText('Authentication failed')).toBeNull();
        });
    });
});
