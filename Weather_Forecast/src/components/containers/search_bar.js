import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../../actions/index';

export default class Searchbar extends Component{

    constructor(props){
    	super(props);

    	this.state = { term : '' };
    }

    onInputChange(event){

     console.log(event.target.value);

     this.setState({ term: event.target.value });

    }

    onFormSubmit(event){
      event.preventDefault();

      //we need to fetch weather data

      this.props.fetchWeather(this.state.term);
      this.setState({ term: '' });
    }

	render(){

		return(

         <form className="input-group" onSubmit={this.onFormSubmit.bind(this)}>
          <h1>Seven-Day Weather Forecasts</h1>
          <label>
          City:

           <input 
           placeholder="if the name of the city contains space, replace it with underscore"
           className="form-control"
           value={this.state.term}
           onChange={this.onInputChange.bind(this)}
           />
           <span className="input-group-btn">
           <button type="submit" className="btn btn-secondary">Submit</button>
           </span>
           </label>
         </form>

	   );
	}
}

function mapDispatchToProps(dispatch){

  return bindActionCreators({ fetchWeather }, dispatch ); 
}

export default connect(null, mapDispatchToProps )(Searchbar);