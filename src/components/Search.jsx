import React from "react";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import SearchIcon from "material-ui-icons/Search";
import IconButton from "material-ui/IconButton";

const ONEDAY = 86400000; // 24hours * 60minutes * 60seconds * 1000milliseconds
class HotelSearch extends React.Component {
  state = {
	fromDate: "2020-10-25",
	toDate: "2020-10-30",
	dateError: false
  };
  search = () => {
	let firstDate = new Date(this.state.fromDate);
	let secondDate = new Date(this.state.toDate);
	let diffDays = (secondDate - firstDate) / ONEDAY;
	this.props.getNights(diffDays);
	this.props.getfilteredHotels(this.state.fromDate, this.state.toDate);
  };
  checkdate = event => {
	this.setState({
	  [event.target.id]: event.target.value
	}, () => {
	  this.setState({
		dateError: this.state.fromDate > this.state.toDate
	  })
	});
  };
	render() {
		return (
			<Paper className="root" elevation={4}>
				<form className="container" noValidate>
					<Grid container justify={"center"} >
						{this.renderDateInput('from')}
						{this.renderDateInput('to')}
						{this.state.dateError && (
							<p style={{ color: "red" }}> invalid Date entry </p>
						)}
						<IconButton
							color="primary"
							className="button"
							onClick={this.search}
							disabled={!(this.state.toDate
								&& this.state.fromDate
								&& !this.state.dateError)}
						>
							<SearchIcon />
						</IconButton>
					</Grid>
				</form>
			</Paper>
		);
	}
	renderDateInput(label){
		return(
			<TextField
				id={label+'Date'}
				error={this.state.dateError}
				label={label}
				type="date"
				value={this.state[label+'Date']}
				onChange={this.checkdate}
				className="textField"
				InputLabelProps={{
					shrink: true
				}}
			/>
		);
	}
}

export default (HotelSearch);
