import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Father from './index';

describe('<Foo />', () => {
  it('render Foo with dumi', () => {
    const msg = 'dumi';
    render(<Father name={'啦啦啦啦'} />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
