import React from "react";
import Grid from "material-ui/Grid";
import HotelCard from '../components/HotelCard';


class CardList extends React.Component {
  
  render() {
    return (
      <Grid container spacing={8}>
        {this.props.hotels.map((hotel, index) => {
          return (
            <Grid item xs={6} key={index}>
              <HotelCard hotel={hotel} nights={this.props.nights} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}
export default CardList;
