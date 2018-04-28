import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './Search';

configure({ adapter: new Adapter() });

describe('Search component', () => {
  let mockFn;
  let wrapper;
  beforeAll(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Search
      getNights={mockFn}
      getfilteredHotels={mockFn} />);
  })
  it('click search button', () => {
    const button = wrapper.find('.button');
    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(mockFn.mock.calls.length).toBe(2);
    expect(mockFn.mock.calls[0][0]).toBe(5);
    expect(mockFn.mock.calls[1][0]).toBe('2020-10-25');
    expect(mockFn.mock.calls[1][1]).toBe('2020-10-30');
  });
  it('input dates in from and to', () => {
    const from = wrapper.find('#fromDate');    
    const to = wrapper.find('#toDate');
    from.simulate('change',{target:{id: from.id, value: '2020-10-30'}})
    to.simulate('change',{target:{id: to.id, value: '2020-10-25'}})
    setTimeout(() => {
      expect(wrapper.state('dateError')).toBe(true)
      expect(wrapper.find('invalid Date entry')).toHaveLength(1)
    }, 0);
    
  });
})
