import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Weather">
        <div>
          <div>
            <p>Date: {this.props.date}</p>
          </div>
          <div>
            <p>desc: {this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
