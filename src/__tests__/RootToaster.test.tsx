import React from 'react';
import { render } from 'react-native-testing-library';
import { RootToaster } from '../RootToaster';

jest.useFakeTimers();
describe('RootToaster', () => {
  it('renders correctly', () => {
    const component = render(
      <RootToaster visible defaultDuration={3000} defaultMessage="Error" />
    );
    expect(component).toMatchSnapshot();
  });
});
