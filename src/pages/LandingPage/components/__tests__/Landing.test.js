import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from "react-router-dom";
import Landing from '../../../../../../lab5-web/src/pages/LandingPage/components/Landing';

describe('Landing', () => {
    test('renders featured listings section', () => {
        render(
            <Router>
                <Landing />
            </Router>
        );

        expect(screen.getByText('Featured Listings')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render featured listings', async () => {
        const mockData = [
            {
                id: 1,
                title: 'Listing 1',
                about: 'Description 1',
                publishingDate: '2023-05-28'
            },
            {
                id: 2,
                title: 'Listing 2',
                about: 'Description 2',
                publishingDate: '2023-05-29'
            }
        ];
        jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData)
            })
        );

        render(
            <MemoryRouter>
                <Landing />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Listing 1')).toBeInTheDocument();
            expect(screen.getByText('Listing 2')).toBeInTheDocument();
        });
    });
});
