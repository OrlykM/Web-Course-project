import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from "react-router-dom";
import SingleAd from '../../../../../../lab5-web/src/pages/SingleAdvertisementPage/components/SingleAd';

describe('SingleAd', () => {
    const mockData = {
        id: 1,
        title: 'Ad Title',
        publishingDate: '2023-05-28',
        status: 'active',
        about: 'Ad description',
    };

    const mockCategory = {
        id: 1,
        name: 'Category Name',
    };

    const mockUserData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
    };

    const mockLocationData = {
        id: 1,
        city: 'City Name',
    };

    const mockCurrentUserData = {
        id: 1,
    };

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            if (url.includes('/advertisement/local')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockData),
                });
            } else if (url.includes('/category')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockCategory),
                });
            } else if (url.includes('/user')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockUserData),
                });
            } else if (url.includes('/location')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockLocationData),
                });
            } else if (url.includes('/user/self')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockCurrentUserData),
                });
            }
        });
    });

    afterEach(() => {
        global.fetch.mockRestore();
    });

    test('renders single ad details correctly', async () => {
        sessionStorage.setItem('ArticleId', '1');
        sessionStorage.setItem('IsLocal', '1');

        render(
            <MemoryRouter>
                <SingleAd />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Status:/i)).toBeInTheDocument();
            expect(screen.getByText(/Ad Title/i)).toBeInTheDocument();
            expect(screen.getByText(/Published 2023-05-28/i)).toBeInTheDocument();
            expect(screen.getByText(/Author: John Doe/i)).toBeInTheDocument();
            expect(screen.getByText(/Phone: 123456789/i)).toBeInTheDocument();
            expect(screen.getByText(/City: City Name/i)).toBeInTheDocument();
            expect(screen.getByAltText(/Image/i)).toBeInTheDocument();
            expect(screen.getByText(/Description: Ad description/i)).toBeInTheDocument();
        });
    });

    test('renders disable and delete buttons for author', async () => {
        sessionStorage.setItem('ArticleId', '1');
        sessionStorage.setItem('IsLocal', '1');
        mockUserData.id = mockCurrentUserData.id; // Set current user as the author

        render(
            <MemoryRouter>
                <SingleAd />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Disable/i)).toBeInTheDocument();
            expect(screen.getByText(/Delete/i)).toBeInTheDocument();
        });
    });

    test('handles disable button click', async () => {
        sessionStorage.setItem('ArticleId', '1');
        sessionStorage.setItem('IsLocal', '1');
        mockUserData.id = mockCurrentUserData.id; // Set current user as the author

        render(
            <MemoryRouter>
                <SingleAd />
            </MemoryRouter>
        );

        await waitFor(() => {
            const disableButton = screen.getByText(/Disable/i);
            global.fetch.mockImplementationOnce(() => Promise.resolve({}));
            disableButton.click();
            expect(global.fetch).toHaveBeenCalledTimes(22);
        });
    });

    test('handles delete button click', async () => {
        sessionStorage.setItem('ArticleId', '1');
        sessionStorage.setItem('IsLocal', '1');
        mockUserData.id = mockCurrentUserData.id; // Set current user as the author

        render(
            <MemoryRouter>
                <SingleAd />
            </MemoryRouter>
        );

        await waitFor(() => {
            const deleteButton = screen.getByText(/Delete/i);
            global.fetch.mockImplementationOnce(() => Promise.resolve({}));
            deleteButton.click();
            expect(global.fetch).toHaveBeenCalledTimes(22);
        });
    });
});
