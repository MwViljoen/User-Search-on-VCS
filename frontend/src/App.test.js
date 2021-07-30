import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('testing snapshot of main App.js', () => {
  const tree = renderer
      .create(<App/>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
