import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Demo from './index';

describe('<Demo />', () => {
  it('render Foo with dumi', () => {
    const msg = 'dumi';
    render(
      <Demo
        onClick={() => {
          alert('点击了');
        }}
      >
        这里是button
      </Demo>,
    );
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
