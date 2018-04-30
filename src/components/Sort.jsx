import React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";


class HotelSort extends React.Component {
  state = {
    hotels: [...this.props.hotels],
    nights: this.props.nights
  } ;
  componentWillReceiveProps(nextProps) {
    this.setState({ hotels: [...nextProps.hotels], nights: nextProps.nights });
  }
  compare = (a, b) => {
    let comparison = 0;
    if (a.name > b.name) {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
  };
  sortByName = () => {
    const hotels = this.state.hotels;
    hotels.sort(this.compare);

    this.setState({ hotels }, this.props.sortHotel(this.state.hotels));
  };
  sortByPrice = () => {
    const hotels = this.state.hotels;
    hotels.sort((a, b) => {
      return a.price - b.price;
    });
    this.setState({ hotels }, this.props.sortHotel(this.state.hotels));
  };
  render() {
    return (
      <Paper className='root' elevation={4}>
        <Grid container spacing={24} alignItems="flex-end">
          <Grid item xs={6}>
            <p className='nights'>total nights : {this.props.nights}</p>
          </Grid>
          <Grid item>
            <Button color="primary" className='sort-name' onClick={this.sortByName}>
              sort by name
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" className='sort-price' onClick={this.sortByPrice}>
              sort by price
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default HotelSort;
