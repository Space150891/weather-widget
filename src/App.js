import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    weatherData: null,
    isDay: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      this.getWeatherData(latitude, longitude);
      setInterval(() => this.getWeatherData(latitude, longitude), 60000);
    }, error => {
      console.log(error);
      this.setState({ weatherData: "error" });
    });
  }

  getWeatherData = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=e8b9b88f679e0bb4cba08f7c992316b5`)
      .then(({ data }) => this.setState({ weatherData: data, isDay: data.dt > data.sys.sunrise && data.dt < data.sys.sunset ? true : false }))
      .catch(() => this.setState({ weatherData: "error" }))
  };

  render() {
    const { weatherData, isDay } = this.state;

    return (
      <div className="App">
        {weatherData ?
          weatherData === "error" ?
            <div className="content content--error">Oops, something went wrong :( ...</div> :
            <div className={isDay ? "content" : "content content--night"}>
              <div className="content__section content__section--header">
                <div><i className="fas fa-cloud weather-icon"></i>{weatherData.clouds.all}%</div>
                <div><i className="fas fa-wind weather-icon"></i>{weatherData.wind.speed}m/s</div>
                <div><i className="fas fa-tint weather-icon"></i>{weatherData.main.humidity}%</div>
              </div>
              <div className="content__section content__section--temperature">
                <div className="content__section__right-col">{weatherData.main.temp.toFixed(0)}</div>
                <div className="content__section__left-col">
                  <div>°C</div>
                  <div><i className="fas fa-arrow-up"></i>{weatherData.main.temp_max}°</div>
                  <div><i className="fas fa-arrow-down"></i>{weatherData.main.temp_min}°</div>
                </div>
              </div>
              <div className="content__section content__section--location">
                {weatherData.name} {weatherData.sys.country}
              </div>
              <div className="description">
                <p>{weatherData.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" height="80" />
              </div>
              <div className="content__section">
                <p className="date">{new Date().toDateString()}</p>
              </div>
            </div> :
          <div className="content">
            <div className="container">
              <div className="banner">
                LOADING
                <div className="banner-left"></div>
                <div className="banner-right"></div>
              </div>
            </div>
          </div>}
      </div>
    );
  };
};

export default App;
