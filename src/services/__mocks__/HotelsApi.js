import data from './hotels.json'
export const mockFetchHotels = () => {
    return new Promise((resolve)=>{
        resolve({hotels: data.hotels})
    })
};
const mock = jest.fn().mockImplementation(() => {
  return {fetchHotels: mockFetchHotels};
});

export default mock;