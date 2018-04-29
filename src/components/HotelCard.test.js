import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HotelCard from './HotelCard';
import data from '../services/__mocks__/hotels.json'

configure({ adapter: new Adapter() });

describe('Card component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<HotelCard
      hotel={data.hotels[0]}
      nights='10' />);
  })
  it('card render with data', () => {
    const name = wrapper.find('.hotel-card-name');
    const city = wrapper.find('.hotel-card-city');
    const price = wrapper.find('.hotel-card-price');
    expect(name).toHaveLength(1);
    expect(city).toHaveLength(1);
    expect(price).toHaveLength(1);
    expect(name.props().children).toContain('Media One Hotel');
    expect(city.props().children).toContain('dubai');
    expect(price.props().children).toContain(1022);
  });
})
