import React from "react";
import WeatherDay from "./WeatherDay";
class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Weather" style={{ width: "55.45vw", height: "15vh", marginTop: "3vh", position:"absolute",right: "3vh", opacity: "0.75"}}>
        <div>
          <h5>Weather</h5>
          <WeatherDay weatherDataState={this.props.weatherDataState}/>
        </div>
      </div>
    );
  }
}

export default Weather;
