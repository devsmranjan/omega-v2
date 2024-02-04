import { render } from '@testing-library/react';

import RequiredAuth from './required-auth';

describe('RequiredAuth', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<RequiredAuth />);
        expect(baseElement).toBeTruthy();
    });
});
