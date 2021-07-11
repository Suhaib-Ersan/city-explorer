import React from "react";

class WeatherDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      //this.props.weatherDataState
      <div className="WeatherDay">
          {this.props.weatherDataState.map((ele, idx) => {
            return (
              <>
                <span>
                  <div key={(`date`, idx)}>{ele.date}</div>
                  <div key={(`desc`, idx)}>{ele.desc}</div>
                </span>
              </>
            );
          })}
      </div>
    );
  }
}

export default WeatherDay;
