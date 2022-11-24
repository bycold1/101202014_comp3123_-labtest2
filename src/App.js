import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';

function App() {
  const API_URL = "http://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "629c9395db137563243ef607612b9511";
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Toronto");


  useEffect(() => {
      getCityWeather();
  }, []);

  const getCityWeather=()=> {
    axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`).then((response) => {
      setData(response.data);
      console.log(response.data)
    });
  }

const searchCity=(e)=> {
setCity(e.target.value);

 getCityWeather();
}

return (
  <div className="App">
    {!data ? (
      <div>Loading ...</div>
    ) : (
      <>
        <div className="leftContent">
          <h4>101202014 comp3123_labtest2 </h4>
          <div className="information">
            <div className="celcius">
                <h1>
                 Current Temp:  {(data.main.temp - 273.15).toFixed(1)} 
                  <sup>&#176;</sup>
                </h1>
              </div>
              <div className="city">
                <h2>{data.name}</h2>
                <p>{moment().format("dddd MMM Do YY")}</p>
              </div>
              <div className="icon">
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                />
              </div>
            </div>
          </div>
          <div className="rightContent">
          <input type="text" className="search-bar" value={city} onChange={(e)=> searchCity(e)}/><div className="search"></div>
            <div className="details">
              <h3>Weather Details</h3>

              <div className="detailItem">
                <div className="left">
                <span>Cloudy: </span>  <span className="right"> {data.clouds.all} %</span>
              </div>
               
              </div>

              <div className="detailItem">
                <div className="left">
                <span>Humidity: </span>  <span className="right">
                {data.main.humidity} %
                </span>
                </div>
          
               
              </div>
              <div className="detailItem">
                <div className="left">
                <span>Wind:</span>  <span className="right">{data.wind.speed} Km/h</span>
              </div>
           
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;