import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter });

/** 
 * function to render a component where creating a shallow wrapper for App Component
 * @function setup
 * @param {object} props - default value set to blank object
 * @param {object} state - default vlaue set to null
 * @returns {shallowWrapper} 
*/
let setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if(state) {
    wrapper.setState(state);
  }
  return wrapper;
}

/**
 * function to interact with dom attributes using shallow wrapper
 * @function appComponentAttr
 * @param {shallowWrapper} wrapper
 * @param {string} value
 * @returns {shallowWrapper}
*/
let appComponentAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = appComponentAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const incrementButton = appComponentAttr(wrapper, 'increment-button-app');
  expect(incrementButton.length).toBe(1);
});

test('renders counter value', () => {
  const wrapper = setup();
  const counterValue = appComponentAttr(wrapper, 'counter-currentvalue-app');
  expect(counterValue.length).toBe(1);
});

test('renders initial counter value', () => {
  const wrapper = setup();
  const initialCounterValue = wrapper.state('counter');
  expect(initialCounterValue).toBe(0);
});

test('renders on clicking increment button', () => {
  const counter = 7;
  const wrapper = setup({}, {counter});

  const incrementButton = appComponentAttr(wrapper, 'increment-button-app');
  incrementButton.simulate('click');

  const counterValue = appComponentAttr(wrapper, 'counter-currentvalue-app');
  expect(counterValue.text()).toContain(counter + 1);
});

test('renders decrement button', () => {
  const wrapper = setup();
  const decrementButton = appComponentAttr(wrapper, 'decrement-button-app');
  expect(decrementButton.length).toBe(1);
});

test('renders on clicking decrement button', () => {
  let counter = 7;
  const wrapper = setup({}, {counter});
  
  const decrementButton = appComponentAttr(wrapper, 'decrement-button-app');
  decrementButton.simulate('click');

  const counterValue = appComponentAttr(wrapper, 'counter-currentvalue-app');
  expect(counterValue.text()).toContain(counter - 1);
   
})

test('renders on clicking decrement button and counter is Zero', () => {
  let counter = 0;
  const wrapper = setup({}, {counter});
  
  const decrementButton = appComponentAttr(wrapper, 'decrement-button-app');
  decrementButton.simulate('click');

  const counterValue = appComponentAttr(wrapper, 'counter-currentvalue-app');
  expect(counterValue.text()).toContain(counter);
   
})

test('renders error message when counter reached zero and decrement the counter', () => {
  let counter = 0;
  const wrapper = setup({}, {counter});

  const decrementButton = appComponentAttr(wrapper, 'decrement-button-app');
  decrementButton.simulate('click');

  const errorMessage = appComponentAttr(wrapper, 'counter-error-message');
  expect(errorMessage.length).toBe(1);
})

test('renders no error message when counter is zero and increment counter', () => {
  let counter = 0;
  const wrapper = setup({}, {counter});

  const incrementButton = appComponentAttr(wrapper, 'increment-button-app');
  incrementButton.simulate('click');
  
  const errorMessage = appComponentAttr(wrapper, 'counter-error-message');
  expect(errorMessage.length).toBe(0);
})

/* import { render } from '@testing-library/react'; */

/* test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */
