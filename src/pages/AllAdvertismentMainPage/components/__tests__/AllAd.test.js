import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AllAd from '../AllAd';

jest.mock('axios');

describe('AllAd', () => {
    beforeEach(() => {
        axios.get.mockReset();
        sessionStorage.clear();
    });

    test('renders loading message when data is not loaded', () => {
        render(<AllAd />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders advertisement items correctly when data is loaded', async () => {
        const fakeData = [
            {
                id: 1,
                title: 'Ad 1',
                about: 'About Ad 1',
                publishingDate: '2023-01-01',
                status: 'active',
            },
            {
                id: 2,
                title: 'Ad 2',
                about: 'About Ad 2',
                publishingDate: '2023-01-02',
                status: 'active',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: fakeData });

        render(<AllAd />);

        // Wait for data to be loaded
        await screen.findByText('Ad 1');

        expect(screen.getByText('Ad 1')).toBeInTheDocument();
        expect(screen.getByText('About Ad 1')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();

        expect(screen.getByText('Ad 2')).toBeInTheDocument();
        expect(screen.getByText('About Ad 2')).toBeInTheDocument();
        expect(screen.getByText('2023-01-02')).toBeInTheDocument();
    });

    test('redirects to ad show page with correct article id and isLocal value', async () => {
        const fakeData = [
            {
                id: 1,
                title: 'Ad 1',
                about: 'About Ad 1',
                publishingDate: '2023-01-01',
                status: 'active',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: fakeData });

        render(<AllAd />);

        // Wait for data to be loaded
        await screen.findByText('Ad 1');

        const showButton = screen.getByText('Show');
        userEvent.click(showButton);

        expect(sessionStorage.getItem('ArticleId')).toBe('1');
        expect(sessionStorage.getItem('IsLocal')).toBe('0');
    });

    test('displays pagination correctly', async () => {
        const fakeData = Array.from({ length: 15 }, (_, index) => ({
            id: index + 1,
            title: `Ad ${index + 1}`,
            about: `About Ad ${index + 1}`,
            publishingDate: '2023-01-01',
            status: 'active',
        }));

        axios.get.mockResolvedValueOnce({ data: fakeData });

        render(<AllAd />);

        // Wait for data to be loaded
        await screen.findByText('Ad 1');

        // Pagination buttons
        const paginationButtons = screen.getAllByRole('button');

        expect(paginationButtons).toHaveLength(2); // Only first and second page buttons should be visible

        userEvent.click(paginationButtons[1]);

        expect(screen.getByText('Ad 11')).toBeInTheDocument();
        expect(screen.queryByText('Ad 1')).toBeNull(); // Previous page item should not be visible
    });
});
