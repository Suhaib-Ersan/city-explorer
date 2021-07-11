import React from "react";

import { Form, Card, Button } from "react-bootstrap/";
import Weather from "./weather";

class CityAndWeather extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="CityAndWeather">
        <Card className="mapCardBody" style={{ width: "37rem" }}>
            <div>
              <Card.Body>
                <Form onSubmit={this.props.selectCity}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Check a city</Form.Label>
                    <Form.Control type="text" placeholder="City Name" name="city" />
                  </Form.Group>
                  <Button variant="primary" type="submit" block className="submitButton">
                    Search
                  </Button>
                </Form>
                {this.props.state.showInfo && (
                  <div className="cityInfoContainer">
                    <div>City Name: {this.props.state.cityObj.display_name}</div>
                    <div>Lat: {this.props.state.cityObj.lat}</div>
                    <div>Lon: {this.props.state.cityObj.lon}</div>
                  </div>
                )}

                {this.props.state.showInfo && <Weather weatherData={this.props.state.weatherDataState} />}
                <Card.Text>Check out any country/city/county..etc you want, this will show you the name, latitude and longitude with a static maps image.</Card.Text>
              </Card.Body>
              <Card.Img variant="bottom" src={this.props.state.mapUrl} />
            </div>
          </Card>
      </div>
    );
  }
}

export default CityAndWeather;
