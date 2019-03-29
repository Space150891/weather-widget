import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    //weatherData: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => this.getWeatherData(latitude, longitude), error => console.log(error))
  }

  getWeatherData = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=e8b9b88f679e0bb4cba08f7c992316b5`)
      .then(({ data }) => {
        console.log(new Date().getTime(), data.sys.sunrise, data.sys.sunset)
        //const isItDay = new Date().getTime() > data.sys.sunrise && new Date().getTime() < data.sys.sunset ? true : false;
        this.setState({ weatherData: data });
      })

  }

  render() {
    const { weatherData } = this.state;
    console.log(weatherData);
    return (
      <div className="App">
        {weatherData ? <div className="content">
          <div className="content__section content__section--header">
            <div><i className="fas fa-cloud"></i>{weatherData.clouds.all}%</div>
            <div><i className="fas fa-wind"></i>{weatherData.wind.speed}m/s</div>
            <div><i className="fas fa-tint">{weatherData.main.humidity}%</i></div>
          </div>
          <div className="content__section content__section--temperature">
            <div className="content__section__right-col">{weatherData.main.temp.toFixed(0)}</div>
            <div className="content__section__left-col">
              <div>°C</div>
              <div><i className="fas fa-arrow-up"></i>{weatherData.main.temp_max}°</div>
              <div><i className="fas fa-arrow-down"></i>{weatherData.main.temp_min}°</div>
            </div>
          </div>
          <div className="content__section">
            {weatherData.name} {weatherData.sys.country}
          </div>
          <div className="">
            <p>{weatherData.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" height="70" />
          </div>
          <div className="content__section">
            <p className="date">{new Date().toDateString()}</p>
          </div>
        </div> : null}
      </div>
    );
  }
}

export default App;
