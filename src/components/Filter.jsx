import React from "react";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Filter extends React.Component {
  
  state = {
    hotels: [...this.props.hotels],
    nights: this.props.nights,
    minMaxPrices: this.getMinMaxPrices(this.props),
    fromToPrice:this.getMinMaxPrices(this.props),
    toPrice:this.getMinMaxPrices(this.props)[1]
  };

  getMinMaxPrices(myProps){
    if(myProps.hotels.length !== 0){
      var prices = myProps.hotels.map((hotel)=>{
        return hotel.price * myProps.nights
      })
    }else{
      prices = [0,0]
    }
    return [Math.min(...prices), Math.max(...prices)+1]
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ hotels: [...nextProps.hotels],
      nights: nextProps.nights,
      minMaxPrices: this.getMinMaxPrices(nextProps),
    });
    // eslint-disable-next-line
    if(nextProps.hotels != this.props.hotels || nextProps.nights !== this.props.nights){
      this.setState({
        fromToPrice:this.getMinMaxPrices(nextProps),
      })
    }
  }
  

  searchName = (e) => {
    let filtered = this.state.hotels.filter(hotel => {
      return hotel.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    this.props.filterHotels(filtered)
  };
  searchPrice = (priceRange) => {
    let filtered = this.state.hotels.filter(hotel => {
      return hotel.price * this.state.nights >= priceRange[0] &&
        hotel.price * this.state.nights <= priceRange[1]
    });
    this.props.filterHotels(filtered)
  };
  

  render() {
    return (
        <Paper className='root' elevation={4}>
          <div>
            <h5>filter by name </h5>   
            {this.renderSearchByName()}
            <br/>
            <h5>filter by price </h5>  
            <Range
            id='price-range'
            pushable={true} 
            min={this.state.minMaxPrices[0]} max={this.state.minMaxPrices[1]}
            value={this.state.fromToPrice} 
            tipFormatter={value => `${value} AED`}
            onChange={(priceRange)=>this.setState({ fromToPrice: priceRange })}
            onAfterChange={this.searchPrice}/>
          </div>
        </Paper>
    );
  }
  renderSearchByName = () => {
    return (
        <Grid container spacing={0} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              id="hotel-name"
              // label="Search hotel"
              fullWidth
              value={this.state.hotelName}
              onChange={this.searchName}
            />
          </Grid>
        </Grid>
      
    );
  };
 
}
export default Filter;
