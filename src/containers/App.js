import React, { Component } from 'react';
import HotelSearch from '../components/Search';
import CardList from '../components/CardList';
import Grid from "material-ui/Grid";
import HotelsApi from '../services/HotelsApi'
import './App.css';

class App extends Component {
  state = {
    filteredHotels: null,
    availableHotels: null,
    // searchResultNotFound: false,
    nights: 0
  };
  hotelsApi = new HotelsApi();
  render() {
    return (
      <div className="App">
        <Grid container justify={"center"} >
          <Grid item xs={8} >
            {this.renderHotelSearch()}
            {this.state.filteredHotels && (
              <div>
                {this.renderCardList()}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }

  /*
    rendering components
  */
  renderHotelSearch = () => {
    return (
      <HotelSearch
        getNights={this.getNights}
        getfilteredHotels={this.getfilteredHotels}
      />
    );
  }
  renderCardList = () => {
    return (
      <CardList hotels={this.state.filteredHotels} nights={this.state.nights} />
    );
  };

  /*
    component props
  */
  getNights = nights => {
    this.setState({ nights });
  }
  getfilteredHotels = (fromDate, toDate) => {
    this.hotelsApi.fetchHotels().then(data => {
      let filteredHotels = data.hotels.filter((hotel) => {
        let available = false;
        hotel.availability.forEach((availability) => {
          let availableFrom = new Date(availability.from.split("-").reverse().join("-"));
          let availableTo = new Date(availability.to.split("-").reverse().join("-"));
          if (availableFrom <= new Date(fromDate) && availableTo >= new Date(toDate)) {
            available = true;
          }
        });
        return available;
      });
      console.log(filteredHotels)      
      filteredHotels.length === 0
        ? this.setState({ 
          // searchResultNotFound: true,
          filteredHotels: null,
          availableHotels: null,
        })
        : this.setState({
            filteredHotels,
            availableHotels: filteredHotels,
            // searchResultNotFound: false
      });
    })
  }
}

export default App;
