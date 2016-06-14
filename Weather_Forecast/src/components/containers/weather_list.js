import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../chart';
import Googlemap from '../googlemap';



class WeatherList extends Component{

	renderWeather(cityData){

       const name=cityData.city.name;
       const temps=cityData.list.map( weather => weather.temp.day);
       const pressures=cityData.list.map( weather => weather.pressure);
       const humidities=cityData.list.map( weather => weather.humidity);
       let { lon , lat } =cityData.city.coord;
  


		return(
           <tr key={name}>
             <td id="maptd"><Googlemap lon={lon} lat={ lat } /></td>
             <td><Chart data={temps} color="red" units="C"/></td>
             <td><Chart data={pressures} color="orange" units="hPa" /></td>
             <td><Chart data={humidities} color="green" units="%"/></td>
           </tr>
           

		);
	}


     render(){

         return(
           <table className="table table hover">
            <thead>
               <tr>
                  <th>City</th>
                  <th>Temperature (C)</th>
                  <th>Pressue (hPa)</th>
                  <th>Humidity (%)</th>
               </tr>
            </thead>

            <tbody>

            {this.props.weather.map(this.renderWeather)}
            </tbody>
           </table>
        );

     }

}

function mapStateToProps({ weather }){
	return { weather };
}

export default connect(mapStateToProps)(WeatherList);
