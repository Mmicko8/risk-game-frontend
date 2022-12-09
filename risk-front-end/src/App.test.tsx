import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders homepage', () => {
    render(<App/>);
    // const linkElement = screen.getByText("hallo");
    // expect(linkElement).toBeInTheDocument();
});
