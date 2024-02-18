import { render } from '@testing-library/react';

import Persist from './persist';

describe('Persist', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Persist />);
        expect(baseElement).toBeTruthy();
    });
});
