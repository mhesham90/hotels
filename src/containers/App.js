import React, { Component } from 'react';
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { CircularProgress } from 'material-ui/Progress';

import Search from '../components/Search';
import CardList from '../components/CardList';
import Sort from '../components/Sort';
import Filter from "../components/Filter.jsx";
import HotelsApi from '../services/HotelsApi'
import './App.css';

class App extends Component {
  state = {
    filteredHotels: null,
    availableHotels: null,
    nights: 0,
    searching:false
  };
  hotelsApi = new HotelsApi();
  render() {
    return (
      <div className="App">
        <Grid container justify={"center"} >
        {this.state.filteredHotels &&
          // this.state.filteredHotels.length !==0 &&
          this.renderFilter()}
          <Grid item xs={8} >
            {this.renderSearch()}
            {this.state.filteredHotels &&
            !this.state.searching &&
            (this.state.filteredHotels.length !== 0
              ? (
              <div>
                {this.renderSort()}
                {this.renderCardList()}
              </div>
              ):(
                this.renderNotFound()
              )
            )}
            {this.state.searching &&
              <Grid container spacing={24} alignItems="center" justify="center">
                <CircularProgress size={80} thickness={5} />
              </Grid>
            }
          </Grid>
        </Grid>
      </div>
    );
  }

  /*
    rendering components
  */
  renderSearch = () => {
    return (
      <Search
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
  renderSort = () => {
    return (
      <Sort
        hotels={this.state.filteredHotels}
        nights={this.state.nights}
        sortHotel={this.sortHotel}
      />
    );
  };
  renderFilter = () => {
    return (
      <Grid item xs={3}>
        <Filter
          hotels={this.state.availableHotels}
          nights={this.state.nights}
          filterHotels={this.filterHotel}
        />
      </Grid>
    );
  };
  renderNotFound = () => {
    return(
      <Paper className='root' elevation={4}>
        <Grid container spacing={24} justify="center">
          <Typography>Result Not Found</Typography>
        </Grid>
      </Paper>
    )
  }

  /*
    component props
  */
  getNights = nights => {
    this.setState({ nights });
  }
  getfilteredHotels = (fromDate, toDate) => {
    this.setState({searching:true})
    this.hotelsApi.fetchHotels().then(data => {
      let availableHotels = data.hotels.filter((hotel) => {
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
      this.setState({ 
        filteredHotels: [...availableHotels],
        availableHotels,
        searching:false
      })
    })
  }
  sortHotel = hotels => {
    this.setState({ 
      filteredHotels: [...hotels]      
    });
  };
  filterHotel = hotels => {
    this.setState({ filteredHotels: [...hotels] });
  };

}

export default App;
