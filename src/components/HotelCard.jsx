import React from "react";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

class HotelCard extends React.Component {
  render() {
    return (
      <div>
        <Card className='card'>
          <CardContent>
            <Typography className='hotel-card-name' gutterBottom variant="headline" component="h2">
              {this.props.hotel.name}
            </Typography>
            <Typography className='hotel-card-city'>city : {this.props.hotel.city}</Typography>
            <Typography className='hotel-card-price'>
              price : {Number((this.props.hotel.price * this.props.nights).toFixed(1))} AED
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default (HotelCard);
