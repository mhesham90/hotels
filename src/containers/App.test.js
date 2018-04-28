import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HotelsApi, {mockFetchHotels} from '../services/HotelsApi';
import App from './App';

configure({ adapter: new Adapter() });
jest.mock('../services/HotelsApi')

describe('App component', () => {
  let wrapper;
  
  beforeAll(() => {
    wrapper = shallow(<App />);
  })

  it('uses hotelsApi mock', () => {
    expect(HotelsApi).toHaveBeenCalledTimes(1);
  });
  it('sets number of nights', () => {
    wrapper.instance().getNights(5)
    expect(wrapper.state('nights')).toEqual(5);
  });
  it('search for hotels', () => {
    wrapper.instance().getfilteredHotels('2020-10-25','2020-10-30');
    setTimeout(() => {
      expect(wrapper.state('availableHotels').length).toEqual(5);
    }, 0);
    wrapper.instance().getfilteredHotels('2018-10-25','2018-10-30');
    setTimeout(() => {
      expect(wrapper.state('availableHotels')).toBe(null);
    }, 0);
  });
})
