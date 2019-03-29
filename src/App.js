import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    weatherData: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => this.getWeatherData(latitude, longitude), error => console.log(error))
  }

  getWeatherData = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e8b9b88f679e0bb4cba08f7c992316b5`)
      .then(({ data }) => this.setState({ weatherData: data }))
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
