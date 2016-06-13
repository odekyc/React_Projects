import axios from 'axios';

const API_KEY='7b4bdcbed743269f3bcfefc479546b14';
const ROOT_URL1=`http://api.openweathermap.org/data/2.5/forecast/daily?`;
const ROOT_URL2=`&units=metric&cnt=7&appid=${API_KEY}`;

export const FETCH_WEATHER='FETCH_WEATHER';

export function fetchWeather(city){

	const url=`${ROOT_URL1}&q=${city},us${ROOT_URL2}`;

	console.log(url);



	const request=axios.get(url);

    console.log('Request', request);

	return{
      type: FETCH_WEATHER,
      payload: request

	};


}

