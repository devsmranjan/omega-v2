import { render } from '@testing-library/react';

import Verify from './verify';

describe('Verify', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Verify />);
        expect(baseElement).toBeTruthy();
    });
});
