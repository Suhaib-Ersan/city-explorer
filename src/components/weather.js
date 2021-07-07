import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Weather">
        <div>
          <h5>Weather</h5>
          <div className="weatherStuff">
            {this.props.weatherData.map((ele, idx) => {
              return (
                <span key={idx}>
                  {ele.date}
                </span>
              );
            })}
          </div>
          <div className="weatherStuff">
            {this.props.weatherData.map((ele, idx) => {
              return (
                <span key={idx}>
                  {ele.desc}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
