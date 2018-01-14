import React, { Component } from 'react';
import xhr from 'xhr';
import './App.css';
var htmlToJson = require("html-to-json")

export class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      data: {}
    };
  }

componentDidMount() {
  if (window.navigator.geolocation) { // if geolocation is supported
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      (error) => {
        this.setState({
          error: error.message,
        });
      }
    );
  } else {
    // IP Fallback
  }
}

//TODO: Fetch coordinates after getCurrentPosition
//TODO: Figure out why xhr request is returning HTML

componentDidUpdate() {
  //debugger;
  let urlPrefix = "http://api.openweathermap.org/data/2.5/weather?";
  let urlSuffix = '&APPID=70f1a80f7be9d0f99a01693ffe6fedf1'
  let lat = 'lat=' + this.state.latitude;
  let lon = 'lon=' + this.state.longitude;
  //let url = 'http://api.openweathermap.org/data/2.5/weather?lat=39.3096368&lon=-76.6298302&APPID=70f1a80f7be9d0f99a01693ffe6fedf1'
  let url = urlPrefix + lat + '&' + lon + urlSuffix;
  let self = this;
  console.log(url);
  xhr({
    url: url
  }, function (err, data) {
    // console.log(data);
    // console.log(typeof data.body);
    // console.log(data.body);
    let jsonData = JSON.parse(data.body);
    // console.log(jsonData.name);
    console.log(this.state)
    /* self.setState({
      data: JSON.parse(data.body)
    }); */
  });
};

  render() {
    var currentTemp = 'Temp will go here after fetching coordinates';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
        <div>
          <h1>{this.state.latitude}</h1>
          <h1>{this.state.longitude}</h1>
          <h1>{this.state.currentCity}</h1>
          <h1>{this.state.currentWeather}</h1>
          <h1>{ currentTemp }{this.state.tempFahrenheit}</h1>
        </div>
    );
  }
}

export default WeatherApp;
