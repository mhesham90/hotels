import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardList from './CardList';
import data from '../services/__mocks__/hotels.json'

configure({ adapter: new Adapter() });

describe('CardList component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CardList
      hotels={data.hotels.slice(0,2)}
      nights='10' />);
  })
  it('cardList render with data', () => {
    const hotels = wrapper.find('HotelCard');
    expect(hotels).toHaveLength(2);
    hotels.forEach((card, i) => {
        expect(card.props().hotel).toEqual(data.hotels[i])
        expect(card.props().nights).toBe("10")
    });
  });
})
