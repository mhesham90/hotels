export default class HotelsApi{
	url = 'https://api.myjson.com/bins/tl0bp'
	fetchHotels(){
		return fetch(this.url, {
			method: 'GET'
		}).then((response) => {
			return response.json()
		})
	}
}

