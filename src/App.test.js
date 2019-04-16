import React from 'react';
// components
import App from './App';
import Header from './components/Header';
// enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// apollo
import { MockedProvider } from 'react-apollo/test-utils';
import { NEWTOPIC_MUTATION } from './graphql_tags';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = Enzyme.shallow(<App />);
  it('renders without crashing', () => {
    expect(wrapper.find({ className: 'App' }).exists()).toBe(true);
  });
  it('renders Header component', () => {
    expect(wrapper.find(Header).exists()).toBe(true);
  });
});

describe('<Header />', () => {
  const wrapper = Enzyme.mount(
    <MockedProvider>
      <Header />
    </MockedProvider>
  );
  it('overlay and modal are hidden by default', () => {
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
    expect(wrapper.find('.overlay').hasClass('show-overlay')).toBe(false);
  });
  it('shows overlay and modal when create new topic is clicked', () => {
    wrapper.find('.create').simulate('click');
    expect(wrapper.find('.overlay').hasClass('show-overlay')).toBe(true);
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(true);
  });
  it('hides overlay and modal when cancel button is clicked', () => {
    wrapper.find('.cancel-btn').simulate('click')
    expect(wrapper.find('.overlay').hasClass('show-overlay')).toBe(false);
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
  });
});

describe('form', () => {
  const wrapper = Enzyme.mount(
    <MockedProvider>
      <Header />
    </MockedProvider>
  );
  it('user can fill the form', () => {
    wrapper.find('textarea').simulate('change', { target: { value: 'testtest' } });
    expect(wrapper.find('textarea').props().value).toBe('testtest');
  });
});