import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sort from './Sort';
import data from '../services/__mocks__/hotels.json'

configure({ adapter: new Adapter() });

describe('Sort component', () => {
  let wrapper;
  let mockFn;

  beforeAll(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Sort hotels={data.hotels}
        nights={1}
        sortHotel={mockFn} />);
  })
  
  it('should render properly', () => {
    const buttonName = wrapper.find('.sort-name');
    const buttonPrice = wrapper.find('.sort-price');
    const nights = wrapper.find('.nights')
    expect(buttonName).toHaveLength(1);
    expect(buttonPrice).toHaveLength(1);
    expect(nights.props().children).toContain(1);
  });
  it('setstate after new props sent', () => {
    wrapper.setProps({ nights: 10 });
    const nights = wrapper.find('.nights')
    expect(nights.props().children).toContain(10);    
  });
  it('sort hotel work', () => {
    const sortNameSpy = jest.spyOn(wrapper.instance(),'sortByName')
    const sortPriceSpy = jest.spyOn(wrapper.instance(),'sortByPrice')
    wrapper.instance().forceUpdate();
    wrapper.update()
    wrapper.setProps({ hotels: data.hotels.slice(0,3) });
    wrapper.find('.sort-name').simulate('click')
    expect(sortNameSpy).toBeCalled()
    const hotelState = wrapper.instance().state['hotels']
    expect(hotelState).toEqual([data.hotels[2],data.hotels[0],data.hotels[1]])
    wrapper.find('.sort-price').simulate('click')
    expect(sortPriceSpy).toBeCalled()
    expect(hotelState).toEqual([data.hotels[1],data.hotels[2],data.hotels[0]])
    wrapper.find('.sort-name').simulate('click')
    expect(hotelState).toEqual([data.hotels[2],data.hotels[0],data.hotels[1]])    
  });
  afterAll(() => {
    sortNameSpy.restore()
    sortPriceSpy.restore()
  })
})