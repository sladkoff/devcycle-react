import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Feature } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Feature id={'test'} enabledOnValue={true} defaultValue={false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
