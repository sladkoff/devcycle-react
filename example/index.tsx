import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DevcycleProvider, Feature, useDevcycle } from '../src';

const App = () => {
  const { client } = useDevcycle();

  client?.identifyUser({
    name: 'anonymous-user-123',
    isAnonymous: true,
  });

  return (
    <DevcycleProvider
      config={{
        envKey: 'test',
      }}
    >
      <Feature id={'some_feature'} defaultValue={false} enabledOnValue={true}>
        'some_feature' enabled
      </Feature>

      <Feature id={'some_feature'} defaultValue={false} enabledOnValue={false}>
        'some_feature' disabled
      </Feature>
    </DevcycleProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
