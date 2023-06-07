import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AllAd from '../AllAd';

jest.mock('axios');

describe('AllAd', () => {
    const mockData = [
        { id: 1, status: 'active', title: 'Title 1', about: 'About 1', publishingDate: '2023-06-01' },
        { id: 2, status: 'active', title: 'Title 2', about: 'About 2', publishingDate: '2023-06-02' },
    ];

    beforeEach(() => {
        axios.get.mockReset();
        sessionStorage.clear();
    });

    test('renders loading message initially', () => {
        render(<AllAd />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('fetches data and renders articles', async () => {
        axios.get.mockResolvedValueOnce({ status: 'fulfilled', value: { data: mockData.slice(0, 2) } });

        render(<AllAd />);
        expect(await screen.findByText('Title 1')).toBeInTheDocument();
        expect(screen.getByText('Title 2')).toBeInTheDocument();
        expect(screen.queryByText('Loading...')).toBeNull();
    });

    test('displays "Show" button and stores data in sessionStorage on button click', async () => {
        axios.get.mockResolvedValueOnce({ status: 'fulfilled', value: { data: mockData.slice(0, 1) } });

        render(<AllAd />);
        expect(await screen.findByText('Show')).toBeInTheDocument();

        userEvent.click(screen.getByText('Show'));

        expect(sessionStorage.getItem('ArticleId')).toBe('1');
        expect(sessionStorage.getItem('IsLocal')).toBe('0');
    });

    test('displays pagination buttons and changes page on button click', async () => {
        axios.get.mockResolvedValueOnce({ status: 'fulfilled', value: { data: mockData } });

        render(<AllAd />);
        expect(await screen.findByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();

        userEvent.click(screen.getByText('2'));

        expect(await screen.findByText('11')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });
});
