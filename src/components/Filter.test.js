import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from './Filter';
import data from '../services/__mocks__/hotels.json'

configure({ adapter: new Adapter() });

describe('Sort component', () => {
  let wrapper;
  let mockFn;

  beforeAll(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Filter hotels={data.hotels}
        nights={1}
        filterHotels={mockFn} />);
  });
  
  it('should render properly', () => {
    const searchName = wrapper.find('#hotel-name');
    const priceRange = wrapper.find('#price-range');
    expect(searchName).toHaveLength(1);
    expect(priceRange).toHaveLength(1);
    expect(priceRange.props().value).toEqual([ 79.4, 112 ]);
  });
  it('filter functions work properly', () => {
    wrapper.instance().searchName({target:{value: 'rotana'}});
    expect(mockFn.mock.calls[0][0]).toEqual([data.hotels[1]]);
    wrapper.instance().searchPrice([80, 90]);
    expect(mockFn.mock.calls[1][0]).toEqual([data.hotels[1], data.hotels[2]]);

  });
  it('setstate after new props sent', () => {
    wrapper.setProps({ nights: 10 });
    expect(wrapper.state().nights).toBe(10);
    expect(wrapper.find('#price-range').props().value).toEqual([ 794, 1111 ]);
    wrapper.setProps({ hotels: data.hotels.slice(0,5) });
    expect(wrapper.state().fromToPrice).toEqual([ 806, 1111 ]);

  });
  it('filter actions work', () => {
    const searchNameSpy = jest.spyOn(wrapper.instance(),'searchName')
    const searchPriceSpy = jest.spyOn(wrapper.instance(),'searchPrice')
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#hotel-name').simulate('change',{target:{value: 'rotana'}});
    expect(searchNameSpy).toBeCalled();
    wrapper.find('#price-range').shallow().simulate('AfterChange',[0,100]);
    expect(searchPriceSpy).toBeCalled();
    wrapper.find('#price-range').shallow().simulate('Change',[0,100]);
    expect(wrapper.state().fromToPrice).toEqual([ 0, 100 ]);    
  });
  
  afterAll(() => {
    searchNameSpy.restore();
    searchPriceSpy.restore();
  });
});